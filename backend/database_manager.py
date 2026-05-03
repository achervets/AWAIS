import json
import os

DB_FILE = "data/users.json"

class Database:
    def get_all_users(self):
        if not os.path.exists(DB_FILE):
            return []
        with open(DB_FILE, "r") as f:
            return json.load(f)

    def add_user(self, user_dict):
        users = self.get_all_users()
        users.append(user_dict)
        with open(DB_FILE, "w") as f:
            json.dump(users, f, indent=4)

    def find_user_by_email(self, email):
        users = self.get_all_users()
        return next((u for u in users if u["email"].lower() == email.lower()), None)

db = Database()