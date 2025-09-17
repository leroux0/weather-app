# backend/schemas/weather.py
from pydantic import BaseModel, Field
from typing import Dict, Any

class WeatherRequest(BaseModel):
    city: str = Field(..., min_length=1, description="City name for weather query")

class WeatherResponse(BaseModel):
    temp: float
    feels_like: float
    description: str
    humidity: int
    wind_speed: float
    # Add more as needed from OpenWeather API

    class Config:
        from_attributes = True