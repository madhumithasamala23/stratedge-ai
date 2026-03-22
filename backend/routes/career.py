from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class CareerRequest(BaseModel):
    skills: str
    experience: str = "fresher"

@router.post("/career-paths")
def get_career_paths(req: CareerRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a career advisor. Based on these skills: {req.skills} and experience level: {req.experience}, suggest the top 5 career paths.

Respond ONLY with a JSON array like this, nothing else, no markdown:
[
  {{"rank": 1, "role": "ML Engineer", "match": 94, "reason": "Strong Python and ML skills align perfectly", "timeline": "0-6 months"}},
  {{"rank": 2, "role": "Data Scientist", "match": 87, "reason": "Good foundation in analytics", "timeline": "3-6 months"}}
]"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"careers": json.loads(clean)}