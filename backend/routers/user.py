# backend/routers/user.py (temp merge for POST body)
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json  # For alerts parse
from pydantic import BaseModel

from ..database import get_db
from .auth import get_current_user
from ..crud.location import get_user_locations, add_location
from ..schemas.user import UserOut
from ..utils.email import send_alert

router = APIRouter(prefix="/users", tags=["users"])

class LocationCreate(BaseModel):  # Temp inline schema
    city: str
    alerts: dict = {}  # Default empty

@router.get("/me/locations", response_model=List[dict])
def read_locations(
    current_user: UserOut = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    locations = get_user_locations(db, user_id=current_user.id)
    return [
        {
            "id": loc.id,
            "city": loc.city,
            "alerts": json.loads(loc.alerts_json) if loc.alerts_json else {}  # Parse JSON
        }
        for loc in locations
    ]

@router.post("/locations")
def create_location(
    loc_data: LocationCreate,  # Single body: {"city": "Prague", "alerts": {"rain": true}}
    current_user: UserOut = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_location = add_location(db, user_id=current_user.id, city=loc_data.city, alerts=loc_data.alerts)
    
    send_alert(current_user.email, f"Added location: {loc_data.city}")
    
    return {"id": new_location.id, "message": "Location added successfully"}