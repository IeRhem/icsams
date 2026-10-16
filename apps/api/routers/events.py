from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from datetime import datetime
from typing import List, Optional
from core.database import get_db
from core.security import require_service_key
from routers.auth import require_officer
from models import Event, Detection, Camera, User
from models.schemas import EventOut, EventDetailOut

router = APIRouter()


# ── LOG EVENT (called by ML pipeline) ──────────────────────────
@router.post("/", response_model=EventOut, status_code=201)
def log_event(
    camera_id: int,
    person_count: int,
    frame_count: int,
    raw_features: Optional[dict] = None,
    db: Session = Depends(get_db),
    _key: None = Depends(require_service_key),
):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")

    event = Event(
        camera_id=camera_id,
        person_count=person_count,
        frame_count=frame_count,
        raw_features=raw_features,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


# ── QUERY EVENTS (officer / cso) ───────────────────────────────
@router.get("/", response_model=List[EventOut])
def get_events(
    camera_id: Optional[int] = Query(None),
    from_date: Optional[datetime] = Query(None),
    to_date: Optional[datetime] = Query(None),
    processed: Optional[bool] = Query(None),
    limit: int = Query(50, le=500),
    offset: int = Query(0),
    db: Session = Depends(get_db),
    _: User = Depends(require_officer),
):
    query = db.query(Event)

    if camera_id:
        query = query.filter(Event.camera_id == camera_id)
    if from_date:
        query = query.filter(Event.event_time >= from_date)
    if to_date:
        query = query.filter(Event.event_time <= to_date)
    if processed is not None:
        query = query.filter(Event.processed == processed)

    return (
        query
        .order_by(desc(Event.event_time))
        .offset(offset)
        .limit(limit)
        .all()
    )


# ── GET SINGLE EVENT WITH DETECTIONS ───────────────────────────
@router.get("/{event_id}", response_model=EventDetailOut)
def get_event(
    event_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_officer),
):
    event = (
        db.query(Event)
        .options(
            joinedload(Event.detections),
            joinedload(Event.alert),
            joinedload(Event.camera),
        )
        .filter(Event.id == event_id)
        .first()
    )
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


# ── MARK EVENT AS PROCESSED ────────────────────────────────────
@router.patch("/{event_id}/processed", response_model=EventOut)
def mark_processed(
    event_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_officer),
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    event.processed = True
    db.commit()
    db.refresh(event)
    return event