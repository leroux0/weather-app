import json
from sqlalchemy.orm import Session
from ..models.location import Location  # Fixed
from ..models.user import User  # Fixed; optional but kept
from ..schemas.weather import WeatherRequest  # Fixed
from typing import List, Dict


def get_user_locations(db: Session, user_id: int) -> List[Location]:
    return db.query(Location).filter(Location.user_id == user_id).all()


def add_location(db: Session, user_id: int, city: str, alerts: Dict[str, any]):
    alerts_json = json.dumps(alerts)
    db_location = Location(user_id=user_id, city=city, alerts_json=alerts_json)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location