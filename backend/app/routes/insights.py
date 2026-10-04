from datetime import datetime, timezone
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from ..database import get_db
from ..models import Student, Campaign, FunnelMetric, Experiment
from ..schemas import AIInsightsResponse, AIInsightItem, GrowthDecision

router = APIRouter(prefix="/api/insights", tags=["AI Insights"])

@router.get("", response_model=AIInsightsResponse)
def get_ai_growth_insights(db: Session = Depends(get_db)):
    # 1. Fetch live metrics from DB
    campaigns = db.query(Campaign).all()
    total_students = db.query(Student).count()
    funnel = db.query(FunnelMetric).first()
    visitors = funnel.stage_visitors if funnel else 2000
    forms_started = funnel.stage_forms_started if funnel else 800

    channel_regs = dict(
        db.query(Student.channel, func.count(Student.id)).group_by(Student.channel).all()
    )

    # Calculate channel metrics
    channel_stats = []
    for c in campaigns:
        regs = channel_regs.get(c.channel, c.registrations)
        ctr = (c.clicks / c.impressions * 100) if c.impressions > 0 else 0
        conv = (regs / c.clicks * 100) if c.clicks > 0 else 0
        cac = (c.budget / regs) if regs > 0 else 0
        channel_stats.append({
            "channel": c.channel,
            "budget": c.budget,
            "impressions": c.impressions,
            "clicks": c.clicks,
            "regs": regs,
            "ctr": ctr,
            "conv": conv,
            "cac": cac
        })

    # Sort channels by registrations and CAC
    channel_stats_by_regs = sorted(channel_stats, key=lambda x: x["regs"], reverse=True)
    channel_stats_by_cac = sorted([c for c in channel_stats if c["regs"] > 0], key=lambda x: x["cac"])

    best_channel = channel_stats_by_regs[0] if channel_stats_by_regs else None
    lowest_cac_channel = channel_stats_by_cac[0] if channel_stats_by_cac else None

    whatsapp_stats = next((c for c in channel_stats if c["channel"] == "WhatsApp"), None)
    linkedin_stats = next((c for c in channel_stats if c["channel"] == "LinkedIn"), None)
    referral_stats = next((c for c in channel_stats if c["channel"] == "Referral"), None)
    clubs_stats = next((c for c in channel_stats if c["channel"] == "College Clubs"), None)
    email_stats = next((c for c in channel_stats if c["channel"] == "Email"), None)

    insights: List[AIInsightItem] = []
    decisions: List[GrowthDecision] = []

    # --- INSIGHT 1: Highest Volume Channel ---
    if best_channel:
        share = round((best_channel["regs"] / max(total_students, 1)) * 100, 1)
        insights.append(AIInsightItem(
            category="Channel Volume",
            title=f"{best_channel['channel']} Dominates Total Registrations",
            observation=f"{best_channel['channel']} currently generates {best_channel['regs']} registrations ({share}% of total) at ₹{best_channel['cac']:.2f} per registration.",
            recommendation=f"Prioritize student community ambassadors and batch WhatsApp distribution sequences during peak evening hours (7 PM - 10 PM).",
            action_type="SCALE",
            metric_evidence=f"{best_channel['regs']} registrations, ₹{best_channel['cac']:.2f} CAC, {best_channel['conv']:.1f}% click-to-reg conversion"
        ))

    # --- INSIGHT 2: Channel Efficiency Comparison (WhatsApp vs LinkedIn) ---
    if whatsapp_stats and linkedin_stats:
        conv_diff = round(whatsapp_stats["conv"] - linkedin_stats["conv"], 1)
        insights.append(AIInsightItem(
            category="Conversion Efficiency",
            title="LinkedIn Shows Lower Conversion Compared with WhatsApp",
            observation=f"LinkedIn click-to-registration conversion is {linkedin_stats['conv']:.1f}% compared to {whatsapp_stats['conv']:.1f}% on WhatsApp (a {conv_diff}% gap).",
            recommendation="Refactor LinkedIn messaging from generic event posts to interview-readiness proof hooks, or reallocate ₹150 of budget towards WhatsApp groups.",
            action_type="TEST",
            metric_evidence=f"LinkedIn Conv: {linkedin_stats['conv']:.1f}%, CAC: ₹{linkedin_stats['cac']:.2f} vs WhatsApp Conv: {whatsapp_stats['conv']:.1f}%, CAC: ₹{whatsapp_stats['cac']:.2f}"
        ))

    # --- INSIGHT 3: Viral Referral Loop ---
    if referral_stats:
        ref_students = db.query(Student).filter(Student.referred_by.isnot(None)).count()
        k_factor = round(ref_students / max(total_students - ref_students, 1), 2)
        insights.append(AIInsightItem(
            category="Viral Coefficient",
            title="Referral Loop Has Strong Acquisition Efficiency",
            observation=f"Referral engine has generated {referral_stats['regs']} registrations with an effective CAC of ₹{referral_stats['cac']:.2f} and estimated viral K-factor of {k_factor}.",
            recommendation="Introduce a 3-tier milestone referral incentive: 'Refer 3 friends to get the AI Project Starter GitHub Repo & Template'.",
            action_type="SCALE",
            metric_evidence=f"{referral_stats['regs']} referred registrations, ₹{referral_stats['budget']:.0f} allocation, ₹{referral_stats['cac']:.2f} CPR"
        ))

    # --- INSIGHT 4: Registration Funnel Drop-off ---
    if forms_started > 0 and visitors > 0:
        form_abandonment_pct = round(((forms_started - total_students) / forms_started) * 100, 1)
        insights.append(AIInsightItem(
            category="Funnel Optimization",
            title="Form Abandonment Opportunity Identified",
            observation=f"{forms_started} students started the registration modal but {total_students} completed it ({form_abandonment_pct}% drop-off at form fill).",
            recommendation="Reduce friction by auto-filling college and branch from campus club referral links and enabling 1-click Google Sign-In.",
            action_type="TEST",
            metric_evidence=f"Forms Started: {forms_started}, Completed: {total_students}, Drop-off: {form_abandonment_pct}%"
        ))

    # --- DECISION ENGINE MATRIX (What should we do next?) ---
    # 1. WhatsApp -> SCALE
    if whatsapp_stats:
        decisions.append(GrowthDecision(
            channel="WhatsApp",
            action="SCALE",
            metric=f"{whatsapp_stats['regs']} Regs ({(whatsapp_stats['regs']/max(total_students,1)*100):.1f}% share), ₹{whatsapp_stats['cac']:.2f} CAC",
            reason="Highest conversion rate and lowest friction among engineering batch groups. Immediate ROI on community rep incentives.",
            priority="High"
        ))

    # 2. College Clubs -> SCALE
    if clubs_stats:
        decisions.append(GrowthDecision(
            channel="College Clubs",
            action="SCALE",
            metric=f"{clubs_stats['regs']} Regs, ₹{clubs_stats['cac']:.2f} CAC, {clubs_stats['conv']:.1f}% Conv",
            reason="Strong institutional trust from club presidents and official lab announcements. High intent engineering students.",
            priority="High"
        ))

    # 3. Referral -> SCALE
    if referral_stats:
        decisions.append(GrowthDecision(
            channel="Referral",
            action="SCALE",
            metric=f"{referral_stats['regs']} Regs, ₹{referral_stats['cac']:.2f} CAC, 100% peer trust",
            reason="Organic social proof. Top students are driving double-digit registrations each. Gamify with instant milestone rewards.",
            priority="High"
        ))

    # 4. LinkedIn -> TEST
    if linkedin_stats:
        decisions.append(GrowthDecision(
            channel="LinkedIn",
            action="TEST",
            metric=f"{linkedin_stats['regs']} Regs, ₹{linkedin_stats['cac']:.2f} CAC, {linkedin_stats['conv']:.1f}% Conv",
            reason="High impressions but lower conversion than WhatsApp. Test Variant B headline focusing on 'Interview Portfolio Project' before scaling ad spend.",
            priority="Medium"
        ))

    # 5. Email -> MAINTAIN
    if email_stats:
        decisions.append(GrowthDecision(
            channel="Email",
            action="MAINTAIN",
            metric=f"{email_stats['regs']} Regs, ₹{email_stats['cac']:.2f} CAC, 26.9% Conv",
            reason="Steady baseline channel via department notices and training placement cell lists. Keep cadence at 2 sends (Day 1 & Day 6).",
            priority="Medium"
        ))

    return AIInsightsResponse(
        badge="Demo AI Insights (Deterministic Engine - LLM Architecture Ready)",
        insights=insights,
        decisions=decisions,
        generated_at=datetime.now(timezone.utc)
    )
