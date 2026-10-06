import sqlite3

DATABASE = "shopai.db"

def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection

def create_tables():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            rating REAL NOT NULL,
            reviews INTEGER NOT NULL,
            emoji TEXT,
            description TEXT NOT NULL,
            organic INTEGER DEFAULT 0
        )
    """)

    connection.commit()
    connection.close()