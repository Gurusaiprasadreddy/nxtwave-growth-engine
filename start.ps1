# ============================================================
# AI Workshop Growth Engine - One-Click Startup
# NxtWave Growth Intern Challenge
# ============================================================

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  AI Workshop Growth Engine" -ForegroundColor White
Write-Host "  NxtWave Growth Intern - Growth Challenge" -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

$Root = $PSScriptRoot
$BackendVenv = Join-Path $Root "backend\venv\Scripts\Activate.ps1"
$BackendApp = Join-Path $Root "backend\app\main.py"
$FrontendDist = Join-Path $Root "frontend\dist"

# --- Check Python venv ---
if (-not (Test-Path $BackendVenv)) {
    Write-Host "[SETUP] Creating Python virtual environment..." -ForegroundColor Yellow
    python -m venv "$Root\backend\venv"
}

# --- Activate venv and install deps ---
Write-Host "[SETUP] Installing backend dependencies..." -ForegroundColor Yellow
& "$Root\backend\venv\Scripts\pip.exe" install -r "$Root\backend\requirements.txt" --quiet

# --- Build frontend if dist is missing ---
if (-not (Test-Path $FrontendDist)) {
    Write-Host "[SETUP] Building frontend (first-time build)..." -ForegroundColor Yellow
    Push-Location "$Root\frontend"
    npm install --silent
    npm run build
    Pop-Location
    Write-Host "[SETUP] Frontend built successfully." -ForegroundColor Green
}

Write-Host ""
Write-Host "[START] Launching AI Workshop Growth Engine..." -ForegroundColor Green
Write-Host "  App URL  : http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host "  API Docs : http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host "  Health   : http://127.0.0.1:8000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# --- Start FastAPI server ---
& "$Root\backend\venv\Scripts\uvicorn.exe" backend.app.main:app --host 127.0.0.1 --port 8000 --reload
