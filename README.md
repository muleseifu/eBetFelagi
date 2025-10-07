# 🏡 eBetFelagi — Residency & Booking Demo App

A sleek full-stack **booking and residency platform** that blends modern web tech, smooth authentication, and clean architecture — built as a showcase project.

> 💻 **Stack:** React + Vite frontend | Express + Prisma + MongoDB backend | Auth0 authentication | Docker for dev  
> 🚀 **Goal:** Demonstrate a production-style architecture with secure auth, protected APIs, connected database, and ready-to-seed listings.

---

## ✨ Key Features

- 🔐 **Auth0 authentication** — Seamless login/logout via SPA flow.
- 🧱 **Protected API routes** — Auth0 token verification middleware.
- 🧍 **User features** — Registration, bookings, and favorites.
- 🏘️ **Residency listings** — Sample data + database persistence.
- ⚙️ **Database layer** — Prisma ORM with MongoDB (replica set for transactions).
- 🐳 **Docker support** — Local MongoDB replica set with one command.

---

## 🧩 Tech Stack

### 🖥️ Frontend
- ⚛️ React (Vite)
- 🎨 Mantine (UI)
- 🌍 react-router-dom
- 🔗 axios
- 🗺️ Leaflet (maps)
- 🔑 Auth0 React SDK

### 🧠 Backend
- 🟩 Node.js + Express
- 📦 Prisma ORM (`@prisma/client`)
- 🍃 MongoDB (via Prisma)
- 🧾 express-oauth2-jwt-bearer
- 🧰 cookie-parser, cors, dotenv, express-async-handler
- 🌀 nodemon (dev mode)

### 🧱 Dev / Infra
- 🐳 Docker (local MongoDB replica set)
- 🧭 MongoDB Compass (GUI)
- 📦 Yarn / npm
- 🧰 Prisma CLI (`npx prisma`)

---
## 📁 Repository Layout

```text
eBetFelagi/
├── client/                 → React + Vite app
├── server/                 → Express API + Prisma + fixtures
│   └── data/
│       └── Residency.json  → sample residency listings
└── README.md



---

## ⚙️ Prerequisites

- Node.js (v16+ recommended)
- Yarn or npm
- Docker Desktop *(for MongoDB replica set)* **OR** local `mongod --replSet rs0`
- MongoDB Compass *(optional)*
- Auth0 tenant (Application + API setup)

---

## 🔑 Environment Variables

### `server/.env`
```env
PORT=8000
DATABASE_URL="mongodb://127.0.0.1:27017/eBetFelagi?replicaSet=rs0"
AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.auth0.com
AUTH0_AUDIENCE=http://localhost:8000
AUTH0_JWKS_URI=...

VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
VITE_AUTH0_AUDIENCE=http://localhost:8000
VITE_API_BASE_URL=http://localhost:8000
