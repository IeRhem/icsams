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
| ML Pipeline | PyTorch 2.4, Ultralytics YOLOv8 8.3, OpenCV 4.10 |
| Database | PostgreSQL 16 + Prisma ORM 5.19 |
| Monorepo | Turborepo + pnpm workspaces |
| IoT Firmware | Arduino IDE 2.3 (ESP32) |
| Statistical Eval | scikit-learn 1.5, SciPy 1.14 |

---

## Repository Structure

```
icsams/
├── apps/
│   ├── web/                  # Next.js dashboard (Guard, Officer, CSO views)
│   └── api/                  # FastAPI backend (REST + WebSocket)
├── packages/
│   ├── database/             # Prisma schema + generated client
│   ├── types/                # Shared TypeScript types
│   ├── ui/                   # Shared React components
│   └── config/               # Shared tsconfig, tailwind, eslint configs
├── services/
│   └── ml/                   # Python ML pipeline (YOLOv8 + CNN-LSTM + AE)
├── firmware/                 # ESP32-CAM, PIR sensor, BLE beacon firmware
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) >= 20.x
- [pnpm](https://pnpm.io/) >= 9.x — `npm install -g pnpm`
- [Python](https://www.python.org/) >= 3.12
- [PostgreSQL](https://www.postgresql.org/) >= 16
- [Git](https://git-scm.com/)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lerhem/icsams.git
cd icsams
```

### 2. Install JavaScript dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example env files and fill in your values:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

See [Environment Variables](#environment-variables) below for what each value should be.

### 4. Set up the database

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to your PostgreSQL database
pnpm db:push
```

### 5. Set up the Python environment

```bash
cd services/ml
python -m venv venv
source venv/bin/activate      # Linux/macOS
# venv\Scripts\activate       # Windows

pip install -r requirements.txt
```

---

## Running the Project

### Development (all JS apps in parallel)

```bash
pnpm dev
```

This starts `apps/web` (Next.js) and any other JS apps concurrently via Turborepo.

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

### Individual apps

```bash
pnpm --filter @icsams/web dev      # Next.js dashboard only
pnpm --filter @icsams/api dev      # Not applicable — run uvicorn directly
```

---

## Environment Variables

### `apps/web/.env.local`

```env
# Database (used by Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/icsams"

# Auth
AUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:8000"
NEXT_PUBLIC_WS_URL="ws://localhost:8000/ws"
```

### `apps/api/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/icsams"
SECRET_KEY="your-jwt-secret-key"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=480

# ML service
ML_SERVICE_URL="http://localhost:8001"

# CORS
ALLOWED_ORIGINS="http://localhost:3000"
```

### `services/ml/.env`

```env
# Camera stream
CAMERA_STREAM_URL="http://192.168.x.x/stream"  # ESP32-CAM IP

# Model paths
YOLOV8_MODEL_PATH="models/yolov8n.pt"
CNN_LSTM_MODEL_PATH="models/cnn_lstm.pth"
AUTOENCODER_MODEL_PATH="models/autoencoder.pth"

# Risk thresholds
SUSPICIOUS_THRESHOLD=0.40
CRITICAL_THRESHOLD=0.70

# API
API_URL="http://localhost:8000"
```

---

## API Documentation

Once the FastAPI server is running, interactive API docs are available at:

- **Swagger UI** → http://localhost:8000/docs
- **ReDoc** → http://localhost:8000/redoc

---

## ML Pipeline Overview

The ICSIP (Integrated Campus Security Intelligence Pipeline) processes camera frames in four stages:

```
ESP32-CAM → YOLOv8 (detection) → CNN (features) → LSTM (temporal) → Risk Module
                                                  ↘ Autoencoder (anomaly score)
```

**Risk scoring formula:**

```
RS = 0.35 × P_c + 0.35 × A_n + 0.15 × w_time + 0.15 × w_loc

Normal     if RS < 0.40
Suspicious if 0.40 ≤ RS < 0.70
Critical   if RS ≥ 0.70
```

---

## Dashboard Roles

| Role | Access |
|---|---|
| **Security Guard** | Live camera feeds, real-time alerts, alert acknowledgement |
| **Investigation Officer** | Historical event queries, anomaly timelines, footage review, PDF reports |
| **Chief Security Officer** | All officer capabilities + user management, camera config, threshold tuning, analytics |

---

## Database Schema

Six primary tables: `users`, `locations`, `cameras`, `events`, `detections`, `alerts`.

Prisma schema is located at `packages/database/prisma/schema.prisma`.

```bash
# View schema
cat packages/database/prisma/schema.prisma

# Open Prisma Studio (GUI)
pnpm db:studio
```

---

## Firmware

ESP32 firmware is in the `firmware/` directory:

```
firmware/
├── esp32-cam/        # Camera streaming firmware (MJPEG over HTTP)
├── pir-sensor/       # PIR motion detection + WiFi event push
└── ble-beacon/       # BLE beacon broadcasting location ID
```

Flash using Arduino IDE 2.3. See `firmware/README.md` for wiring diagrams and upload instructions.

---

## Dataset

This project uses the **UCF-Crime Dataset** for training and evaluation.

- **Source:** [UCF Center for Research in Computer Vision](https://www.crcv.ucf.edu/research/real-world-anomaly-detection/)
- **Videos:** 1,900 (950 normal + 950 anomalous, 13 crime categories)
- **License:** Academic research use only

```bash
# After downloading, place videos in:
services/ml/data/ucf-crime/
├── Normal/
└── Anomaly/
    ├── Assault/
    ├── Fighting/
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

---

## Supervisor

Department of Computer Science  
Federal University Wukari, Taraba State

---

## License

This project is developed for academic research purposes only.  
All rights reserved © 2025 JOSEPH, Rhema Elyon.