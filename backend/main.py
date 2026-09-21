import base64
import binascii
import hashlib
import hmac
import json
import os
import time
from datetime import datetime, timedelta, timezone

from fastapi import Depends, FastAPI, Header, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, EmailStr, Field
from database_manager import DatabaseManager
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from typing import Optional

app = FastAPI()
db = DatabaseManager()
started_at = time.monotonic()

environment = os.getenv("ENVIRONMENT", "development").lower()
token_secret = os.getenv("TOKEN_SECRET", "")
registration_key = os.getenv("ADMIN_REGISTRATION_KEY", "")

if environment == "production" and (not token_secret or not registration_key):
    raise RuntimeError("TOKEN_SECRET and ADMIN_REGISTRATION_KEY must be set in production")

if not token_secret:
    token_secret = "development-only-change-me"

allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginSchema(BaseModel):
    username: EmailStr
    password: str = Field(min_length=10, max_length=128)

class UserSchema(BaseModel):
    firstname: str = Field(min_length=1, max_length=100)
    lastname: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=10, max_length=128)

class NewsSchema(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    summary: str = Field(min_length=1, max_length=1000)
    body: str = Field(min_length=1, max_length=50000)
    picture: Optional[str] = Field(default="", max_length=15000000)

class NewsUpdateSchema(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    summary: Optional[str] = Field(default=None, min_length=1, max_length=1000)
    body: Optional[str] = Field(default=None, min_length=1, max_length=50000)
    picture: Optional[str] = Field(default=None, max_length=15000000)

ph = PasswordHasher()
bearer = HTTPBearer(auto_error=False)

def hash_password(password: str):
    return ph.hash(password)

def verify_password(plain_password, hashed_password):
    try:
        return ph.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False

def _encode_segment(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("ascii")

def _decode_segment(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))

def create_access_token(email: str) -> str:
    header = _encode_segment(json.dumps({"alg": "HS256", "typ": "JWT"}, separators=(",", ":")).encode())
    expires_at = datetime.now(timezone.utc) + timedelta(hours=8)
    payload = _encode_segment(json.dumps({"sub": email, "exp": int(expires_at.timestamp())}, separators=(",", ":")).encode())
    signing_input = f"{header}.{payload}"
    signature = hmac.new(token_secret.encode(), signing_input.encode(), hashlib.sha256).digest()
    return f"{signing_input}.{_encode_segment(signature)}"

def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer)) -> str:
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Valid administrator authentication is required",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not credentials or credentials.scheme.lower() != "bearer":
        raise unauthorized

    try:
        header, payload, supplied_signature = credentials.credentials.split(".")
        signing_input = f"{header}.{payload}"
        expected_signature = hmac.new(token_secret.encode(), signing_input.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(expected_signature, _decode_segment(supplied_signature)):
            raise unauthorized
        claims = json.loads(_decode_segment(payload))
        if int(claims["exp"]) < int(datetime.now(timezone.utc).timestamp()):
            raise unauthorized
        return str(claims["sub"])
    except (ValueError, KeyError, TypeError, json.JSONDecodeError, binascii.Error, UnicodeDecodeError):
        raise unauthorized

@app.get("/")
def root():
    return {"message": "backend is running!"}

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "online",
            "uptime_seconds": round(time.monotonic() - started_at, 2),
            "version": "1.0.0"}

@app.post("/auth/login")
async def login(credentials: LoginSchema):
    user = db.get_user_by_email(credentials.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {
        "message": "Login Successful",
        "token": create_access_token(user["email"]),
        "user": {
            "firstname": user["firstname"],
            "lastname": user["lastname"],
            "email": user["email"]
        }
    }

@app.post("/auth/register")
async def register(user: UserSchema, x_registration_key: str = Header(default="")):
    if registration_key and not hmac.compare_digest(x_registration_key, registration_key):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid admin setup key")
    hashed_password = hash_password(user.password)
    user_data = {
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "password": hashed_password
    }
    success = db.add_user(user_data)
    if not success:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="An account with this email already exists.")
    
    return {
        "message": "User registered successfully!",
        "token": create_access_token(user.email),
        "user": {
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email
        }
    }

@app.post("/api/news", status_code=status.HTTP_201_CREATED)
async def add_news(post: NewsSchema, _admin: str = Depends(require_admin)):
    post_data = {
        "title": post.title,
        "summary": post.summary,
        "body": post.body,
        "picture": post.picture
    }
    
    success = db.add_news_post(post_data)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save the news post to the database.")
        
    return {"message": "News post published successfully!"}

@app.get("/api/news", status_code=status.HTTP_200_OK)
async def get_news(limit: int = 5, offset: int = 0):
    limit = min(max(limit, 1), 50)
    offset = max(offset, 0)
    try:
        posts = db.get_recent_news(limit=limit, offset=offset)
        return {"posts": posts}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Failed to retrieve news items from the database."
        )
    
@app.put("/api/news/{post_id}", status_code=status.HTTP_200_OK)
async def update_news(post_id: int, post_update: NewsUpdateSchema, _admin: str = Depends(require_admin)):
    update_data = post_update.model_dump(exclude_unset=True)
    
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="No data fields provided for modification."
        )
        
    picture_data = update_data.get("picture")
    if picture_data:
        if "data:image/png" in picture_data or picture_data.startswith("iVBORw0KG"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid image format. Only JPEG/JPG string payloads are permitted."
            )
        
    success = db.update_news_post(post_id, update_data)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="News post not found or update failed."
        )
        
    return {"message": f"News post {post_id} updated successfully!"}


@app.delete("/api/news/{post_id}", status_code=status.HTTP_200_OK)
async def delete_news(post_id: int, _admin: str = Depends(require_admin)):
    success = db.delete_news_post(post_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News post not found or deletion failed.")
        
    return {"message": f"News post {post_id} deleted successfully!"}
