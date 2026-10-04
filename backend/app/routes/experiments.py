from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models import Experiment
from ..schemas import ExperimentResponse, ExperimentCreate

router = APIRouter(prefix="/api/experiments", tags=["Experiments"])

def calculate_experiment_metrics(exp: Experiment) -> ExperimentResponse:
    ctr_a = round((exp.clicks_a / exp.impressions_a) * 100, 2) if exp.impressions_a > 0 else 0.0
    ctr_b = round((exp.clicks_b / exp.impressions_b) * 100, 2) if exp.impressions_b > 0 else 0.0

    conv_a = round((exp.registrations_a / exp.clicks_a) * 100, 2) if exp.clicks_a > 0 else 0.0
    conv_b = round((exp.registrations_b / exp.clicks_b) * 100, 2) if exp.clicks_b > 0 else 0.0

    # Decision logic based on conversion rate and click through rate
    # If conversion rates differ significantly
    if conv_b > conv_a and ctr_b >= ctr_a:
        winner = "Variant B"
        diff_conv = round(conv_b - conv_a, 2)
        diff_ctr = round(ctr_b - ctr_a, 2)
        reasoning = (
            f"Variant B outperformed Variant A with +{diff_conv}% higher conversion rate "
            f"({conv_b}% vs {conv_a}%) and +{diff_ctr}% higher CTR ({ctr_b}% vs {ctr_a}%). "
            f"Positioning directly around 'Interview Readiness' created higher urgency for final-year students."
        )
    elif conv_a > conv_b:
        winner = "Variant A"
        diff_conv = round(conv_a - conv_b, 2)
        reasoning = (
            f"Variant A won with +{diff_conv}% higher conversion rate ({conv_a}% vs {conv_b}%). "
            f"The simple '60 Minutes' clarity reduced perceived friction."
        )
    else:
        winner = "Variant B"
        reasoning = f"Variant B showed stronger click engagement ({ctr_b}% vs {ctr_a}% CTR)."

    return ExperimentResponse(
        id=exp.id,
        name=exp.name,
        variant_a=exp.variant_a,
        variant_b=exp.variant_b,
        impressions_a=exp.impressions_a,
        impressions_b=exp.impressions_b,
        clicks_a=exp.clicks_a,
        clicks_b=exp.clicks_b,
        registrations_a=exp.registrations_a,
        registrations_b=exp.registrations_b,
        ctr_a_pct=ctr_a,
        ctr_b_pct=ctr_b,
        conversion_a_pct=conv_a,
        conversion_b_pct=conv_b,
        winner=winner,
        winner_reasoning=reasoning,
        status=exp.status
    )

@router.get("", response_model=List[ExperimentResponse])
def get_experiments(db: Session = Depends(get_db)):
    experiments = db.query(Experiment).all()
    return [calculate_experiment_metrics(e) for e in experiments]

@router.post("", response_model=ExperimentResponse, status_code=status.HTTP_201_CREATED)
def create_experiment(payload: ExperimentCreate, db: Session = Depends(get_db)):
    exp = Experiment(
        name=payload.name,
        variant_a=payload.variant_a,
        variant_b=payload.variant_b,
        impressions_a=100,
        impressions_b=100,
        clicks_a=15,
        clicks_b=22,
        registrations_a=10,
        registrations_b=18,
        status="Active"
    )
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return calculate_experiment_metrics(exp)
