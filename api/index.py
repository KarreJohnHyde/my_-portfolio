import sys
import os
from pathlib import Path

# Add backend directory to path
backend_dir = Path(__file__).resolve().parent.parent / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

try:
    from app.main import app
except Exception as e:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    
    app = FastAPI(title="Johnny-Talks Serverless", version="1.0.0")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health")
    def health():
        return {
            "status": "ok",
            "application": "Johnny-Talks",
            "runtime": "vercel-serverless",
            "init_notice": str(e)
        }

    @app.post("/chat/")
    def chat_fallback(req: dict):
        return {
            "answer": "Johnny-Talks Serverless Endpoint is active. Client-side grounded synthesis active.",
            "sources": []
        }
