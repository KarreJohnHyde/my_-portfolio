import json
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from sqlmodel import Session
from app.db.database import get_session
from app.db.models import Conversation, Message
from app.rag.chain import answer_question

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    conversation_id: Optional[int] = None
    chat_history: Optional[List[ChatMessage]] = None
    scenario_mode: Optional[str] = "all"  # "all", "greenfield", "high_constraint"

class SourceCitation(BaseModel):
    source: str
    page: Optional[int] = None
    chunk_index: Optional[int] = None
    excerpt: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceCitation]
    conversation_id: Optional[int] = None

@router.post("/", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest, session: Session = Depends(get_session)):
    try:
        # Load or create conversation
        conv_id = request.conversation_id
        if not conv_id:
            conv = Conversation(title=request.question[:40])
            session.add(conv)
            session.commit()
            session.refresh(conv)
            conv_id = conv.id

        history = [m.model_dump() for m in request.chat_history] if request.chat_history else []
        result = answer_question(request.question, chat_history=history)

        # Save to DB
        user_msg = Message(conversation_id=conv_id, role="user", content=request.question)
        ai_msg = Message(
            conversation_id=conv_id,
            role="assistant",
            content=result["answer"],
            sources_json=json.dumps(result["sources"])
        )
        session.add(user_msg)
        session.add(ai_msg)
        session.commit()

        return {
            "answer": result["answer"],
            "sources": result["sources"],
            "conversation_id": conv_id
        }
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(
            status_code=503,
            detail=f"The Johnny-Talks advisory engine encountered an error: {str(e)}"
        )

@router.get("/history/{conversation_id}")
def get_history(conversation_id: int, session: Session = Depends(get_session)):
    from sqlmodel import select
    statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
    messages = session.exec(statement).all()
    return messages
