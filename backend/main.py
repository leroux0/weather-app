# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth_router, weather_router, user_router  # From __init__.py

from .database import Base, engine  # For table creation

# Create tables (dev only—use migrations in prod)
# Base.metadata.create_all(bind=engine)

app = FastAPI(title="Weather App API", description="Personal weather dashboard", version="0.1.0")

# CORS for React dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers WITHOUT extra prefix—routers already have them
app.include_router(auth_router)  # Becomes /auth/...
app.include_router(weather_router)  # /weather/...
app.include_router(user_router)  # /users/...

# Root endpoint
@app.get("/")
def root():
    return {"message": "Weather App API is running!"}

# Note: Auth dep (get_current_user) is already in routers—no global middleware needed