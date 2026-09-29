from pathlib import Path
from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader,
)

def load_document(path: str):
    file_path = Path(path)
    suffix = file_path.suffix.lower()

    if suffix == ".pdf":
        loader = PyPDFLoader(str(file_path))
    elif suffix in {".txt", ".md"}:
        loader = TextLoader(str(file_path), encoding="utf-8")
    elif suffix == ".docx":
        loader = Docx2txtLoader(str(file_path))
    else:
        raise ValueError(f"Unsupported document type: {suffix}")

    documents = loader.load()
    for document in documents:
        document.metadata["source"] = file_path.name
        document.metadata["file_type"] = suffix.lstrip(".")
    return documents
