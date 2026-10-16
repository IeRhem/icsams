from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from models import UserRole, RiskLevel, SensitivityLevel


# ── AUTH ───────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole


# ── USERS ──────────────────────────────────────────────────────
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── LOCATIONS ──────────────────────────────────────────────────
class LocationCreate(BaseModel):
    location_name: str
    sensitivity_level: SensitivityLevel = SensitivityLevel.medium
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class LocationOut(BaseModel):
    id: int
    location_name: str
    sensitivity_level: SensitivityLevel
    incident_count: int

    class Config:
        from_attributes = True


# ── CAMERAS ────────────────────────────────────────────────────
class CameraCreate(BaseModel):
    location_id: int
    camera_name: str
    ip_address: Optional[str] = None

class CameraOut(BaseModel):
    id: int
    camera_name: str
    ip_address: Optional[str]
    is_active: bool
    location: LocationOut

    class Config:
        from_attributes = True


# ── EVENTS ─────────────────────────────────────────────────────
class EventCreate(BaseModel):
    camera_id: int
    person_count: int
    frame_count: int
    raw_features: Optional[dict] = None

class EventOut(BaseModel):
    id: int
    camera_id: int
    event_time: datetime
    person_count: int
    processed: bool

    class Config:
        from_attributes = True


class DetectionOut(BaseModel):
    id: int
    frame_number: int
    bbox_x1: float
    bbox_y1: float
    bbox_x2: float
    bbox_y2: float
    object_class: str
    confidence: float

    class Config:
        from_attributes = True


class AlertSummaryOut(BaseModel):
    id: int
    risk_level: str
    anomaly_score: float
    cls_confidence: float
    behaviour_class: Optional[str]
    created_at: datetime
    acknowledged_at: Optional[datetime]

    class Config:
        from_attributes = True


class CameraSummaryOut(BaseModel):
    id: int
    camera_name: str
    ip_address: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True


class EventDetailOut(BaseModel):
    id: int
    camera_id: int
    event_time: datetime
    person_count: int
    frame_count: int
    raw_features: Optional[dict]
    processed: bool
    detections: List[DetectionOut] = []
    alert: Optional[AlertSummaryOut] = None
    camera: Optional[CameraSummaryOut] = None

    class Config:
        from_attributes = True


# ── ALERTS ─────────────────────────────────────────────────────
class AlertCreate(BaseModel):
    event_id: int
    risk_level: RiskLevel
    anomaly_score: float
    cls_confidence: float
    behaviour_class: Optional[str] = None

class AlertOut(BaseModel):
    id: int
    event_id: int
    risk_level: RiskLevel
    anomaly_score: float
    cls_confidence: float
    behaviour_class: Optional[str]
    created_at: datetime
    acknowledged_at: Optional[datetime]
    acknowledged_by: Optional[int]

    class Config:
        from_attributes = True

class AcknowledgeAlert(BaseModel):
    alert_id: int