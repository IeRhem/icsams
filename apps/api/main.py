from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers import auth, alerts, events, cameras, users
from core.database import Base, engine, SessionLocal
from core.security import hash_password
from models import User, Location, Camera, Event, Detection, Alert, UserRole
from fastapi import WebSocket, WebSocketDisconnect
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
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive — client can send pings
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)