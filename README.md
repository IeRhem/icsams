# ICSAMS — Intelligent Campus Security and Access Monitoring System

> Final Year Project · Federal University Wukari, Taraba State · 2024/2025
> **JOSEPH, Rhema Elyon** · CIS/CSC/22/071 · B.Sc. Computer Science (Software Engineering)

An end-to-end intelligent campus security platform that integrates IoT hardware, deep learning video analysis, and a role-based web dashboard to provide Nigerian university security teams with automated real-time monitoring and structured investigation support.

---

## What It Does

ICSAMS replaces reactive, paper-based campus security with a three-layer system:

- **IoT Layer** — ESP32-CAM cameras, PIR motion sensors, and ESP32 BLE beacons capture live campus data
- **ML Layer** — YOLOv8 detects persons and objects per frame; CNN-LSTM analyses behaviour over time; an autoencoder scores anomalies
- **Dashboard Layer** — A role-based Next.js web dashboard delivers real-time alerts to guards, historical queries to investigation officers, and system analytics to the chief security officer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Dashboard (Frontend) | Next.js 14.2, TypeScript 5.5, Tailwind CSS 3.4 |
| Backend API | FastAPI 0.115, Python 3.12 |
| Database ORM (API) | SQLAlchemy 2.x + psycopg2 |
| Database (Hosted) | Supabase (PostgreSQL 16) |
| ML Pipeline | PyTorch 2.4, Ultralytics YOLOv8 8.3, OpenCV 4.10 |
| Auth | JWT via python-jose + passlib (bcrypt) |
| Real-time | WebSocket (FastAPI native) |
| Monorepo | Turborepo + pnpm workspaces |
| IoT Firmware | Arduino IDE 2.3 (ESP32) |
| Statistical Eval | scikit-learn 1.5, SciPy 1.14 |

---

## Repository Structure

```
icsams/
├── apps/
│   ├── web/                        # Next.js 14.2 dashboard
│   │   ├── app/
│   │   │   ├── (auth)/auth/login/
│   │   │   └── (dashboard)/        # Dashboard pages (/alerts, /events, /camaras, etc.)
│   │   │       ├── alerts/
│   │   │       │   └── [alertsId]/
│   │   │       └── events/
│   │   │           └── [eventsId]/
│   │   └── .env.local
│   │
│   └── api/                        # FastAPI backend
│       ├── main.py                 # App entry point, table creation, routes
│       ├── requirements.txt
│       ├── .env
│       ├── core/
│       │   ├── config.py           # Pydantic settings from .env
│       │   ├── database.py         # SQLAlchemy engine, SessionLocal, Base
│       │   └── security.py         # JWT encode/decode, bcrypt hashing
│       ├── models/
│       │   ├── __init__.py         # SQLAlchemy table models + enums
│       │   └── schemas.py          # Pydantic request/response schemas
│       ├── routers/
│       │   ├── auth.py             # Login, get_current_user, role guards
│       │   ├── alerts.py           # Alert CRUD + WebSocket broadcast
│       │   ├── events.py           # Event logging + queries
│       │   ├── cameras.py          # Camera + location management
│       │   └── users.py            # User management (CSO only)
│       └── ws/
│           └── manager.py          # WebSocket ConnectionManager singleton
│
├── packages/
│   ├── types/                      # Shared TypeScript types (Alert, Event, User)
│   ├── ui/                         # Shared React components
│   └── config/                     # Shared tsconfig, tailwind, eslint
│
├── services/
│   └── ml/                         # Python ML pipeline (YOLOv8 + CNN-LSTM + AE)
│       ├── pipeline.py
│       ├── requirements.txt
│       └── models/                 # Trained model weights (.pt / .pth)
│
├── firmware/                       # ESP32-CAM, PIR sensor, BLE beacon firmware
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.x
- [pnpm](https://pnpm.io/) >= 9.x — `npm install -g pnpm`
- [Python](https://www.python.org/) >= 3.12
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) project (free tier works)

> No local PostgreSQL installation needed — Supabase is the hosted database.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IeRhem/icsams.git
cd icsams
```

### 2. Install JavaScript dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
cp services/ml/.env.example services/ml/.env
```

Fill in your values — see [Environment Variables](#environment-variables) below.

### 4. Set up the FastAPI Python environment

```bash
cd apps/api
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

pip install -r requirements.txt
cd ../..
```

### 5. Set up the ML Python environment

```bash
cd services/ml
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

pip install -r requirements.txt
cd ../..
```

### 6. Create database tables

Tables are created automatically by SQLAlchemy when the FastAPI server starts for the first time:

```bash
cd apps/api
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate         # Windows

