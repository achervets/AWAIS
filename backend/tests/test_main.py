import uuid
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_register_user_success():
    unique_email = f"test_{uuid.uuid4().hex[:6]}@example.com"
    
    payload = {
        "firstname": "John",
        "lastname": "Doe",
        "email": unique_email,
        "password": "securepassword123"
    }
    
    response = client.post("/auth/register", json=payload)
    
    assert response.status_code == 200
    assert response.json()["message"] == "User registered successfully!"

def test_register_duplicate_email():
    unique_email = f"duplicate_{uuid.uuid4().hex[:6]}@example.com"
    payload = {
        "firstname": "Jane",
        "lastname": "Doe",
        "email": unique_email,
        "password": "password123"
    }

    client.post("/auth/register", json=payload)
    
    response = client.post("/auth/register", json=payload)
    
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]

def test_login_success():
    unique_email = f"login_{uuid.uuid4().hex[:6]}@example.com"
    password = "testpassword123"
    firstname = "Testing"
    
    register_payload = {
        "firstname": firstname,
        "lastname": "User",
        "email": unique_email,
        "password": password
    }
    client.post("/auth/register", json=register_payload)

    login_payload = {
        "username": unique_email,
        "password": password
    }
    response = client.post("/auth/login", json=login_payload)

    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "Login Successful"
    assert data["firstname"] == firstname
    assert "token" in data

def test_login_invalid_credentials():
    bad_payload = {
        "username": f"nonexistent_{uuid.uuid4().hex}@fail.com",
        "password": "somepassword"
    }
    response = client.post("/auth/login", json=bad_payload)
    
    assert response.status_code == 401
    assert "Invalid" in response.json()["detail"]