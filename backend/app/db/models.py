from datetime import datetime, timezone
from sqlmodel import SQLModel, Field

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Document(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    filename: str
    category: str = "projects"
    status: str = "indexed"
    checksum: str
    chunk_count: int = 0
    created_at: datetime = Field(default_factory=utc_now)

class Conversation(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = "New conversation"
    created_at: datetime = Field(default_factory=utc_now)

class Message(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    conversation_id: int = Field(index=True)
    role: str
    content: str
    sources_json: str | None = None
    created_at: datetime = Field(default_factory=utc_now)

class IngestionJob(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    document_id: int
    filename: str
    status: str = "completed"
    error_message: str | None = None
    created_at: datetime = Field(default_factory=utc_now)
