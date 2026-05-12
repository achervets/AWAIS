# API Contract - America with Anastasiia Immigration Services

Base URL: http://localhost:8000

---

## SYSTEM ENDPOINTS

### 1. Health Check
Verifies that the FastAPI backend is running and reachable.

URL: /health
Method: GET

#### Success Response
Code: 200 OK
Content:
{
  "status": "online",
  "uptime": "xx.xx.xx",
  "version": "1.0.0"
}

---

## AUTHENTICATION ENDPOINTS

### 1. Login
Authenticates a user and returns a session token.

URL: /auth/login
Method: POST
Headers: 'Content-Type: application/json'

#### Request Body
{
  "username": "admin",
  "password": "password123"
}

#### Success Response
Code: 200 OK  
Content:
{
  "message": "Login Successful",
  "token": "secret-token",
  "firstname": "John",
  "lastname": "Smith",
  "email": "jsmith@gmail.com"
}

#### Error Response
Code: 401 Unauthorized  
Content:
{
  "detail": "Invalid credentials"
}

---

### 2. Register
Stores new user information in database.

URL: /auth/register
Method: POST
Headers: 'Content-Type: application/json'

#### Request Body
{
  "firstname": "John",
  "lastname": "Smith",
  "email": "jsmith@gmail.com",
  "password": "password123"
}

#### Success Response
Code: 200 OK  
Content:
{
  "status": "success"
}

#### Error Response
Code: 400 Bad Request  
Content:
{
  "detail": "An account with this email already exists."
}