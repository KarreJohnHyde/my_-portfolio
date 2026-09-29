from pathlib import Path
from typing import List
from langchain_core.documents import Document
from app.ingestion.indexing import get_vector_store

_CACHED_FALLBACK_DOCS: List[Document] = []

def _load_fallback_docs() -> List[Document]:
    global _CACHED_FALLBACK_DOCS
    if _CACHED_FALLBACK_DOCS:
        return _CACHED_FALLBACK_DOCS
    docs = []
    # Search sample_data directory
    sample_dir = Path(__file__).resolve().parent.parent.parent / "sample_data"
    if sample_dir.exists():
        for file in sample_dir.glob("*.md"):
            try:
                content = file.read_text(encoding="utf-8")
                sections = content.split("## ")
                for i, sec in enumerate(sections):
                    if not sec.strip():
                        continue
                    text = ("## " + sec) if i > 0 else sec
                    docs.append(Document(
                        page_content=text.strip(),
                        metadata={"source": file.name, "chunk_index": i}
                    ))
            except Exception:
                pass
    _CACHED_FALLBACK_DOCS = docs
    return docs

def retrieve_context(question: str, k: int = 5) -> List[Document]:
    try:
        store = get_vector_store()
        if store:
            retriever = store.as_retriever(
                search_type="mmr",
                search_kwargs={
                    "k": k,
                    "fetch_k": 15,
                    "lambda_mult": 0.5
                }
            )
            res = retriever.invoke(question)
            if res:
                return res
    except Exception as e:
        print(f"Vector search notice: {e}")

    # Fallback to keyword matching on sample docs
    fallback_docs = _load_fallback_docs()
    if not fallback_docs:
        return []

    q_terms = [t.lower() for t in question.split() if len(t) > 2]
    scored = []
    for d in fallback_docs:
        score = sum(d.page_content.lower().count(t) for t in q_terms)
        if score > 0:
            scored.append((score, d))
    scored.sort(key=lambda x: x[0], reverse=True)
    return [doc for _, doc in scored[:k]] or fallback_docs[:k]
