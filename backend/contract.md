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
  "token": "secret-token"
}

#### Error Response
Code: 401 Unauthorized
Content:
{
  "detail": "Invalid credentials"
}

---

## STANDARD ERROR RESPONSES

| 401 | Unauthorized (Bad credentials) | {"detail": "Invalid credentials"} |
| 422 | Unprocessable Entity (Missing fields) | {"detail": "Field required"} |
| 500 | Internal Server Error | {"detail": "Server error"} |