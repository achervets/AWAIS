import psycopg2
import os
import time

DB_URL = os.getenv("DATABASE_URL", "postgresql://postgres:mysecretpassword@db:5432/awais_db")

class DatabaseManager:
    def __init__(self):
        self._wait_for_db()
        self._create_tables()

    def _get_connection(self):
        return psycopg2.connect(DB_URL)

    def _wait_for_db(self):
        print("Checking connection to PostgreSQL database...", flush=True)
        retries = 5
        while retries > 0:
            try:
                conn = self._get_connection()
                conn.close()
                print("Successfully connected to PostgreSQL!", flush=True)
                return
            except psycopg2.OperationalError:
                retries -= 1
                print("PostgreSQL isn't ready yet. Retrying in 2 seconds...", flush=True)
                time.sleep(2)
        print("Could not connect to PostgreSQL. Proceeding anyway...", flush=True)

    def _create_tables(self):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS users (
                        id SERIAL PRIMARY KEY,
                        firstname TEXT NOT NULL,
                        lastname TEXT NOT NULL,
                        email TEXT UNIQUE NOT NULL,
                        password TEXT NOT NULL
                    )
                ''')
                
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS news_posts (
                        id SERIAL PRIMARY KEY,
                        title TEXT NOT NULL,
                        summary TEXT NOT NULL,
                        body TEXT NOT NULL,
                        picture TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    )
                ''')
            conn.commit()

    def add_user(self, user_data):
        try:
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO users (firstname, lastname, email, password) VALUES (%s, %s, %s, %s)",
                        (user_data['firstname'], user_data['lastname'], user_data['email'], user_data['password'])
                    )
                conn.commit()
            return True
        except psycopg2.IntegrityError:
            return False

    def get_user_by_email(self, email):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT firstname, lastname, email, password FROM users WHERE email = %s", (email,))
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
                with conn.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO news_posts (title, summary, body, picture) VALUES (%s, %s, %s, %s)",
                        (post_data['title'], post_data['summary'], post_data['body'], post_data.get('picture', ''))
                    )
                conn.commit()
            return True
        except Exception:
            return False
    
    def get_recent_news(self, limit: int = 5, offset: int = 0):
        with self._get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, title, summary, body, picture, created_at 
                    FROM news_posts 
                    ORDER BY created_at DESC, id DESC
                    LIMIT %s OFFSET %s
                    """,
                    (limit, offset)
                )
                rows = cursor.fetchall()
                
                posts = []
                for row in rows:
                    picture_data = row[4]
                    
                    if isinstance(picture_data, bytes):
                        picture_data = picture_data.decode('utf-8')
                    elif picture_data is None:
                        picture_data = ""
                    
                    created_at_str = row[5].isoformat() if hasattr(row[5], 'isoformat') else str(row[5])
                    
                    posts.append({
                        "id": row[0],
                        "title": row[1],
                        "summary": row[2],
                        "body": row[3],
                        "picture": picture_data,
                        "created_at": created_at_str
                    })
                return posts
    
    def update_news_post(self, post_id: int, update_data: dict) -> bool:
        """
        Dynamically updates a news post's fields based on provided data.
        """
        if not update_data:
            return False

        set_clauses = [f"{key} = %s" for key in update_data.keys()]
        set_string = ", ".join(set_clauses)
        
        query_values = list(update_data.values())
        query_values.append(post_id)

        query = f"UPDATE news_posts SET {set_string} WHERE id = %s;"

        try:
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, query_values)
                    conn.commit()
                    return cursor.rowcount > 0
        except Exception as e:
            print(f"Database error while updating news post {post_id}: {e}")
            return False

    def delete_news_post(self, post_id: int) -> bool:
        """
        Deletes a news post from the database by its ID.
        """
        query = "DELETE FROM news_posts WHERE id = %s;"
        
        try:
            with self._get_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, (post_id,))
                    conn.commit()
                    return cursor.rowcount > 0
        except Exception as e:
            print(f"Database error while deleting news post {post_id}: {e}")
            return False