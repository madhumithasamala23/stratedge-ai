# StratEdge AI — Career Intelligence & Decision Platform

> One platform. Your entire career journey.

Live Demo: [check](https://stratedge-ai.vercel.app)

## What is StratEdge AI?

StratEdge AI is a full-stack AI-powered career intelligence platform that adapts to exactly where you are in your career journey. Unlike generic career tools, StratEdge detects your stage and becomes a completely different product for each user.

## Four User Stages

- 🔥 **Ignite** — School students (8th-12th): Stream selection, entrance exam roadmaps, college shortlisting
- ⚙️ **Build** — College students: Skill gap analysis, internship readiness, resume roasting, placement prep
- ⚡ **Accelerate** — Working professionals: Career switch analysis, salary benchmarking, upskill roadmaps
- 👑 **Dominate** — Job seekers: Mock interviews, job match scoring, cover letter generation

## Features

- AI-powered career path recommendations
- Skill gap analyzer with learning resources
- Brutal honest resume roaster with score
- Real-time market insights and trending skills
- Mock interview simulator with feedback
- School stream selector for Indian students
- Personalized monthly action plans

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TailwindCSS, Vite |
| Backend | FastAPI, Python |
| AI Model | Groq LLaMA 3.3 70B |
| Deployment | Vercel (frontend), Railway (backend) |
| Version Control | GitHub |

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# Add GROQ_API_KEY to .env file
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/career-paths | POST | Get career recommendations |
| /api/skill-gap | POST | Analyze skill gaps |
| /api/resume-roast | POST | Roast your resume |
| /api/market-insights | POST | Get market trends |
| /api/ignite | POST | School student guidance |
| /api/interview-question | POST | Mock interview questions |

© 2026 StratEdge AI. All rights reserved.
