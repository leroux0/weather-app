# backend/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr = Field(..., min_length=5, max_length=100)
    password: str = Field(..., min_length=8, description="Strong password required")

    class Config:
        from_attributes = True  # Alias for orm_mode in Pydantic v2

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"