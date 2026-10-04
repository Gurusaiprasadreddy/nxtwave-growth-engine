import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from backend.app.main import app
from backend.app.database import Base, get_db
from backend.app.seed_data import seed_database
from backend.app.models import Student, Campaign, Experiment

# Use an in-memory SQLite database with StaticPool so all connections share the DB
TEST_DATABASE_URL = "sqlite:///:memory:"

test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    db = TestingSessionLocal()
    seed_database(db, full_campaign=True)
    db.close()
    yield
    Base.metadata.drop_all(bind=test_engine)

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "AI Workshop Growth Engine"

    # Also test that root serves the app (status 200)
    root_res = client.get("/")
    assert root_res.status_code == 200

def test_overview_analytics_calculations():
    response = client.get("/api/analytics/overview")
    assert response.status_code == 200
    data = response.json()
    assert data["registration_target"] == 500
    assert data["current_registrations"] == 500
    assert data["target_achievement_pct"] == 100.0
    # Total spend is ₹2000, 500 regs -> CPR = ₹4.00
    assert data["total_campaign_spend"] == 2000.0
    assert data["cost_per_registration"] == 4.0
    assert data["best_performing_channel"] == "WhatsApp"

def test_student_registration_and_referral_generation():
    payload = {
        "name": "Kiran Teja",
        "email": "kiran.teja.test@demo.ac.in",
        "phone": "9876543210",
        "college": "CBIT Hyderabad",
        "branch": "Computer Science & Engineering",
        "graduation_year": 2025,
        "preferred_channel": "WhatsApp",
        "referral_code": None
    }
    response = client.post("/api/registrations", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["student"]["name"] == "Kiran Teja"
    assert data["referral_code"].startswith("KIRA")
    assert data["referral_url"] == f"/register?ref={data['referral_code']}"

def test_referral_attribution():
    # Register first student who gets a referral code
    p1 = {
        "name": "Priya Sharma",
        "email": "priya.sharma.test@demo.ac.in",
        "phone": "9876543211",
        "college": "VNR VJIET",
        "branch": "IT",
        "graduation_year": 2025,
        "preferred_channel": "LinkedIn"
    }
    r1 = client.post("/api/registrations", json=p1)
    ref_code = r1.json()["referral_code"]

    # Register second student with Priya's referral code
    p2 = {
        "name": "Tarun Kumar",
        "email": "tarun.kumar.test@demo.ac.in",
        "phone": "9876543212",
        "college": "VNR VJIET",
        "branch": "IT",
        "graduation_year": 2025,
        "preferred_channel": "Direct",
        "referral_code": ref_code
    }
    r2 = client.post("/api/registrations", json=p2)
    assert r2.status_code == 201
    d2 = r2.json()
    assert d2["student"]["referred_by"] == ref_code
    assert d2["student"]["channel"] == "Referral"

def test_duplicate_registration_prevention():
    payload = {
        "name": "Duplicate Student",
        "email": "duplicate.test@demo.ac.in",
        "phone": "9876500000",
        "college": "Osmania University",
        "branch": "CSE",
        "graduation_year": 2025,
        "preferred_channel": "WhatsApp"
    }
    r1 = client.post("/api/registrations", json=payload)
    assert r1.status_code == 201
    
    # Second attempt with same email
    r2 = client.post("/api/registrations", json=payload)
    assert r2.status_code == 400
    assert "already registered" in r2.json()["detail"]

def test_channel_analytics():
    response = client.get("/api/analytics/channels")
    assert response.status_code == 200
    channels = response.json()
    assert len(channels) == 5
    
    # Check that channels have valid numbers
    total_contribution = sum(c["contribution_pct"] for c in channels)
    assert 99.0 <= total_contribution <= 101.0  # approximate 100% rounding

def test_funnel_analytics():
    response = client.get("/api/analytics/funnel")
    assert response.status_code == 200
    funnel = response.json()
    assert funnel["reach"] == 4000
    assert funnel["visitors"] == 2000
    assert funnel["forms_started"] == 800
    assert funnel["registrations_completed"] == 500
    assert funnel["overall_visitor_to_reg_pct"] == 25.0

def test_ab_experiment_winner_calculation():
    response = client.get("/api/experiments")
    assert response.status_code == 200
    experiments = response.json()
    assert len(experiments) >= 1
    exp = experiments[0]
    assert exp["winner"] in ["Variant A", "Variant B"]
    assert "outperformed" in exp["winner_reasoning"] or "higher" in exp["winner_reasoning"]

def test_budget_analytics():
    response = client.get("/api/analytics/budget")
    assert response.status_code == 200
    budget = response.json()
    assert budget["total_budget"] == 2000.0
    assert budget["total_spent"] == 2000.0
    assert budget["budget_remaining"] == 0.0
    assert budget["overall_cost_per_registration"] == 4.0

def test_ai_insights_deterministic_engine():
    response = client.get("/api/insights")
    assert response.status_code == 200
    data = response.json()
    assert "Demo AI Insights" in data["badge"]
    assert len(data["insights"]) >= 3
    assert len(data["decisions"]) >= 3
    actions = [d["action"] for d in data["decisions"]]
    assert "SCALE" in actions

def test_demo_load_and_reset():
    # Test reset
    r_reset = client.post("/api/demo/reset")
    assert r_reset.status_code == 200
    assert r_reset.json()["registrations"] < 500

    # Test reload
    r_load = client.post("/api/demo/load")
    assert r_load.status_code == 200
    assert r_load.json()["registrations"] == 500
