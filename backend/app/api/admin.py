from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.core.security import verify_admin
from app.db.database import get_session
from app.db.models import Document, IngestionJob, Conversation, Message
from app.rag.retriever import retrieve_context

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(verify_admin)])

@router.get("/overview")
def admin_overview(session: Session = Depends(get_session)):
    total_docs = len(session.exec(select(Document)).all())
    total_convs = len(session.exec(select(Conversation)).all())
    total_messages = len(session.exec(select(Message)).all())
    recent_jobs = session.exec(select(IngestionJob).order_by(IngestionJob.created_at.desc()).limit(10)).all()

    return {
        "status": "healthy",
        "total_documents": total_docs,
        "total_conversations": total_convs,
        "total_messages": total_messages,
        "recent_ingestion_jobs": recent_jobs
    }

@router.get("/ingestion-jobs")
def get_ingestion_jobs(session: Session = Depends(get_session)):
    return session.exec(select(IngestionJob).order_by(IngestionJob.created_at.desc()).limit(50)).all()

@router.get("/retrieval-diagnostics")
def test_retrieval(query: str = "RAG architecture in Study2AI"):
    docs = retrieve_context(query, k=5)
    return {
        "query": query,
        "retrieved_count": len(docs),
        "results": [
            {
                "source": d.metadata.get("source"),
                "chunk_index": d.metadata.get("chunk_index"),
                "excerpt": d.page_content[:200]
            }
            for d in docs
        ]
    }
