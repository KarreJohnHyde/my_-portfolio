from pathlib import Path
from langchain_chroma import Chroma
from app.core.config import settings
from app.rag.embeddings import get_embeddings

def get_vector_store():
    persist_path = Path(settings.chroma_dir)
    persist_path.mkdir(parents=True, exist_ok=True)
    return Chroma(
        collection_name="johnny_knowledge",
        embedding_function=get_embeddings(),
        persist_directory=str(persist_path)
    )

def index_documents(chunks, document_id: str):
    store = get_vector_store()
    for i, chunk in enumerate(chunks):
        chunk.metadata["document_id"] = str(document_id)
        chunk.metadata["chunk_index"] = i
    
    ids = [f"{document_id}-{i}" for i in range(len(chunks))]
    store.add_documents(documents=chunks, ids=ids)
    return len(chunks)

def delete_document_vectors(document_id: str):
    try:
        store = get_vector_store()
        # Chroma collection allows querying/deleting by metadata or ID prefix
        collection = store._collection
        existing = collection.get(where={"document_id": str(document_id)})
        if existing and existing.get("ids"):
            collection.delete(ids=existing["ids"])
            return len(existing["ids"])
    except Exception as e:
        print(f"Vector deletion warning: {e}")
    return 0
