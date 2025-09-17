# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

# Default to SQLite if not set
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./weather.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # SQLite threading fix
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()