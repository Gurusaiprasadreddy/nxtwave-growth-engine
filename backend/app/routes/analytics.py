from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from ..database import get_db
from ..models import Student, Campaign, FunnelMetric
from ..schemas import (
    OverviewKPIs,
    ChannelAnalyticsItem,
    BudgetAnalyticsResponse,
    FunnelAnalyticsResponse,
    FunnelStage,
    LeaderboardEntry
)

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/overview", response_model=OverviewKPIs)
def get_overview(db: Session = Depends(get_db)):
    target = 500
    current_regs = db.query(Student).count()
    target_achievement_pct = round((current_regs / target) * 100, 2) if target > 0 else 0.0

    # Total spend across active campaigns
    total_spend = db.query(func.sum(Campaign.budget)).scalar() or 2000.0
    cost_per_reg = round(total_spend / current_regs, 2) if current_regs > 0 else 0.0

    # Funnel visitors for conversion rate
    funnel = db.query(FunnelMetric).first()
    visitors = funnel.stage_visitors if funnel else 2000
    conversion_rate_pct = round((current_regs / visitors) * 100, 2) if visitors > 0 else 0.0

    # Referral registrations count
    referral_regs = db.query(Student).filter(Student.referred_by.isnot(None)).count()
    if referral_regs == 0:
        # Also check channel == "Referral"
        referral_regs = db.query(Student).filter(Student.channel == "Referral").count()

    # Best performing channel
    best_channel_row = (
        db.query(Student.channel, func.count(Student.id).label("count"))
        .group_by(Student.channel)
        .order_by(func.count(Student.id).desc())
        .first()
    )
    best_channel = best_channel_row[0] if best_channel_row else "WhatsApp"
    best_count = best_channel_row[1] if best_channel_row else 0

    return OverviewKPIs(
        registration_target=target,
        current_registrations=current_regs,
        target_achievement_pct=target_achievement_pct,
        conversion_rate_pct=conversion_rate_pct,
        referral_registrations=referral_regs,
        total_campaign_spend=float(total_spend),
        cost_per_registration=cost_per_reg,
        best_performing_channel=best_channel,
        best_channel_registrations=best_count,
        is_simulation=True
    )


