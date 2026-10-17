from typing import Optional
from fastapi import FastAPI, Query, WebSocket, WebSocketDisconnect, status
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers import auth, alerts, events, cameras, users
from core.database import Base, engine, SessionLocal
from core.security import decode_access_token
import models
from models import User
from ws.manager import manager


# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ICSAMS API",
    description="Intelligent Campus Security and Access Monitoring System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,    prefix="/auth",    tags=["Authentication"])
app.include_router(alerts.router,  prefix="/alerts",  tags=["Alerts"])
app.include_router(events.router,  prefix="/events",  tags=["Events"])
app.include_router(cameras.router, prefix="/cameras", tags=["Cameras"])
app.include_router(users.router,   prefix="/users",   tags=["Users"])

@app.get("/")
def root():
    return {"status": "ICSAMS API running"}

@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: Optional[str] = Query(None),
):
    token = token or websocket.query_params.get("token")
    if not token and websocket.headers.get("authorization"):
        auth_header = websocket.headers.get("authorization")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]

    payload = decode_access_token(token) if token else None
    if not payload:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    sub = payload.get("sub")
    if not sub:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    try:
        user_id = int(sub)
    except (ValueError, TypeError):
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.is_active:
            await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
            return
    finally:
        db.close()

    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive — client can send pings
            await websocket.receive_text()
    except WebSocketDisconnect:
        pass
    finally:
        manager.disconnect(websocket)