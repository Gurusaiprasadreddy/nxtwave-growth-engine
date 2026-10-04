from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

def utc_now():
    return datetime.now(timezone.utc)

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(180), unique=True, index=True, nullable=False)
    phone = Column(String(30), nullable=False)
    college = Column(String(180), nullable=False)
    branch = Column(String(100), nullable=False)
    graduation_year = Column(Integer, nullable=False, default=2025)
    channel = Column(String(60), nullable=False, default="Direct")
    referral_code = Column(String(50), unique=True, index=True, nullable=False)
    referred_by = Column(String(50), nullable=True, index=True)
    created_at = Column(DateTime, default=utc_now)

    events = relationship("Event", back_populates="student", cascade="all, delete-orphan")


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    channel = Column(String(60), unique=True, index=True, nullable=False)
    budget = Column(Float, nullable=False, default=0.0)
    impressions = Column(Integer, nullable=False, default=0)
    clicks = Column(Integer, nullable=False, default=0)
    registrations = Column(Integer, nullable=False, default=0)
    created_at = Column(DateTime, default=utc_now)


class Experiment(Base):
    __tablename__ = "experiments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    variant_a = Column(String(255), nullable=False)
    variant_b = Column(String(255), nullable=False)
    impressions_a = Column(Integer, nullable=False, default=0)
    impressions_b = Column(Integer, nullable=False, default=0)
    clicks_a = Column(Integer, nullable=False, default=0)
    clicks_b = Column(Integer, nullable=False, default=0)
    registrations_a = Column(Integer, nullable=False, default=0)
    registrations_b = Column(Integer, nullable=False, default=0)
    status = Column(String(30), nullable=False, default="Active")  # Active, Concluded, Paused


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=True)
    event_type = Column(String(80), nullable=False) # page_view, form_start, registration_completed, referral_shared, link_copied
    channel = Column(String(60), nullable=False, default="Direct")
    timestamp = Column(DateTime, default=utc_now)

    student = relationship("Student", back_populates="events")


class FunnelMetric(Base):
    __tablename__ = "funnel_metrics"

    id = Column(Integer, primary_key=True, index=True)
    stage_reach = Column(Integer, nullable=False, default=4000)
    stage_visitors = Column(Integer, nullable=False, default=2000)
    stage_forms_started = Column(Integer, nullable=False, default=800)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
