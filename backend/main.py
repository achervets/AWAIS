from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database_manager import DatabaseManager
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from typing import Optional

app = FastAPI()
db = DatabaseManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginSchema(BaseModel):
    username: str
    password: str

class UserSchema(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str

class NewsSchema(BaseModel):
    title: str
    summary: str
    body: str
    picture: Optional[str] = ""

class NewsUpdateSchema(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    body: Optional[str] = None
    picture: Optional[str] = None

ph = PasswordHasher()

def hash_password(password: str):
    return ph.hash(password)

def verify_password(plain_password, hashed_password):
    try:
        return ph.verify(hashed_password, plain_password)
    except VerifyMismatchError:
        return False

@app.get("/")
def root():
    return {"message": "backend is running!"}

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "online",
            "uptime": "xx.xx.xx",
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
        "token": "secret_token",
        "user": {
            "firstname": user["firstname"],
            "lastname": user["lastname"],
            "email": user["email"]
        }
    }

@app.post("/auth/register")
async def register(user: UserSchema):
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
    return {"message": "User registered successfully!"}

@app.post("/api/news", status_code=status.HTTP_201_CREATED)
async def add_news(post: NewsSchema):
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
    try:
        posts = db.get_recent_news(limit=limit, offset=offset)
        return {"posts": posts}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Failed to retrieve news items from the database."
        )
    
@app.put("/api/news/{post_id}", status_code=status.HTTP_200_OK)
async def update_news(post_id: int, post_update: NewsUpdateSchema):
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
async def delete_news(post_id: int):
    success = db.delete_news_post(post_id)
    
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News post not found or deletion failed.")
        
    return {"message": f"News post {post_id} deleted successfully!"}