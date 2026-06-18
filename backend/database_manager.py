import sqlite3
import os

DB_PATH = os.getenv("DATABASE_PATH", "users.db")

class DatabaseManager:
    def __init__(self):
        self._create_tables()

    def _get_connection(self):
        return sqlite3.connect(DB_PATH)

    def _create_tables(self):
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
            
            conn.execute('''
                CREATE TABLE IF NOT EXISTS news_posts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    summary TEXT NOT NULL,
                    body TEXT NOT NULL,
                    picture TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

    def add_news_post(self, post_data):
        try:
            with self._get_connection() as conn:
                conn.execute(
                    "INSERT INTO news_posts (title, summary, body, picture) VALUES (?, ?, ?, ?)",
                    (post_data['title'], post_data['summary'], post_data['body'], post_data.get('picture', ''))
                )
            return True
        except Exception:
            return False
    
    def get_recent_news(self, limit: int = 5, offset: int = 0):
        with self._get_connection() as conn:
            cursor = conn.execute(
                """
                SELECT id, title, summary, body, picture, created_at 
                FROM news_posts 
                ORDER BY created_at DESC 
                LIMIT ? OFFSET ?
                """,
                (limit, offset)
            )
            rows = cursor.fetchall()
            
            posts = []
            for row in rows:
                picture_data = row[4]
                
                if isinstance(picture_data, bytes):
                    picture_data = picture_data.decode('utf-8')
                
                posts.append({
                    "id": row[0],
                    "title": row[1],
                    "summary": row[2],
                    "body": row[3],
                    "picture": picture_data or "",
                    "created_at": row[5]
                })
            return posts