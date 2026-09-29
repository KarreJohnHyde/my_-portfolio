from typing import List
from langchain_core.documents import Document
from app.ingestion.indexing import get_vector_store

def retrieve_context(question: str, k: int = 5) -> List[Document]:
    try:
        store = get_vector_store()
        retriever = store.as_retriever(
            search_type="mmr",
            search_kwargs={
                "k": k,
                "fetch_k": 15,
                "lambda_mult": 0.5
            }
        )
        return retriever.invoke(question)
    except Exception as e:
        print(f"Error retrieving context: {e}")
        return []
