from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database_manager import db
from passlib.context import CryptContext

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginData(BaseModel):
    username: str
    password: str

class UserSchema(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@app.get("/")
def root():
    return {"message": "backend is running!"}

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "online",
            "uptime": "xx.xx.xx",
            "version": "1.0.0"}

@app.post("/auth/login")
async def login(data: LoginData):
    user = db.find_user_by_email(data.username)
    if user and verify_password(data.password, user.get("password")):
        return {
            "message": "Login Successful",
            "token": "secret-token",
            "firstname": user.get("firstname")
        }
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail="Invalid email or password."
    )

@app.post("/auth/register")
async def register(user: UserSchema):
    existing_user = db.find_user_by_email(user.email)
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="An account with this email already exists."
        )
    user_data = user.model_dump()
    user_data["password"] = hash_password(user_data["password"])
    db.add_user(user_data)
    return {"message": "User registered successfully!"}