@router.get("/channels", response_model=List[ChannelAnalyticsItem])
def get_channels(db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    total_regs = db.query(Student).count()
    if total_regs == 0:
        total_regs = 1  # prevent div by zero

    # Get actual real-time count of students by channel
    channel_counts_dict = dict(
        db.query(Student.channel, func.count(Student.id)).group_by(Student.channel).all()
    )

    results = []
    for c in campaigns:
        actual_regs = channel_counts_dict.get(c.channel, c.registrations)
        ctr = round((c.clicks / c.impressions) * 100, 2) if c.impressions > 0 else 0.0
        conv = round((actual_regs / c.clicks) * 100, 2) if c.clicks > 0 else 0.0
        cpr = round(c.budget / actual_regs, 2) if actual_regs > 0 else 0.0
        contrib = round((actual_regs / total_regs) * 100, 1)

        results.append(ChannelAnalyticsItem(
            channel=c.channel,
            budget=float(c.budget),
            impressions=c.impressions,
            clicks=c.clicks,
            registrations=actual_regs,
            ctr_pct=ctr,
            conversion_rate_pct=conv,
            cost_per_registration=cpr,
            contribution_pct=contrib
        ))

    # Sort by registrations descending
    results.sort(key=lambda x: x.registrations, reverse=True)
    return results


@router.get("/funnel", response_model=FunnelAnalyticsResponse)
def get_funnel(db: Session = Depends(get_db)):
    funnel = db.query(FunnelMetric).first()
    reach = funnel.stage_reach if funnel else 4000
    visitors = funnel.stage_visitors if funnel else 2000
    forms_started = funnel.stage_forms_started if funnel else 800
    completed = db.query(Student).count()

    # Stages calculation
    # 1. Reach
    # 2. Visitors
    # 3. Forms Started
    # 4. Registrations Completed
    dropoff_1 = round(((reach - visitors) / reach) * 100, 1) if reach > 0 else 0.0
    conv_1 = round((visitors / reach) * 100, 1) if reach > 0 else 0.0

    dropoff_2 = round(((visitors - forms_started) / visitors) * 100, 1) if visitors > 0 else 0.0
    conv_2 = round((forms_started / visitors) * 100, 1) if visitors > 0 else 0.0

    dropoff_3 = round(((forms_started - completed) / forms_started) * 100, 1) if forms_started > 0 else 0.0
    conv_3 = round((completed / forms_started) * 100, 1) if forms_started > 0 else 0.0

    overall_conv = round((completed / visitors) * 100, 2) if visitors > 0 else 0.0

    stages = [
        FunnelStage(
            stage="Students Reached",
            count=reach,
            conversion_from_previous_pct=100.0,
            drop_off_pct=0.0,
            overall_conversion_pct=100.0
        ),
        FunnelStage(
            stage="Landing Page Visitors",
            count=visitors,
            conversion_from_previous_pct=conv_1,
            drop_off_pct=dropoff_1,
            overall_conversion_pct=round((visitors / reach) * 100, 1) if reach > 0 else 0.0
        ),
        FunnelStage(
            stage="Registration Started",
            count=forms_started,
            conversion_from_previous_pct=conv_2,
            drop_off_pct=dropoff_2,
            overall_conversion_pct=round((forms_started / reach) * 100, 1) if reach > 0 else 0.0
        ),
        FunnelStage(
            stage="Registrations Completed",
            count=completed,
            conversion_from_previous_pct=conv_3,
            drop_off_pct=dropoff_3,
            overall_conversion_pct=round((completed / reach) * 100, 1) if reach > 0 else 0.0
        )
    ]

    return FunnelAnalyticsResponse(
        reach=reach,
        visitors=visitors,
        forms_started=forms_started,
        registrations_completed=completed,
        overall_visitor_to_reg_pct=overall_conv,
        stages=stages,
        is_simulation=True
    )


@router.get("/referrals", response_model=List[LeaderboardEntry])
def get_referrals_leaderboard(db: Session = Depends(get_db)):
    # Group students by referred_by code to count referred registrations
    referral_counts = (
        db.query(Student.referred_by, func.count(Student.id).label("count"))
        .filter(Student.referred_by.isnot(None))
        .group_by(Student.referred_by)
        .order_by(func.count(Student.id).desc())
        .limit(20)
        .all()
    )

    leaderboard = []
    rank = 1
    for ref_code, count in referral_counts:
        # Find the student who owns this code
        owner = db.query(Student).filter(Student.referral_code == ref_code).first()
        if owner:
            leaderboard.append(LeaderboardEntry(
                rank=rank,
                student_name=owner.name,
                referral_code=ref_code,
                referrals_count=count,
                registrations_generated=count,
                college=owner.college,
                channel=owner.channel
            ))
            rank += 1
        else:
            leaderboard.append(LeaderboardEntry(
                rank=rank,
                student_name=f"Campus Ambassador ({ref_code})",
                referral_code=ref_code,
                referrals_count=count,
                registrations_generated=count,
                college="JNTU Hyderabad",
                channel="College Clubs"
            ))
            rank += 1

    return leaderboard


@router.get("/budget", response_model=BudgetAnalyticsResponse)
def get_budget_analytics(db: Session = Depends(get_db)):
    channels = get_channels(db)
    total_budget = 2000.0
    total_spent = sum(c.budget for c in channels)
    remaining = max(0.0, total_budget - total_spent)
    total_regs = sum(c.registrations for c in channels)
    overall_cpr = round(total_spent / total_regs, 2) if total_regs > 0 else 0.0

    return BudgetAnalyticsResponse(
        total_budget=total_budget,
        total_spent=total_spent,
        budget_remaining=remaining,
        overall_cost_per_registration=overall_cpr,
        channels=channels,
        is_simulation=True
    )
