import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["application"] == "Johnny-Talks"

def test_chat_endpoint_valid():
    response = client.post("/chat/", json={"question": "What is Study2AI?"})
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "sources" in data
    assert isinstance(data["sources"], list)

def test_chat_endpoint_empty():
    response = client.post("/chat/", json={"question": ""})
    assert response.status_code == 422  # validation error
