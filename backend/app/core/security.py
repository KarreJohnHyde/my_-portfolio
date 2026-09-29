import secrets
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from app.core.config import settings

security = HTTPBasic()

def verify_admin(credentials: HTTPBasicCredentials = Security(security)):
    correct_username = secrets.compare_digest(credentials.username, settings.admin_username)
    correct_password = secrets.compare_digest(credentials.password, settings.admin_password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect admin credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username