uvicorn main:app --reload --port 8000
```

Check your Supabase dashboard → **Table Editor** — all six tables will appear: `users`, `locations`, `cameras`, `events`, `detections`, `alerts`.

### 7. Seed the first CSO user

Add the seed function to `main.py` temporarily (see Getting Started guide), start the server once, then remove it. Provide an operator-supplied email address and a unique, randomly generated password:

```
Email:    <operator-email>
Password: <unique-randomly-generated-password>
Role:     cso
```

---

## Running the Project

### Next.js dashboard

```bash
pnpm dev
```

### FastAPI backend (separate terminal)

```bash
cd apps/api
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### ML pipeline (separate terminal)

```bash
cd services/ml
source venv/bin/activate
python pipeline.py
```

---

## Environment Variables

### `apps/web/.env.local`

```env
# API
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_WS_URL="ws://localhost:8000/ws"

# Auth (Next.js side — for session cookies)
AUTH_SECRET="your-nextjs-auth-secret"
AUTH_URL="http://localhost:3000"
```

### `apps/api/.env`

```env
# Supabase PostgreSQL — get this from:
# Supabase Dashboard → Project Settings → Database → Connection string → Session mode
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# JWT
SECRET_KEY="your-long-random-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=480

# Service API Key (required for service-to-service calls)
SERVICE_API_KEY="your-service-api-key"

# CORS — Next.js dev URL
ALLOWED_ORIGINS=["http://localhost:3000"]

# ML service
ML_SERVICE_URL="http://localhost:8001"
```

> **Important:** Use Supabase Session mode (port 5432), not Transaction mode (port 6543). Transaction mode breaks SQLAlchemy prepared statements.
>
> Callers of the event (`POST /events/`) and alert (`POST /alerts/`) routes must provide the configured `SERVICE_API_KEY` value in the `X-Service-Key` header.

### `services/ml/.env`

```env
# ESP32-CAM stream URL (find via Arduino Serial Monitor after flashing)
CAMERA_STREAM_URL="http://192.168.x.x/stream"

# Trained model weights
YOLOV8_MODEL_PATH="models/yolov8n.pt"
CNN_LSTM_MODEL_PATH="models/cnn_lstm.pth"
AUTOENCODER_MODEL_PATH="models/autoencoder.pth"

# Risk thresholds
SUSPICIOUS_THRESHOLD=0.40
CRITICAL_THRESHOLD=0.70

# FastAPI URL (for posting events and alerts)
API_URL="http://localhost:8000"
```

---

## API Reference

Swagger UI: `http://localhost:8000/docs`
ReDoc: `http://localhost:8000/redoc`

### Auth

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Returns JWT token + role |
| GET | `/auth/me` | All roles | Returns current user profile |
| PATCH | `/auth/me` | All roles | Update current user profile |

### Users

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/users/` | CSO | Create a new user account |
| GET | `/users/` | CSO | List all users |
| PATCH | `/users/{id}/deactivate` | CSO | Deactivate a user account |

### Alerts

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/alerts/` | ML Pipeline | Create alert + broadcast via WebSocket |
| GET | `/alerts/active` | Guard+ | Unacknowledged suspicious/critical alerts |
| GET | `/alerts/` | Officer+ | All alerts with filters (date, camera, risk level) |
| GET | `/alerts/{id}` | Guard+ | Single alert detail |
| PATCH | `/alerts/{id}/acknowledge` | Guard+ | Acknowledge + clear from active panel |

### Events

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/events/` | ML Pipeline | Log a detection event |
| GET | `/events/` | Officer+ | Query events with filters |
| GET | `/events/{id}` | Officer+ | Single event with detections + alert |
| PATCH | `/events/{id}/processed` | Officer+ | Mark event as reviewed |

### Cameras & Locations

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/cameras/locations` | CSO | Register a new campus location |
| GET | `/cameras/locations` | Guard+ | List all locations |
| POST | `/cameras/` | CSO | Register a new camera |
| GET | `/cameras/` | Guard+ | List active cameras |
| PATCH | `/cameras/{id}/deactivate` | CSO | Deactivate a camera |

### WebSocket

| Route | Description |
|---|---|
| `WS /ws` | Real-time alert stream for dashboard clients |

**WebSocket message types:**

```json
// New alert generated
{ "type": "new_alert", "alert_id": 1, "risk_level": "critical", "behaviour_class": "Fighting", "anomaly_score": 0.87, "camera_id": 2, "created_at": "..." }

// Alert acknowledged by guard
{ "type": "alert_acknowledged", "alert_id": 1, "acknowledged_by": "Guard Name", "acknowledged_at": "..." }
```

---

## Database Schema

Six tables managed by SQLAlchemy. Tables are auto-created on first server start.

