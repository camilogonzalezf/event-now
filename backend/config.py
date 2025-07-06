import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    JSON_PATH       = os.getenv("JSON_PATH", "reservations.json")
    EVENTS_PATH     = os.getenv("EVENTS_PATH", "events.json")
    CORS_ORIGINS    = ["http://localhost:3000"]
