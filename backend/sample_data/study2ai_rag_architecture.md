# Study2AI: Architecture, Grounding, and RAG Pipeline

## System Overview
Study2AI is a full-stack Retrieval-Augmented Generation (RAG) system engineered by Karre John Hyde. The core purpose is transforming unstructured educational PDFs and technical manuals into strictly grounded, context-aware interactive conversations without hallucinating facts.

## Engineering Stack
- Core Framework: Python 3.11+, LangChain Core, FAISS Vector Index.
- Chunking Strategy: RecursiveCharacterTextSplitter with chunk_size=600, chunk_overlap=120, using separators ["\n\n", "\n", " ", ""].
- Embeddings: OpenAI text-embedding-3-small (1536 dimensions) with cosine distance.
- Interface: Hugging Face Spaces + Gradio UI for fast low-latency user verification.

## Retrieval Strategy: MMR vs Similarity Search
In production, standard cosine similarity clustering frequently returns 5 near-duplicate passages from the same textbook section. To prevent redundant prompt injection, Study2AI implements Maximal Marginal Relevance (MMR) retrieval with `fetch_k=15`, `k=5`, and `lambda_mult=0.5`. This enforces high semantic diversity across retrieved tokens.

## Production Lessons & Failures
1. Chunk boundary truncation: Splitting code blocks or mathematical proofs across arbitrary character counts led to syntax loss. Resolution: Custom regex separators prioritizing markdown headers (`## `, `### `) and code fencing.
2. Cold Start Latency: FAISS index deserialization on serverless containers added 1.2s overhead. Resolution: Memory-mapped FAISS indices (`index.load_local()` with persistent local caching).
