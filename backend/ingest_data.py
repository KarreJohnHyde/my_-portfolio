import os
from pathlib import Path
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

# Load environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
DATA_DIR = Path("./sample_data")
CHROMA_DIR = Path("./data/chroma")

def ingest_all():
    print(f"Loading raw documents from {DATA_DIR.resolve()}...")
    if not DATA_DIR.exists():
        print(f"Error: {DATA_DIR} does not exist.")
        return

    loader = DirectoryLoader(
        path=str(DATA_DIR),
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"}
    )
    raw_documents = loader.load()
    print(f"Loaded {len(raw_documents)} raw document files.")

    # 2. Chunk data with semantic overlap to retain contextual continuity
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=120,
        separators=["\n\n", "\n", " ", ""]
    )
    chunks = text_splitter.split_documents(raw_documents)
    print(f"Generated {len(chunks)} contextual chunks.")

    # Assign source metadata
    for i, chunk in enumerate(chunks):
        chunk.metadata["chunk_index"] = i
        if "source" in chunk.metadata:
            chunk.metadata["source"] = Path(chunk.metadata["source"]).name

    # 3. Embed and store persistently in ChromaDB
    CHROMA_DIR.mkdir(parents=True, exist_ok=True)
    
    if OPENAI_API_KEY and OPENAI_API_KEY != "your-openai-api-key-here":
        embeddings = OpenAIEmbeddings(model="text-embedding-3-small", api_key=OPENAI_API_KEY)
    else:
        print("Note: OPENAI_API_KEY not configured. Using local FakeEmbeddings for dry run.")
        from langchain_community.embeddings import FakeEmbeddings
        embeddings = FakeEmbeddings(size=1536)

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name="johnny_knowledge",
        persist_directory=str(CHROMA_DIR)
    )
    print(f"Successfully indexed {len(chunks)} chunks into Johnny-Talks ChromaDB memory at {CHROMA_DIR.resolve()}.")

if __name__ == "__main__":
    ingest_all()
