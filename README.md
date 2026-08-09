# PelliPatrika (పెళ్లిపత్రిక) — Digital Telugu Wedding Invitation Generator

**PelliPatrika** is a full-stack digital Telugu wedding invitation creator built for business owners to quickly craft, customize, preview, publish, duplicate, and manage digital Telugu wedding invitation websites for clients.

---

## Features

- **Admin-Only Authentication**: Secure password-hashed login system with JWT tokens.
- **Form-Based Invitation Creator**:
  - Bride & Groom details & photo uploads
  - Venue, Date, Time & Google Maps direct navigation button
  - Unlimited Wedding Events timeline (Pellikuthuru, Mehendi, Sangeet, Wedding, Reception)
  - Family & Relatives blessings section
  - Photo Gallery lightbox & uploader
  - Background Music player widget
- **Real-Time Live Preview**: Split-editor layout on desktop with real-time updates as you type, and tabbed responsive controls for mobile.
- **3 Distinct Premium Telugu Templates**:
  1. **Traditional Telugu**: Gold & Maroon ornamental aesthetic with sacred motifs.
  2. **Royal Temple**: Crimson & Antique Gold arch frames with mandap visual language.
  3. **Modern Floral**: Soft Cream & Rose floral theme, clean cards, bilingual friendly.
- **Instant Duplication Workflow**: Clone any existing invitation with all events, family, and gallery references under a newly generated unique slug (`rahul-priya-2`).
- **Live Published Editing**: Edit published invitations anytime — changes reflect immediately without changing the public URL.
- **Mobile-First Public Page (`/invite/[slug]`)**:
  - Live Countdown timer (Asia/Kolkata timezone support & completed state)
  - Direct Google Maps navigation
  - WhatsApp Share button with dynamic pre-filled Telugu text
  - Full Telugu Unicode text support with `Noto Sans Telugu` web font
  - Dynamic OpenGraph SEO preview tags

---

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI (Python 3.10+), SQLAlchemy 2.0, Pydantic v2, PyJWT, Passlib, Bcrypt.
- **Database**: PostgreSQL (with SQLite zero-config local fallback).
- **Storage**: Abstract Image Service supporting local static uploads (`/uploads`) and Cloudinary integration.

---

## Project Structure

```text
wedding invitation/
├── backend/
│   ├── app/
│   │   ├── api/          # REST API Endpoints (Auth, Invitations, Uploads)
│   │   ├── core/         # Security & App Configuration
│   │   ├── db/           # Session, Base, Seeding
│   │   ├── models/       # SQLAlchemy Entities (Admin, Invitation, Event, Family, Gallery)
│   │   ├── schemas/      # Pydantic Validation Schemas
│   │   ├── services/     # Image Upload & Invitation Business Logic
│   │   └── main.py       # FastAPI Entry Point
│   ├── .env.example
│   ├── .env
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (admin)/   # Admin Pages (Login, Dashboard, New, Edit)
│   │   │   ├── invite/    # Public Invitation Page (/invite/[slug])
│   │   │   ├── layout.tsx # Root Layout & Google Fonts
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── admin/     # Invitation Form, Live Preview, Editors
│   │   │   ├── public/    # Countdown, AudioPlayer, WhatsAppShare
│   │   │   └── templates/ # Traditional, Royal, Floral Templates
│   │   ├── lib/           # API Client & Utilities
│   │   └── types/         # TypeScript Interfaces
│   ├── .env.local
│   └── package.json
└── README.md
```

---

## How to Install & Run

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Run database seeding (creates default admin & sample invitation):
```bash
python -m app.db.seed
```

Start FastAPI server:
```bash
python -m uvicorn app.main:app --port 8000
```
*API will run on `http://127.0.0.1:8000` (Swagger docs available at `http://127.0.0.1:8000/docs`).*

### 3. Frontend Setup
In a new terminal, navigate to the `frontend` directory:
```bash
cd frontend
```

Install npm packages:
```bash
npm install
```

Build and start Next.js production server:
```bash
npm run build
npm run start
```
*Frontend will run on `http://localhost:3000`.*

---

## Default Admin Credentials

Upon initial database seeding, the default admin account is created automatically:

- **Email**: `admin@pellipatrika.com`
- **Password**: `admin123`

---

## Environment Variables

### Backend (`backend/.env`)
```ini
PROJECT_NAME="PelliPatrika API"
SECRET_KEY="pellipatrika-secret-key-change-in-production-2026-wedding"
DATABASE_URL="sqlite:///./pellipatrika.db"

# Optional Cloudinary Setup
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Frontend (`frontend/.env.local`)
```ini
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000/api/v1"
```

---

## Key Workflows

### How to Create an Invitation
1. Log into `/login`.
2. Click **Create Invitation** on the dashboard.
3. Fill in Couple Names, Photos, Date/Time, Venue, Events, Family, Gallery, and Music.
4. Select a template (Traditional / Royal / Floral) and observe the **Live Preview**.
5. Click **Save Draft** or **Publish Invitation**.

### How Public URLs Work
- Each published invitation is accessible at `/invite/[slug]` (e.g., `/invite/rahul-priya`).
- Slug uniqueness is automatically checked and suffix-incremented if duplicates exist (`rahul-priya-2`).
- Public URLs load without requiring login.

### How Duplication Works
- Click the **Duplicate** button next to any invitation in the Admin Dashboard table.
- All couple data, events, family details, and photo references are copied to a new DRAFT invitation with a newly generated slug.

---

## Troubleshooting

- **Image Upload Issues**: By default, uploaded images are saved locally in `backend/uploads/`. If using Cloudinary, ensure your API credentials are correct in `backend/.env`.
- **Database Connection**: If using PostgreSQL, set `DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"` in `backend/.env`. SQLite is used by default if `DATABASE_URL` is omitted.
