import sqlite3
import os

DB_PATH = os.getenv("DATABASE_PATH", "users.db")

class DatabaseManager:
    def __init__(self):
        self._create_table()

    def _get_connection(self):
        return sqlite3.connect(DB_PATH)

    def _create_table(self):
        with self._get_connection() as conn:
            conn.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    firstname TEXT NOT NULL,
                    lastname TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL
                )
            ''')

    def add_user(self, user_data):
        try:
            with self._get_connection() as conn:
                conn.execute(
                    "INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
                    (user_data['firstname'], user_data['lastname'], user_data['email'], user_data['password'])
                )
            return True
        except sqlite3.IntegrityError:
            return False

    def get_user_by_email(self, email):
        with self._get_connection() as conn:
            cursor = conn.execute("SELECT firstname, lastname, email, password FROM users WHERE email = ?", (email,))
            row = cursor.fetchone()
            if row:
                return {
                    "firstname": row[0],
                    "lastname": row[1],
                    "email": row[2],
                    "password": row[3]
                }
            return None