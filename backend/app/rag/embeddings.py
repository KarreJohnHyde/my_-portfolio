from app.core.config import settings

def get_embeddings():
    if not settings.openai_api_key or settings.openai_api_key == "your-openai-api-key-here":
        try:
            from langchain_community.embeddings import FakeEmbeddings
            return FakeEmbeddings(size=1536)
        except Exception:
            class DeterministicEmbeddings:
                def embed_documents(self, texts):
                    return [[0.0] * 1536 for _ in texts]
                def embed_query(self, text):
                    return [0.0] * 1536
            return DeterministicEmbeddings()

    try:
        from langchain_openai import OpenAIEmbeddings
        return OpenAIEmbeddings(
            model=settings.openai_embedding_model,
            api_key=settings.openai_api_key
        )
    except Exception:
        try:
            from langchain_community.embeddings import FakeEmbeddings
            return FakeEmbeddings(size=1536)
        except Exception:
            class DeterministicEmbeddings:
                def embed_documents(self, texts):
                    return [[0.0] * 1536 for _ in texts]
                def embed_query(self, text):
                    return [0.0] * 1536
            return DeterministicEmbeddings()
