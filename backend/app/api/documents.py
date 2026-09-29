import hashlib
from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlmodel import Session, select
from app.db.database import get_session
from app.db.models import Document, IngestionJob
from app.ingestion.loaders import load_document
from app.ingestion.chunking import split_documents
from app.ingestion.indexing import index_documents, delete_document_vectors

router = APIRouter(prefix="/documents", tags=["Documents"])

from app.core.config import is_vercel

UPLOAD_DIR = Path("/tmp/uploads" if is_vercel else "data/uploads")
try:
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
except Exception:
    pass
ALLOWED = {".pdf", ".txt", ".md", ".docx"}
MAX_BYTES = 10 * 1024 * 1024

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    category: str = "projects",
    session: Session = Depends(get_session)
):
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in ALLOWED:
        raise HTTPException(415, f"Unsupported file type: {suffix}. Allowed: {ALLOWED}")

    data = await file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(413, "File too large. Max 10MB allowed.")
    if not data:
        raise HTTPException(400, "Empty file uploaded.")

    checksum = hashlib.sha256(data).hexdigest()
    stored_name = f"{uuid4().hex}{suffix}"
    destination = UPLOAD_DIR / stored_name
    destination.write_bytes(data)

    # Ingest into vector store
    chunk_count = 0
    status_str = "indexed"
    err_msg = None
    try:
        raw_docs = load_document(str(destination))
        for d in raw_docs:
            d.metadata["original_filename"] = file.filename
            d.metadata["category"] = category
        chunks = split_documents(raw_docs)
        doc_record = Document(
            filename=file.filename or "unknown",
            category=category,
            status="indexing",
            checksum=checksum,
            chunk_count=len(chunks)
        )
        session.add(doc_record)
        session.commit()
        session.refresh(doc_record)

        chunk_count = index_documents(chunks, document_id=str(doc_record.id))
        doc_record.status = "indexed"
        session.commit()
    except Exception as e:
        status_str = "failed"
        err_msg = str(e)
        if 'doc_record' in locals():
            doc_record.status = "failed"
            session.commit()

    # Log ingestion job
    job = IngestionJob(
        document_id=doc_record.id if 'doc_record' in locals() else 0,
        filename=file.filename or "file",
        status=status_str,
        error_message=err_msg
    )
    session.add(job)
    session.commit()

    return {
        "id": doc_record.id if 'doc_record' in locals() else None,
        "filename": file.filename,
        "category": category,
        "chunks_indexed": chunk_count,
        "status": status_str,
        "error": err_msg
    }

@router.get("/")
def list_documents(session: Session = Depends(get_session)):
    docs = session.exec(select(Document).order_by(Document.created_at.desc())).all()
    return docs

@router.get("/{document_id}")
def get_document(document_id: int, session: Session = Depends(get_session)):
    doc = session.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "Document not found")
    return doc

@router.delete("/{document_id}")
def delete_document(document_id: int, session: Session = Depends(get_session)):
    doc = session.get(Document, document_id)
    if not doc:
        raise HTTPException(404, "Document not found")
    delete_document_vectors(str(document_id))
    session.delete(doc)
    session.commit()
    return {"message": f"Document {document_id} and corresponding vector embeddings deleted"}
