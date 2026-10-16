from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from core.database import get_db
from core.security import verify_password, create_access_token, decode_access_token
from models import User
from models.schemas import LoginRequest, TokenResponse, UserOut

router = APIRouter()

oauth2_scheme = HTTPBearer(auto_error=False)


# ── LOGIN ──────────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(User).filter(User.email == payload.email).first()

    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    token = create_access_token(data={
        "sub": str(user.id),
        "role": user.role.value,
        "name": user.name,
    })

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        role=user.role,
    )


# ── GET CURRENT USER DEPENDENCY ────────────────────────────────
def get_current_user(
    token: Optional[HTTPAuthorizationCredentials] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token or not token.credentials:
        raise credentials_exception

    payload = decode_access_token(token.credentials)
    if payload is None:
        raise credentials_exception

    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    try:
        user_id_int = int(user_id)
    except (ValueError, TypeError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id_int).first()
    if user is None or not user.is_active:
        raise credentials_exception

    return user


# ── ROLE GUARDS ────────────────────────────────────────────────
def require_guard(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role.value not in ["guard", "officer", "cso"]:
        raise HTTPException(status_code=403, detail="Access denied")
    return current_user

def require_officer(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role.value not in ["officer", "cso"]:
        raise HTTPException(status_code=403, detail="Investigation Officer access required")
    return current_user

def require_cso(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role.value != "cso":
        raise HTTPException(status_code=403, detail="Chief Security Officer access required")
    return current_user


# ── ME ENDPOINT ────────────────────────────────────────────────
@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user