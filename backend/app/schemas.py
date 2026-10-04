from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

# --- Student Schemas ---
class StudentCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=5, max_length=180)
    phone: str = Field(..., min_length=8, max_length=25)
    college: str = Field(..., min_length=2, max_length=180)
    branch: str = Field(..., min_length=2, max_length=100)
    graduation_year: int = Field(default=2025, ge=2024, le=2028)
    preferred_channel: str = Field(default="WhatsApp")
    referral_code: Optional[str] = Field(default=None, max_length=50)


class StudentResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    college: str
    branch: str
    graduation_year: int
    channel: str
    referral_code: str
    referred_by: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class RegistrationSuccessResponse(BaseModel):
    student: StudentResponse
    referral_code: str
    referral_url: str
    message: str
    referrals_count: int = 0
    rank: Optional[int] = None


# --- Referral & Leaderboard Schemas ---
class LeaderboardEntry(BaseModel):
    rank: int
    student_name: str
    referral_code: str
    referrals_count: int
    registrations_generated: int
    college: str
    channel: str


# --- Campaign & Channel Schemas ---
class ChannelAnalyticsItem(BaseModel):
    channel: str
    budget: float
    impressions: int
    clicks: int
    registrations: int
    ctr_pct: float
    conversion_rate_pct: float
    cost_per_registration: float
    contribution_pct: float


class BudgetAnalyticsResponse(BaseModel):
    total_budget: float
    total_spent: float
    budget_remaining: float
    overall_cost_per_registration: float
    channels: List[ChannelAnalyticsItem]
    is_simulation: bool = True


# --- Funnel Schemas ---
class FunnelStage(BaseModel):
    stage: str
    count: int
    conversion_from_previous_pct: float
    drop_off_pct: float
    overall_conversion_pct: float


class FunnelAnalyticsResponse(BaseModel):
    reach: int
    visitors: int
    forms_started: int
    registrations_completed: int
    overall_visitor_to_reg_pct: float
    stages: List[FunnelStage]
    is_simulation: bool = True


# --- Experiment Schemas ---
class ExperimentCreate(BaseModel):
    name: str
    variant_a: str
    variant_b: str


class ExperimentResponse(BaseModel):
    id: int
    name: str
    variant_a: str
    variant_b: str
    impressions_a: int
    impressions_b: int
    clicks_a: int
    clicks_b: int
    registrations_a: int
    registrations_b: int
    ctr_a_pct: float
    ctr_b_pct: float
    conversion_a_pct: float
    conversion_b_pct: float
    winner: str
    winner_reasoning: str
    status: str
    model_config = ConfigDict(from_attributes=True)


# --- Growth Decision & AI Insights Schemas ---
class GrowthDecision(BaseModel):
    channel: str
    action: str  # SCALE, MAINTAIN, TEST, REDUCE
    metric: str
    reason: str
    priority: str  # High, Medium, Low


class AIInsightItem(BaseModel):
    category: str
    title: str
    observation: str
    recommendation: str
    action_type: str  # SCALE, MAINTAIN, TEST, REDUCE
    metric_evidence: str


class AIInsightsResponse(BaseModel):
    badge: str = "Demo AI Insights (Deterministic Engine)"
    insights: List[AIInsightItem]
    decisions: List[GrowthDecision]
    generated_at: datetime


# --- Overview KPI Schema ---
class OverviewKPIs(BaseModel):
    registration_target: int = 500
    current_registrations: int
    target_achievement_pct: float
    conversion_rate_pct: float
    referral_registrations: int
    total_campaign_spend: float
    cost_per_registration: float
    best_performing_channel: str
    best_channel_registrations: int
    is_simulation: bool = True


# --- Event Schema ---
class EventCreate(BaseModel):
    event_type: str  # 'page_view', 'form_start', 'registration_completed', 'referral_shared', etc.
    channel: Optional[str] = "Direct"
    student_id: Optional[int] = None
