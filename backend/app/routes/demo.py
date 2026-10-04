from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone

from ..database import get_db
from ..models import Event, FunnelMetric, Student
from ..schemas import EventCreate
from ..seed_data import seed_database

router = APIRouter(prefix="/api", tags=["Demo & System"])

@router.post("/demo/load")
def load_demo_campaign(db: Session = Depends(get_db)):
    """Loads the full realistic 500-student 7-day campaign simulation dataset."""
    seed_database(db, full_campaign=True)
    count = db.query(Student).count()
    return {
        "status": "success",
        "message": f"Successfully loaded simulated campaign with {count} student registrations across 5 channels.",
        "registrations": count,
        "is_simulation": True
    }

@router.post("/demo/reset")
def reset_demo_data(db: Session = Depends(get_db)):
    """Resets the database to a clean, minimal baseline state."""
    seed_database(db, full_campaign=False)
    count = db.query(Student).count()
    return {
        "status": "success",
        "message": "Database reset to minimal baseline.",
        "registrations": count,
        "is_simulation": True
    }

@router.post("/events", status_code=status.HTTP_201_CREATED)
def record_event(payload: EventCreate, db: Session = Depends(get_db)):
    """Records funnel and interaction events (page views, form starts, link copies)."""
    event = Event(
        student_id=payload.student_id,
        event_type=payload.event_type,
        channel=payload.channel or "Direct",
        timestamp=datetime.now(timezone.utc)
    )
    db.add(event)

    # If it's a page_view or form_start, optionally increment the funnel counters
    funnel = db.query(FunnelMetric).first()
    if funnel:
        if payload.event_type == "page_view":
            funnel.stage_visitors += 1
        elif payload.event_type == "form_start":
            funnel.stage_forms_started += 1

    db.commit()
    return {"status": "recorded", "event_type": payload.event_type}

@router.get("/system/status")
def system_status(db: Session = Depends(get_db)):
    count = db.query(Student).count()
    return {
        "app_name": "AI Workshop Growth Engine",
        "version": "1.0.0",
        "status": "healthy",
        "total_registrations": count,
        "simulation_mode": True,
        "target_audience": "Final-Year Engineering Students",
        "workshop_title": "Build Your First AI Project in 60 Minutes"
    }
