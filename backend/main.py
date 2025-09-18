# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers.auth import router as auth_router  # Matches auth.py's router
from routers.weather import router as weather_router  # FIXED: Use 'router' as defined in weather.py
from routers.user import router as user_router  # FIXED: Use 'router' as defined in user.py
from utils.email import send_email

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-vercel-frontend-url.vercel.app"],
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
    uvicorn.run(app, host="0.0.0.0", port=8000)