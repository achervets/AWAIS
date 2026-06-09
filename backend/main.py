from fastapi import FastAPI, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database_manager import DatabaseManager
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

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