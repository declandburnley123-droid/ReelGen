# ReelGen — AI Reel Generator

## Deploy to Vercel (Free) — Step by Step

### 1. Install prerequisites
- [Node.js](https://nodejs.org) (any recent version)
- A free [Vercel account](https://vercel.com/signup)
- A free [GitHub account](https://github.com) (optional but recommended)

---

### Option A: Deploy via GitHub (easiest long-term)

1. Go to [github.com/new](https://github.com/new) and create a new repository called `reelgen`
2. Upload all files from this folder into the repo (drag & drop in the GitHub UI)
3. Go to [vercel.com/new](https://vercel.com/new)
4. Click **"Import Git Repository"** and select your `reelgen` repo
5. Click **Deploy** — Vercel auto-detects everything
6. After deploy, go to **Settings → Environment Variables**
7. Add: `ANTHROPIC_API_KEY` = your key from [console.anthropic.com](https://console.anthropic.com)
8. Click **Redeploy** — your site is live!

---

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# From inside this project folder
cd reelgen
vercel

# Follow the prompts — say YES to everything
# Then add your API key:
vercel env add ANTHROPIC_API_KEY
# Paste your key when prompted

# Redeploy with the env var
vercel --prod
```

---

## Project Structure

```
reelgen/
├── public/
│   └── index.html      ← Frontend (the website)
├── api/
│   └── generate.js     ← Backend (serverless function, keeps API key secret)
├── vercel.json         ← Vercel routing config
└── README.md
```

## How it works

- User fills out the form on the frontend
- Frontend sends a POST to `/api/generate` (your own backend)
- The backend (running on Vercel's servers) calls Anthropic with your secret API key
- The result comes back to the user — API key never exposed

## Getting an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in
3. Go to **API Keys** → **Create Key**
4. Copy the key and add it to Vercel as `ANTHROPIC_API_KEY`

Note: Anthropic gives $5 free credit to new accounts. Each reel generation costs roughly $0.002.
