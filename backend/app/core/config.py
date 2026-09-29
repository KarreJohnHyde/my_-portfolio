import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Johnny-Talks"
    app_env: str = "development"
    api_host: str = "127.0.0.1"
    api_port: int = 8000
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    openai_chat_model: str = "gpt-4o-mini"
    openai_embedding_model: str = "text-embedding-3-small"
    database_url: str = "sqlite:///./data/johnny.db"
    chroma_dir: str = "./data/chroma"
    allowed_origins: str = "http://localhost:5173,http://localhost:8443,http://127.0.0.1:5173,https://my-portfolio-beige-eta-a97xqb58zd.vercel.app"
    admin_username: str = "admin"
    admin_password: str = "admin123"

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )

settings = Settings()
