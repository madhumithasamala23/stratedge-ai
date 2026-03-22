from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class SkillGapRequest(BaseModel):
    skills: str
    target_role: str

@router.post("/skill-gap")
def get_skill_gap(req: SkillGapRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a career coach. The user has these skills: {req.skills} and wants to become a {req.target_role}.

Identify the top 6 skill gaps they need to fill.

Respond ONLY with a JSON array like this, nothing else, no markdown:
[
  {{"skill": "MLOps / Docker", "current_level": 10, "required_level": 80, "priority": "High", "resource": "Docker official docs + MLOps Zoomcamp"}},
  {{"skill": "System Design", "current_level": 30, "required_level": 85, "priority": "High", "resource": "Grokking System Design course"}}
]"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"gaps": json.loads(clean)}