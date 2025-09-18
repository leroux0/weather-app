from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database import Base  # FIXED: Absolute import


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    locations = relationship("Location", back_populates="owner")