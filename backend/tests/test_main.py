import uuid
import unittest
from fastapi.testclient import TestClient
from main import app

class TestMainAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "online")

    def test_register_user_success(self):
        unique_email = f"test_{uuid.uuid4().hex[:6]}@example.com"
        
        payload = {
            "firstname": "John",
            "lastname": "Doe",
            "email": unique_email,
            "password": "securepassword123"
        }
        
        response = self.client.post("/auth/register", json=payload)
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["message"], "User registered successfully!")

    def test_register_duplicate_email(self):
        unique_email = f"duplicate_{uuid.uuid4().hex[:6]}@example.com"
        payload = {
            "firstname": "Jane",
            "lastname": "Doe",
            "email": unique_email,
            "password": "password123"
        }

        self.client.post("/auth/register", json=payload)
        
        response = self.client.post("/auth/register", json=payload)
        
        self.assertEqual(response.status_code, 400)
        self.assertIn("already exists", response.json()["detail"])

    def test_login_success(self):
        unique_email = f"login_{uuid.uuid4().hex[:6]}@example.com"
        password = "testpassword123"
        firstname = "Testing"
        
        register_payload = {
            "firstname": firstname,
            "lastname": "User",
            "email": unique_email,
            "password": password
        }
        self.client.post("/auth/register", json=register_payload)

        login_payload = {
            "username": unique_email,
            "password": password
        }
        response = self.client.post("/auth/login", json=login_payload)

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["message"], "Login Successful")
        self.assertEqual(data["user"]["firstname"], firstname)
        self.assertIn("token", data)

    def test_login_invalid_credentials(self):
        bad_payload = {
            "username": f"nonexistent_{uuid.uuid4().hex}@fail.com",
            "password": "somepassword"
        }
        response = self.client.post("/auth/login", json=bad_payload)
        
        self.assertEqual(response.status_code, 401)
        self.assertIn("Invalid", response.json()["detail"])

if __name__ == "__main__":
    unittest.main()