```
users         → id, name, email, password_hash, role, created_at, is_active
locations     → id, location_name, sensitivity_level, incident_count, latitude, longitude
cameras       → id, location_id (FK), camera_name, ip_address, is_active, installed_at
events        → id, camera_id (FK), event_time, frame_count, person_count, raw_features, processed
detections    → id, event_id (FK), frame_number, bbox_x1, bbox_y1, bbox_x2, bbox_y2, object_class, confidence
alerts        → id, event_id (FK), acknowledged_by (FK), risk_level, anomaly_score, cls_confidence, behaviour_class, created_at, acknowledged_at
```

**Enums:**
- `UserRole` → `guard` | `officer` | `cso`
- `SensitivityLevel` → `low` | `medium` | `high`
- `RiskLevel` → `normal` | `suspicious` | `critical`

---

## Role-Based Access Control

Three roles with hierarchical access. Enforced at the FastAPI route level via `Depends()`.

| Role | Capabilities |
|---|---|
| **guard** | Live alerts, acknowledge alerts, view cameras and locations |
| **officer** | Everything guard can + query events, footage review, export PDF reports |
| **cso** | Everything officer can + user management, camera registration, alert threshold config, analytics |

Route protection example:

```python
# Guard and above
@router.get("/active", dependencies=[Depends(require_guard)])

# Officer and above
@router.get("/", dependencies=[Depends(require_officer)])

# CSO only
@router.post("/", dependencies=[Depends(require_cso)])
```

---

## ML Pipeline Overview

The ICSIP (Integrated Campus Security Intelligence Pipeline) processes camera frames in four stages:

```
ESP32-CAM → YOLOv8 (detection) → CNN (features) → LSTM (temporal) → Risk Module
                                                  ↘ Autoencoder (anomaly score)
```

**Risk scoring formula:**

```
RS = 0.35 × P_c  +  0.35 × A_n  +  0.15 × w_time  +  0.15 × w_loc

Normal      if RS < 0.40
Suspicious  if 0.40 ≤ RS < 0.70
Critical    if RS ≥ 0.70
```

The ML pipeline posts to `/events/` and `/alerts/` via HTTP after processing each frame sequence.

---

## Dashboard Pages

```
/auth/login                     # Public — JWT auth

/                               # Dashboard overview
/alerts                         # Alert list
/alerts/[alertsId]              # Alert detail + acknowledge button
/camaras                        # Live cameras + camera management
/events                         # Event query (date, location, risk filter)
/events/[eventsId]              # Event detail + detection overlays
/footage                        # Camera footage review
/analytics                      # System-wide incident analytics
/anomaly-report                 # Anomaly score trends per location
/thresholds                     # Alert threshold + weight configuration
/reports                        # PDF report export & delivery schedules
/settings                       # Profile + account settings
```

---

## Firmware

```
firmware/
├── esp32-cam/        # MJPEG stream over HTTP (OV2640)
├── pir-sensor/       # PIR motion detection + HTTP event push to API
└── ble-beacon/       # BLE advertisement with unique location UUID
```

Flash using Arduino IDE 2.3. Board: `AI Thinker ESP32-CAM`. See `firmware/README.md` for pin wiring and upload steps.

---

## Dataset

**UCF-Crime Dataset** — primary benchmark for training and evaluation.

- **Source:** [UCF CRCV](https://www.crcv.ucf.edu/research/real-world-anomaly-detection/)
- **Videos:** 1,900 (950 normal + 950 anomalous, 13 crime categories)
- **Split:** 70% train · 15% validation · 15% test
- **License:** Academic research use only

```bash
services/ml/data/ucf-crime/
├── Normal/
└── Anomaly/
    ├── Assault/
    ├── Fighting/
    ├── Robbery/
    └── ...
```

---

## Project Status

| Chapter | Status |
|---|---|
| Chapter 1 — Introduction | ✅ Complete |
| Chapter 2 — Literature Review | ✅ Complete (40 papers) |
| Chapter 3 — Research Methodology | ✅ Complete |
| Chapter 4 — System Design & Implementation | 🔄 In Progress |
| Chapter 5 — Summary, Conclusion & Recommendation | ⏳ Pending |

| Component | Status |
|---|---|
| FastAPI backend (auth, alerts, events, cameras, users) | ✅ Complete |
| WebSocket real-time alert broadcasting | ✅ Complete |
| SQLAlchemy models + Supabase connection | ✅ Complete |
| Next.js dashboard (frontend) | 🔄 In Progress |
| ML pipeline (YOLOv8 + CNN-LSTM + AE) | ⏳ Pending |
| ESP32 firmware | ⏳ Pending |

---

## Supervisor

Department of Computer Science
Federal University Wukari, Taraba State

---

## License

This project is developed for academic research purposes only.
All rights reserved © 2025 JOSEPH, Rhema Elyon.