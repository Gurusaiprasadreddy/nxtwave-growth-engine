import random
import string
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, List

from ..database import get_db
from ..models import Student, Campaign, Event, FunnelMetric
from ..schemas import StudentCreate, StudentResponse, RegistrationSuccessResponse

router = APIRouter(prefix="/api/registrations", tags=["Registrations"])

def generate_unique_code(name: str, db: Session) -> str:
    clean_prefix = "".join([c for c in name.upper() if c.isalpha()])[:4]
    if len(clean_prefix) < 3:
        clean_prefix = "NXTW"
    
    # Try deterministic + random suffix until unique
    for _ in range(20):
        suffix = "".join(random.choices(string.digits, k=3))
        code = f"{clean_prefix}{suffix}"
        exists = db.query(Student).filter(Student.referral_code == code).first()
        if not exists:
            return code
    # Fallback
    return f"{clean_prefix}{random.randint(1000, 9999)}"

@router.post("", response_model=RegistrationSuccessResponse, status_code=status.HTTP_201_CREATED)
def register_student(payload: StudentCreate, db: Session = Depends(get_db)):
    # 1. Check if email already registered
    existing_student = db.query(Student).filter(Student.email == payload.email.strip().lower()).first()
    if existing_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{payload.email}' is already registered for this workshop! Check your referral code: {existing_student.referral_code}"
        )

    # 2. Check referral code if provided
    referrer_code = None
    referring_student = None
    if payload.referral_code and payload.referral_code.strip():
        code_input = payload.referral_code.strip().upper()
        referring_student = db.query(Student).filter(Student.referral_code == code_input).first()
        if referring_student:
            referrer_code = code_input

    # 3. Determine attribution channel
    channel = payload.preferred_channel
    if referrer_code:
        channel = "Referral"

    # 4. Generate unique referral code for the new registrant
    unique_code = generate_unique_code(payload.name, db)

    # 5. Create student record
    student = Student(
        name=payload.name.strip(),
        email=payload.email.strip().lower(),
        phone=payload.phone.strip(),
        college=payload.college.strip(),
        branch=payload.branch.strip(),
        graduation_year=payload.graduation_year,
        channel=channel,
        referral_code=unique_code,
        referred_by=referrer_code
    )
    db.add(student)
    db.flush()

    # 6. Update Campaign registrations counter
    campaign = db.query(Campaign).filter(Campaign.channel == channel).first()
    if campaign:
        campaign.registrations += 1
    else:
        # If channel not yet registered, link to Direct or existing
        fallback = db.query(Campaign).first()
        if fallback:
            fallback.registrations += 1

    # 7. Update funnel metric (increment registrations_completed & forms_started if needed)
    funnel = db.query(FunnelMetric).first()
    if funnel:
        funnel.stage_forms_started += 1
    
    # 8. Record event
    event = Event(
        student_id=student.id,
        event_type="registration_completed",
        channel=channel
    )
    db.add(event)
    db.commit()
    db.refresh(student)

    # Calculate referral rank/count for confirmation
    ref_count = db.query(Student).filter(Student.referred_by == unique_code).count()

    return RegistrationSuccessResponse(
        student=StudentResponse.model_validate(student),
        referral_code=unique_code,
        referral_url=f"/register?ref={unique_code}",
        message="Registration successful! Invite 3 peers to unlock the AI Project Starter Pack.",
        referrals_count=ref_count,
        rank=None
    )


@router.get("", response_model=List[StudentResponse])
def get_registrations(
    limit: int = Query(50, ge=1, le=500),
    offset: int = Query(0, ge=0),
    channel: Optional[str] = None,
    college: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Student)
    if channel:
        query = query.filter(Student.channel == channel)
    if college:
        query = query.filter(Student.college.ilike(f"%{college}%"))
    
    students = query.order_by(Student.created_at.desc()).offset(offset).limit(limit).all()
    return [StudentResponse.model_validate(s) for s in students]


@router.get("/summary")
def get_registrations_summary(db: Session = Depends(get_db)):
    total = db.query(Student).count()
    by_channel = db.query(Student.channel, func.count(Student.id)).group_by(Student.channel).all()
    by_college = db.query(Student.college, func.count(Student.id)).group_by(Student.college).order_by(func.count(Student.id).desc()).limit(5).all()
    
    return {
        "total_registrations": total,
        "channel_breakdown": {c: cnt for c, cnt in by_channel},
        "top_colleges": [{"college": c, "count": cnt} for c, cnt in by_college]
    }
