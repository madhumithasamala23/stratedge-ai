from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from routes import career, skillgap, resume, market, ignite, interviews
import os

load_dotenv()

app = FastAPI(title="StratEdge AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(career.router, prefix="/api")
app.include_router(skillgap.router, prefix="/api")
app.include_router(resume.router, prefix="/api")
app.include_router(market.router, prefix="/api")
app.include_router(ignite.router, prefix="/api")
app.include_router(interviews.router, prefix="/api")

frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    return FileResponse(os.path.join(frontend_path, "index.html"))