import enum
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean,
    DateTime, Enum, ForeignKey, Text, JSON
)
from sqlalchemy.orm import relationship
from core.database import Base


# ── ENUMS ──────────────────────────────────────────────────────
class UserRole(str, enum.Enum):
    guard   = "guard"
    officer = "officer"
    cso     = "cso"

class SensitivityLevel(str, enum.Enum):
    low    = "low"
    medium = "medium"
    high   = "high"

class RiskLevel(str, enum.Enum):
    normal     = "normal"
    suspicious = "suspicious"
    critical   = "critical"


# ── MODELS ─────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    name          = Column(String(100), nullable=False)
    email         = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role          = Column(Enum(UserRole), nullable=False)
    created_at    = Column(DateTime, default=datetime.utcnow)
    is_active     = Column(Boolean, default=True)

    acknowledged_alerts = relationship("Alert", back_populates="acknowledged_by_user")


class Location(Base):
    __tablename__ = "locations"

    id                = Column(Integer, primary_key=True, index=True)
    location_name     = Column(String(150), nullable=False)
    sensitivity_level = Column(Enum(SensitivityLevel), default=SensitivityLevel.medium)
    incident_count    = Column(Integer, default=0)
    latitude          = Column(Float, nullable=True)
    longitude         = Column(Float, nullable=True)

    cameras = relationship("Camera", back_populates="location")


class Camera(Base):
    __tablename__ = "cameras"

    id           = Column(Integer, primary_key=True, index=True)
    location_id  = Column(Integer, ForeignKey("locations.id"), nullable=False)
    camera_name  = Column(String(100), nullable=False)
    ip_address   = Column(String(50), nullable=True)
    is_active    = Column(Boolean, default=True)
    installed_at = Column(DateTime, default=datetime.utcnow)

    location = relationship("Location", back_populates="cameras")
    events   = relationship("Event", back_populates="camera")


class Event(Base):
    __tablename__ = "events"

    id           = Column(Integer, primary_key=True, index=True)
    camera_id    = Column(Integer, ForeignKey("cameras.id"), nullable=False)
    event_time   = Column(DateTime, default=datetime.utcnow, index=True)
    frame_count  = Column(Integer, default=0)
    person_count = Column(Integer, default=0)
    raw_features = Column(JSON, nullable=True)
    processed    = Column(Boolean, default=False)

    camera     = relationship("Camera", back_populates="events")
    detections = relationship("Detection", back_populates="event")
    alert      = relationship("Alert", back_populates="event", uselist=False)


class Detection(Base):
    __tablename__ = "detections"

    id           = Column(Integer, primary_key=True, index=True)
    event_id     = Column(Integer, ForeignKey("events.id"), nullable=False)
    frame_number = Column(Integer, nullable=False)
    bbox_x1      = Column(Float, nullable=False)
    bbox_y1      = Column(Float, nullable=False)
    bbox_x2      = Column(Float, nullable=False)
    bbox_y2      = Column(Float, nullable=False)
    object_class = Column(String(80), nullable=False)
    confidence   = Column(Float, nullable=False)

    event = relationship("Event", back_populates="detections")


class Alert(Base):
    __tablename__ = "alerts"

    id               = Column(Integer, primary_key=True, index=True)
    event_id         = Column(Integer, ForeignKey("events.id"), nullable=False)
    acknowledged_by  = Column(Integer, ForeignKey("users.id"), nullable=True)
    risk_level       = Column(Enum(RiskLevel), nullable=False, index=True)
    anomaly_score    = Column(Float, nullable=False)
    cls_confidence   = Column(Float, nullable=False)
    behaviour_class  = Column(String(100), nullable=True)
    created_at       = Column(DateTime, default=datetime.utcnow, index=True)
    acknowledged_at  = Column(DateTime, nullable=True)

    event                = relationship("Event", back_populates="alert")
    acknowledged_by_user = relationship("User", back_populates="acknowledged_alerts")