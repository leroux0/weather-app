# backend/routers/weather.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from httpx import get

from database import get_db  # FIXED: Absolute import
from schemas.weather import WeatherRequest, WeatherResponse
from dotenv import load_dotenv  # Already absolute, fine
import os

load_dotenv()

router = APIRouter(prefix="/weather", tags=["weather"])

@router.get("/current", response_model=WeatherResponse)
def get_current_weather(
    city: str,
    db: Session = Depends(get_db)
):
    api_key = os.getenv("WEATHER_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Weather API key missing")
    
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    
    response = get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=404, detail="City not found or API error")
    
    data = response.json()
    
    return WeatherResponse(
        temp=data["main"]["temp"],
        feels_like=data["main"]["feels_like"],
        description=data["weather"][0]["description"],
        humidity=data["main"]["humidity"],
        wind_speed=data["wind"]["speed"]
    )