# Deploying to Vercel

This project is a monorepo with a React frontend in `client/` and an Express backend in `server/`.

This guide shows the easiest path: deploy the frontend (client) to Vercel as a static site, and run the backend on a separate host (Render, Railway, Heroku, or a VM). If you want a full-stack single-host deployment on Vercel (serverless), see the "Optional: serverless" section below.

## Quick frontend-only deploy (recommended)

1. Install the Vercel CLI (PowerShell):

```powershell
npm i -g vercel
# or: corepack enable && corepack prepare vercel@latest --activate
```

2. From the project root (where this README sits) run:

```powershell
vercel login
vercel --prod
```

Notes:
- `vercel.json` is included and instructs Vercel to build the React app in `client/` (it runs `npm run build` in `client` and serves the `build/` directory).
- If your frontend needs a production API base URL, set an environment variable in the Vercel project settings (e.g. `REACT_APP_API_URL`) or update the frontend to use an absolute API URL.

## Backend hosting

The backend (Express + MongoDB) requires a persistent server and a MongoDB instance. Options:

- Use Render / Railway / Fly.io / Heroku to host the Express server and set environment variables.
- Use MongoDB Atlas for a managed MongoDB and set `MONGODB_URI` in your backend environment.

Required environment variables for production (found in `server/.env.example`):

- `MONGODB_URI` (e.g. mongodb+srv://...)
- `JWT_SECRET`
- `JWT_EXPIRE` (optional; default `30d`)
- `OPENAI_API_KEY` (if using AI features)
- Any email/SMTP vars used by the code (check `server` code for `process.env` usages)

Create the backend project on your chosen host, set these env vars there, and deploy `server/`.

## Optional: run both as separate Vercel projects in the same Git repo

- Create two Vercel projects: one pointing to the `client` folder (static build), another to the `server` folder (select "Other" and provide a build command like `npm install && npm run build` if you convert to serverless functions). Running an Express app as-is on Vercel isn't supported — you'd need to adapt the Express routes into serverless functions in an `api/` folder.

## Optional: Convert Express backend to Vercel Serverless functions

This is more involved. High-level steps:

1. Move each REST route into `api/` as independent Serverless functions (e.g. `api/users/[id].js`) that export a handler compatible with Vercel.
2. Replace long-lived MongoDB connections with a safe connect-on-demand pattern used in Serverless (reuse global connection across invocations).
3. Move sensitive keys into Vercel Environment Variables.

If you'd like, I can (a) generate `vercel.json` (already added), (b) convert a small subset of routes to serverless handlers as a proof-of-concept, or (c) prepare a Render/Railway deployment guide and sample `Procfile`.

---

Security note: I noticed a `.env` file in the `server/` folder that contains a plain OpenAI API key; do not commit secrets to the repo. Rotate any leaked keys immediately.
