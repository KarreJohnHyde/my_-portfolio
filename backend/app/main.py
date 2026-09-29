from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import create_db
from app.api.chat import router as chat_router
from app.api.documents import router as document_router
from app.api.admin import router as admin_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite tables on startup
    try:
        create_db()
        print("Database tables initialized successfully.")
    except Exception as e:
        print(f"Database initialization error: {e}")
    yield

app = FastAPI(
    title=settings.app_name,
    description="Cognitive Digital Twin & Master Client Advisory Engine for Karre John Hyde",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router)
app.include_router(document_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "service": "Johnny-Talks Advisory Engine",
        "status": "online",
        "documentation": "/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {
        "status": "ok",
        "application": settings.app_name,
        "chat_model": settings.openai_chat_model,
        "embedding_model": settings.openai_embedding_model
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.api_host, port=settings.api_port, reload=True)
