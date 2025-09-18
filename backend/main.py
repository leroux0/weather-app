# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers.auth import router as auth_router
from routers.weather import router as weather_router
from routers.user import router as user_router
from utils.email import send_alert
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://weather-app-frontend-taupe-alpha.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(weather_router, prefix="/weather", tags=["weather"])
app.include_router(user_router, prefix="/users", tags=["users"])

@app.on_event("startup")
async def startup():
    # Create DB tables
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))  # Use $PORT or default to 8000
    uvicorn.run(app, host="0.0.0.0", port=port)