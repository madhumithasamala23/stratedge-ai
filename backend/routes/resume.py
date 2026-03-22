from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class ResumeTextRequest(BaseModel):
    resume_text: str
    target_role: str = "Software Engineer"

@router.post("/resume-roast")
def roast_resume(req: ResumeTextRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a brutally honest resume reviewer. Review this resume for a {req.target_role} position:

{req.resume_text}

Give honest, actionable feedback. Be direct but helpful.

Respond ONLY with a JSON object like this, nothing else, no markdown:
{{
  "score": 72,
  "verdict": "Decent foundation but missing key elements",
  "issues": [
    {{"type": "critical", "issue": "No GitHub links on projects", "fix": "Add GitHub links to every project immediately"}},
    {{"type": "warning", "issue": "Metrics look estimated", "fix": "Remove ~ symbols, use real numbers or remove metrics"}},
    {{"type": "good", "issue": "Strong internship timeline for 3rd year", "fix": "Keep this front and center"}}
  ],
  "top_fix": "Add GitHub links to all projects before sending a single application"
}}"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"roast": json.loads(clean)}