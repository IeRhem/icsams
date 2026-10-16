import logging
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from datetime import datetime
from typing import List, Optional
import anyio
from core.database import get_db
from core.security import require_service_key
from routers.auth import require_guard, require_officer, require_cso, get_current_user
from models import Alert, Event, Camera, Location, User, RiskLevel
from models.schemas import AlertCreate, AlertOut, AcknowledgeAlert
from ws.manager import manager

logger = logging.getLogger(__name__)

router = APIRouter()


# ── CREATE ALERT (called by ML pipeline) ───────────────────────
@router.post("/", response_model=AlertOut, status_code=201)
def create_alert(
    payload: AlertCreate,
    db: Session = Depends(get_db),
    _key: None = Depends(require_service_key),
):
    # Verify event exists
    event = db.query(Event).filter(Event.id == payload.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # Check alert doesn't already exist for this event
    existing = db.query(Alert).filter(Alert.event_id == payload.event_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Alert already exists for this event")

    alert = Alert(
        event_id=payload.event_id,
        risk_level=payload.risk_level,
        anomaly_score=payload.anomaly_score,
        cls_confidence=payload.cls_confidence,
        behaviour_class=payload.behaviour_class,
    )
    db.add(alert)

    # Increment location incident count for suspicious/critical
    if payload.risk_level in [RiskLevel.suspicious, RiskLevel.critical]:
        camera = db.query(Camera).filter(Camera.id == event.camera_id).first()
        if camera and camera.location:
            camera.location.incident_count = Location.incident_count + 1

    db.commit()
    db.refresh(alert)

    # Broadcast to all connected dashboard clients via WebSocket
    try:
        anyio.from_thread.run(manager.broadcast, {
            "type": "new_alert",
            "alert_id": alert.id,
            "risk_level": alert.risk_level.value,
            "behaviour_class": alert.behaviour_class,
            "anomaly_score": alert.anomaly_score,
            "camera_id": event.camera_id,
            "created_at": alert.created_at.isoformat(),
        })
    except Exception as e:
        logger.warning(f"Failed to broadcast new alert notification: {e}")

    return alert


# ── GET ACTIVE ALERTS (guard dashboard) ────────────────────────
@router.get("/active", response_model=List[AlertOut])
def get_active_alerts(
    db: Session = Depends(get_db),
    _: User = Depends(require_guard),
):
    return (
        db.query(Alert)
        .filter(Alert.acknowledged_at == None)
        .filter(Alert.risk_level.in_([RiskLevel.suspicious, RiskLevel.critical]))
        .order_by(desc(Alert.created_at))
        .options(joinedload(Alert.event))
        .all()
    )


# ── GET ALL ALERTS with filters (officer / cso) ────────────────
@router.get("/", response_model=List[AlertOut])
def get_alerts(
    risk_level: Optional[RiskLevel] = Query(None),
    camera_id: Optional[int] = Query(None),
    from_date: Optional[datetime] = Query(None),
    to_date: Optional[datetime] = Query(None),
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    _: User = Depends(require_officer),
):
    query = db.query(Alert).options(joinedload(Alert.event))

    if risk_level:
        query = query.filter(Alert.risk_level == risk_level)
    if camera_id:
        query = query.join(Event).filter(Event.camera_id == camera_id)
    if from_date:
        query = query.filter(Alert.created_at >= from_date)
    if to_date:
        query = query.filter(Alert.created_at <= to_date)

    return (
        query
        .order_by(desc(Alert.created_at))
        .offset(offset)
        .limit(limit)
        .all()
    )


# ── GET SINGLE ALERT ───────────────────────────────────────────
@router.get("/{alert_id}", response_model=AlertOut)
def get_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_guard),
):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert


# ── ACKNOWLEDGE ALERT (guard action) ───────────────────────────
@router.patch("/{alert_id}/acknowledge", response_model=AlertOut)
def acknowledge_alert(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_guard),
):
    alert = db.query(Alert).filter(Alert.id == alert_id).with_for_update().first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    if alert.acknowledged_at:
        raise HTTPException(status_code=400, detail="Alert already acknowledged")

    alert.acknowledged_at = datetime.utcnow()
    alert.acknowledged_by = current_user.id
    db.commit()
    db.refresh(alert)

    # Notify dashboard that alert was cleared
    try:
        anyio.from_thread.run(manager.broadcast, {
            "type": "alert_acknowledged",
            "alert_id": alert.id,
            "acknowledged_by": current_user.name,
            "acknowledged_at": alert.acknowledged_at.isoformat(),
        })
    except Exception as e:
        logger.warning(f"Failed to broadcast alert acknowledgement notification: {e}")

    return alert