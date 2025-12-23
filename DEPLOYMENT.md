# Railway Deployment - Backend Only

## Deploy Backend on Railway:

1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select "Mohit-kumar-007/chatroom"
5. Railway will detect the project

### Configure Settings:
- Click on the service
- Go to "Settings" tab
- **Root Directory**: `backend`
- **Build Command**: Leave empty (or `npm install`)
- **Start Command**: `npm start`
- **Watch Paths**: `backend/**`

### Add Environment Variables:
- Go to "Variables" tab
- Add: `NODE_ENV` = `production`
- Railway auto-provides `PORT` - don't add it

### Get Your Backend URL:
- Go to "Settings" → "Networking"
- Click "Generate Domain"
- Copy the URL (like `https://chatroom-production-xxxx.up.railway.app`)

---

# Vercel Deployment - Frontend Only

## Deploy Frontend on Vercel:

1. Go to https://vercel.com
2. Login with GitHub
3. Click "Add New Project"
4. Select "Mohit-kumar-007/chatroom"

### Configure Settings:
- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### Add Environment Variable:
- Click "Environment Variables"
- Add variable:
  - **Name**: `REACT_APP_SOCKET_URL`
  - **Value**: `https://your-railway-backend-url.railway.app` (paste from Railway)
  - **Environment**: Production

### Deploy:
- Click "Deploy"
- Wait for build to complete
- Your frontend will be live!

---

## CORS Update (Important!)
After getting your Vercel URL, update backend CORS:

1. Go to Railway dashboard
2. Add environment variable:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://your-app.vercel.app`

Then update backend/server.js to use this variable for CORS origin.

---

## Summary:
- **Backend**: Railway (backend folder only)
- **Frontend**: Vercel (frontend folder only)
- Frontend connects to backend via `REACT_APP_SOCKET_URL`
