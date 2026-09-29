from pathlib import Path
from sqlmodel import SQLModel, Session, create_engine
from app.core.config import settings

# Ensure sqlite directory exists if local file path
if settings.database_url.startswith("sqlite:///"):
    db_file_path = settings.database_url.replace("sqlite:///", "")
    if db_file_path and db_file_path != ":memory:":
        try:
            Path(db_file_path).parent.mkdir(parents=True, exist_ok=True)
        except Exception:
            pass

connect_args = (
    {"check_same_thread": False}
    if settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(
    settings.database_url,
    connect_args=connect_args,
    echo=False
)

def create_db():
    try:
        SQLModel.metadata.create_all(engine)
    except Exception as e:
        print(f"Warning initializing database tables: {e}")

def get_session():
    with Session(engine) as session:
        yield session
