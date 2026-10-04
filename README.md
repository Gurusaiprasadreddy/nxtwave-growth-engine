# 🚀 AI Workshop Growth Engine

> **NxtWave Growth Intern – Growth Challenge Submission**
> A full-stack growth simulation and analytics platform demonstrating how to acquire 500 final-year engineering students for NxtWave's *"Build Your First AI Project in 60 Minutes"* workshop.

---

## ⚠️ Simulation Disclaimer

**This application is a simulation only.**
- No real students were contacted
- No real money was spent  
- No real marketing messages were sent
- All data is synthetically generated to model realistic growth campaign outcomes

---

## 🎯 Challenge Brief

| Attribute | Value |
|---|---|
| **Target** | 500 final-year engineering students |
| **Workshop** | "Build Your First AI Project in 60 Minutes" |
| **Budget** | ₹2,000 (simulated) |
| **Duration** | 7 days |
| **Mode** | Simulation / Assignment |

---

## ✨ Application Features

### 🏠 Landing Page (Variant A / Variant B A/B Test)
- Live A/B tested hero headlines with CTA copy variations
- Countdown timer to workshop
- Social proof bar (registrations, colleges, satisfaction %)
- Student registration form with real-time validation
- Referral URL detection (?ref=CODE parameter)
- Post-registration viral share modal with referral code

### 📊 Growth Analytics Dashboard (7 Tabs)

| Tab | Description |
|---|---|
| **Overview** | KPI cards: registrations, target%, CVR, budget, best channel |
| **Channel Analytics** | Bar/pie charts per channel with CAC and conversion rates |
| **Funnel** | Multi-stage drop-off funnel with animated visualization |
| **A/B Experiments** | Two live experiments with statistical winner detection |
| **Referral Leaderboard** | Top referrers ranked by referral count |
| **Budget** | Channel-wise spend, ROI, and cost-per-registration |
| **AI Insights** | Deterministic AI engine with SCALE/TEST/MAINTAIN decisions |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.11+, FastAPI, Uvicorn, SQLAlchemy, SQLite, Pydantic |
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Recharts, Lucide React |
| **Database** | SQLite (auto-created, zero-config) |
| **Testing** | Pytest, HTTPX |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+

### One-Click Start (Windows PowerShell)

`powershell
.\start.ps1
`

### Manual Setup

`powershell
# Backend
python -m venv backend\venv
.\backend\venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
uvicorn backend.app.main:app --reload --host 127.0.0.1 --port 8000
`

**App runs at:** http://127.0.0.1:8000
**API docs at:** http://127.0.0.1:8000/docs

---

## 📈 Simulated Campaign Results (7-Day, ₹2,000 Budget)

| Channel | Budget (₹) | Registrations | CAC (₹) | Conv. Rate |
|---|---|---|---|---|
| WhatsApp Groups | 400 | 130 | 3.08 | 28.9% |
| Referral Program | 500 | 120 | 4.17 | Organic |
| College Clubs | 400 | 100 | 4.00 | 26.3% |
| LinkedIn Organic | 400 | 80 | 5.00 | 25.8% |
| Email Outreach | 300 | 70 | 4.29 | 26.9% |
| **Total** | **₹2,000** | **500** | **₹4.00** | **24.99%** |

**A/B Test Winner:** Variant B ("Land Your First AI Job: Build a Real Project in 60 Min") → +11.8% higher CVR

---

## 📡 Key API Endpoints

| Endpoint | Description |
|---|---|
| GET /api/health | Health check |
| GET /api/analytics/overview | Overview KPIs |
| GET /api/analytics/channels | Channel breakdown |
| GET /api/analytics/funnel | Funnel metrics |
| GET /api/analytics/budget | Budget analysis |
| GET /api/experiments | A/B test results |
| GET /api/insights | AI growth insights |
| POST /api/registrations | Register a student |
| POST /api/demo/load | Load 500-student simulation |
| POST /api/demo/reset | Reset to clean state |

---

## 🧠 Growth Framework: Idea → Build → Learn → Scale

- **WhatsApp + College Clubs** = lowest CAC (₹3-4), highest trust with engineering students
- **Referral loop** = viral K-factor 0.32, organic registrations at ₹4.17 CAC
- **A/B testing** = job-outcome framing converts 11.8% better
- **Scale path:** ₹5,000 budget → projected 1,200+ registrations at same efficiency

---

*All data is simulated. No real students were contacted.*
