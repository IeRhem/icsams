from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from core.database import get_db
from routers.auth import require_guard, require_cso
from models import Camera, Location, User
from models.schemas import CameraCreate, CameraOut, LocationCreate, LocationOut

router = APIRouter()


# ── LOCATIONS ──────────────────────────────────────────────────
@router.post("/locations", response_model=LocationOut, status_code=201)
def create_location(
    payload: LocationCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_cso),
):
    location = Location(**payload.model_dump())
    db.add(location)
    db.commit()
    db.refresh(location)
    return location


@router.get("/locations", response_model=List[LocationOut])
def list_locations(
    db: Session = Depends(get_db),
    _: User = Depends(require_guard),
):
    return db.query(Location).all()


# ── CAMERAS ────────────────────────────────────────────────────
@router.post("/", response_model=CameraOut, status_code=201)
def register_camera(
    payload: CameraCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_cso),
):
    location = db.query(Location).filter(Location.id == payload.location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    camera = Camera(**payload.model_dump())
    db.add(camera)
    db.commit()
    db.refresh(camera)
    return camera


@router.get("/", response_model=List[CameraOut])
def list_cameras(
    db: Session = Depends(get_db),
    _: User = Depends(require_guard),
):
    return (
        db.query(Camera)
        .options(joinedload(Camera.location))
        .filter(Camera.is_active == True)
        .all()
    )


@router.patch("/{camera_id}/deactivate", response_model=CameraOut)
def deactivate_camera(
    camera_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(require_cso),
):
    camera = db.query(Camera).filter(Camera.id == camera_id).first()
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")

    camera.is_active = False
    db.commit()
    db.refresh(camera)
    return camera