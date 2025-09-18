# backend/crud/user.py
from sqlalchemy.orm import Session
from models.user import User  # FIXED: Absolute import
from schemas.user import UserCreate  # FIXED: Absolute import
from utils.security import get_password_hash  # FIXED: Absolute import

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user