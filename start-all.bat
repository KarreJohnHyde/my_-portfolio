@echo off
echo ==========================================================
echo Starting Johnny-Talks & Full-Stack Portfolio...
echo Backend:  http://127.0.0.1:8000 (Docs: /docs, Health: /health)
echo Frontend: http://localhost:8443
echo ==========================================================

start "Johnny-Talks FastAPI Backend" cmd /k "cd /d %~dp0backend && python -m uvicorn app.main:app --port 8000 --host 127.0.0.1 --reload"
start "Portfolio React Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo Both services launched in separate windows!
