from langchain_openai import OpenAIEmbeddings
from app.core.config import settings

def get_embeddings():
    if not settings.openai_api_key:
        # Fallback to local or deterministic embedding if key is missing in development
        try:
            from langchain_community.embeddings import FakeEmbeddings
            return FakeEmbeddings(size=1536)
        except Exception:
            pass

    return OpenAIEmbeddings(
        model=settings.openai_embedding_model,
        api_key=settings.openai_api_key or "sk-dummy-key"
    )
