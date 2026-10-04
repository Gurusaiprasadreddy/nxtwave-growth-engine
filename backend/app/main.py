import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from contextlib import asynccontextmanager

from .database import engine, Base, SessionLocal
from .models import Student
from .seed_data import seed_database
from .routes import registrations, analytics, experiments, insights, demo

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Auto-seed if empty
    db = SessionLocal()
    try:
        count = db.query(Student).count()
        if count == 0:
            print("Seeding initial 500-student realistic growth simulation data...")
            seed_database(db, full_campaign=True)
            print(f"Seeding completed: {db.query(Student).count()} students loaded.")
    finally:
        db.close()
    yield

app = FastAPI(
    title="AI Workshop Growth Engine API",
    description="Backend growth analytics, referral attribution, and A/B experimentation engine for NxtWave's AI Workshop Challenge.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration for development and local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers first
app.include_router(registrations.router)
app.include_router(analytics.router)
app.include_router(experiments.router)
app.include_router(insights.router)
app.include_router(demo.router)

@app.get("/api/health")
def api_health():
    return {
        "service": "AI Workshop Growth Engine",
        "documentation": "/docs",
        "health": "healthy",
        "target": "500 final-year engineering students",
        "budget": "₹2,000",
        "status": "Simulation Mode Active"
    }

# Mount frontend/dist if available
FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))

if os.path.exists(FRONTEND_DIST):
    # Mount assets folder
    assets_dir = os.path.join(FRONTEND_DIST, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # SPA Fallback for non-API routes
    @app.get("/{full_path:path}")
    async def serve_spa(request: Request, full_path: str):
        # Don't hijack /api routes
        if full_path.startswith("api/") or full_path == "api":
            return JSONResponse(status_code=404, content={"detail": "API route not found"})
        
        # Check if direct file exists in dist
        file_path = os.path.join(FRONTEND_DIST, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        
        index_file = os.path.join(FRONTEND_DIST, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return JSONResponse(status_code=404, content={"detail": "Frontend index.html not found"})
else:
    @app.get("/")
    def root():
        return {
            "service": "AI Workshop Growth Engine",
            "documentation": "/docs",
            "health": "healthy",
            "target": "500 final-year engineering students",
            "budget": "₹2,000",
            "status": "Simulation Mode Active",
            "frontend_status": "Build frontend via `cd frontend && npm run build` to serve SPA directly"
        }
