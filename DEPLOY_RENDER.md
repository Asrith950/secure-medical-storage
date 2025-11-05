# Deploying this project to Render

This repository contains a Node/Express backend in `server/` and a React frontend in `client/`.
The `render.yaml` file included in this repo configures Render to build both the frontend and backend and run the backend as a single web service that serves the API and, when present, the built React frontend (`client/build`).

Quick steps to deploy:

1. Push your branch (e.g. `upload-local-project`) to GitHub.
2. Create a Render account at https://render.com and connect your GitHub account.
3. Create a new Web Service and connect the repo and branch, or let Render detect `render.yaml` (recommended).
   - If Render asks, pick the `secure-medical-storage-web` service defined in `render.yaml`.
4. In the Render dashboard, set the required environment variables for production under the Service -> Environment section:
   - `MONGODB_URI` (e.g. your MongoDB Atlas connection string)
   - `JWT_SECRET` (a secure random secret for JSON Web Tokens)
   - `OPENAI_API_KEY` (if the app uses OpenAI features)
   - `NODE_ENV` = `production`
   - `PORT` (optional — Render will provide one automatically if omitted)

Notes and important considerations:

- Static files and client serving: The server will attempt to serve the React build from `client/build`. The `render.yaml` build command runs `npm run build` which builds the client into `client/build`.

- File uploads: This project stores uploaded files in the local `server/uploads` folder. Render ephemeral filesystem is not persistent across deploys or instance restarts. For production you should:
  1. Use an external object store (Amazon S3, Backblaze B2) or
  2. Use Render's Persistent Disks (configure in the Render dashboard) and mount it to `/opt/render/project/src/server/uploads` (or adjust mount path accordingly).

- MongoDB: For production use MongoDB Atlas. Update connection string in `MONGODB_URI` and whitelist Render IPs or set proper network access.

- Logs: Use the Render dashboard Logs tab to inspect `console.log` output during build and runtime. If something fails, check build logs first.

Local test before pushing:

```powershell
# Install dependencies
npm run install-all

# Build frontend
npm run build

# Start server locally
npm start

# Open http://localhost:5000 or the printed port
```

If you'd prefer to deploy frontend and backend as separate Render services (front as a Static Site and backend as a Web Service), open an issue or follow Render docs to create two services and set the frontend to use `client/build` for publishing.

If you want, I can also:
- Add a small CI check to ensure `npm run build` succeeds on PRs
- Add guidance or example config for using S3 for uploads

Good to go: the `render.yaml` is in the repo and `server/index.js` now serves `client/build` when present.
