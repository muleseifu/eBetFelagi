# eBetFelagi

Short description
A small full‑stack booking/residency demo app (React + Vite frontend, Express + Prisma + MongoDB backend) with Auth0 authentication and a sample data fixture.

Key features
- User authentication via Auth0 (SPA).
- Protected API routes (Auth0 token verification).
- User registration, bookings, favorites.
- Residency listings (fixture data + DB).
- Uses Prisma with MongoDB (requires replica set for transactions).
- Dev Docker support for local MongoDB replica set.

Tech stack
- Frontend
  - React
  - Vite
  - Mantine (UI)
  - react-router-dom
  - axios
  - Leaflet (maps)
  - Auth0 React SDK
- Backend
  - Node.js + Express
  - Prisma ORM (@prisma/client)
  - MongoDB (via Prisma)
  - express-oauth2-jwt-bearer (Auth0 token middleware)
  - cookie-parser, cors, dotenv, express-async-handler
  - nodemon (dev)
- Dev / infra
  - Docker (optional — used here to run a local MongoDB replica set)
  - MongoDB Compass (optional for inspecting DB)
  - Yarn / npm
  - prisma CLI (npx prisma)

Repository layout (high level)
- /client — React + Vite app
- /server — Express API, Prisma schema, sample data (server/data/Residency.json)
- README.md — this file

Prerequisites
- Node.js (v16+ recommended)
- Yarn or npm
- Docker Desktop (recommended for local MongoDB replica set) OR a local mongod you can run with --replSet rs0
- MongoDB Compass (optional, for DB inspection)
- Auth0 tenant (create Application + API)

Environment variables
- server/.env (example)
  - PORT=8000
  - DATABASE_URL="mongodb://127.0.0.1:27017/eBetFelagi"  # add ?replicaSet=rs0 if you prefer
  - AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.auth0.com
  - AUTH0_AUDIENCE=http://localhost:8000
  - AUTH0_JWKS_URI=... (if needed)
- client/.env (Vite) — use VITE_ prefix
  - VITE_AUTH0_DOMAIN=your-tenant.auth0.com
  - VITE_AUTH0_CLIENT_ID=your-spa-client-id
  - VITE_AUTH0_REDIRECT_URI=http://localhost:5173
  - VITE_AUTH0_AUDIENCE=http://localhost:8000
  - VITE_API_BASE_URL=http://localhost:8000

Quick setup (dev)
1. Backend
   - cd server
   - Install deps: yarn OR npm install
   - If using Docker (recommended) run MongoDB replica set:
     - docker run -d --name mongodb-rs -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo --replSet rs0
     - docker exec -it mongodb-rs mongosh --eval "rs.initiate({_id:'rs0', members:[{_id:0, host:'127.0.0.1:27017'}]})"
   - Ensure DATABASE_URL in server/.env points to mongodb://127.0.0.1:27017/eBetFelagi (or include ?replicaSet=rs0)
   - npx prisma generate
   - yarn start
2. Frontend
   - cd client
   - yarn
   - create client/.env.local with VITE_ variables
   - yarn dev
3. Test
   - Open app (Vite prints URL, usually http://localhost:5173)
   - Log in with Auth0, verify network call POST /api/user/register is sent and succeeds
   - Inspect DB in Compass or via mongosh

Seeding / fixtures
- server/data/Residency.json contains example residencies. To import into MongoDB:
  - (With Docker) docker cp ... then docker exec mongoimport:
    - docker cp "<path>/server/data/Residency.json" mongodb-rs:/tmp/Residency.json
    - docker exec -it mongodb-rs mongoimport --db eBetFelagi --collection Residency --file /tmp/Residency.json --jsonArray
  - Or write a small Prisma seed script to parse the JSON and create entries (recommended if you need field transformations).

Common issues & troubleshooting
- "Service not found: http://localhost:8000" — create an API in Auth0 with identifier exactly http://localhost:8000 and ensure the SPA requests that audience.
- Prisma error: "Prisma needs to perform transactions..." — MongoDB must run as a replica set (single-node replica set is fine for dev). Use Docker or start mongod with --replSet rs0 and run rs.initiate().
- No register request in network — client may not be requesting token or getAccessTokenWithPopup may fail. Check browser console and ensure isAuthenticated becomes true and access token is present.
- If prisma client not generated: run npx prisma generate in server.

Image sources and attribution
- If your app uses third‑party images, include attribution where required. Common free sources:
  - Unsplash — https://unsplash.com
  - Pexels — https://www.pexels.com
  - Pixabay — https://pixabay.com
  - Freepik — https://www.freepik.com (check license & attribution)
  - Icons8 / FontAwesome for icons — https://icons8.com, https://fontawesome.com
- How to attribute: add a small line in your footer or README, e.g. "Hero image: Photo by <Author> on Unsplash — https://unsplash.com/..." or include a credits page.

Security & best practices
- Do NOT commit .env files with secrets. Add .env.local to .gitignore.
- Keep server-only secrets (Auth0 client secret) on server; only expose VITE_ prefixed vars to frontend.
- Re-enable jwtCheck middleware in production; do not disable Auth0 checks permanently.

Useful commands
- Prisma generate: npx prisma generate
- Run server: yarn start
- Run client: yarn dev
- MongoDB replica set (Docker):
  - docker run -d --name mongodb-rs -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo --replSet rs0
  - docker exec -it mongodb-rs mongosh --eval "rs.initiate({_id:'rs0', members:[{_id:0, host:'127.0.0.1:27017'}]})"

Contribution notes
- If you add new envs, update client/.env.example and server/.env.example.
- If you change Prisma schema, run npx prisma generate and migrate as needed (for Mongo use prisma db push).

License
- Open source
