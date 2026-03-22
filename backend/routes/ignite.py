from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class IgniteRequest(BaseModel):
    interests: str
    strong_subjects: str
    class_grade: str = "10th"

@router.post("/ignite")
def get_ignite_guidance(req: IgniteRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a school career counselor in India. A {req.class_grade} student has these interests: {req.interests} and is strong in these subjects: {req.strong_subjects}.

Give them complete guidance on stream selection and career paths.

Respond ONLY with a JSON object like this, nothing else, no markdown:
{{
  "recommended_stream": "Science (PCM)",
  "reason": "Strong in Maths and Physics with interest in technology",
  "career_paths": [
    {{"career": "Software Engineer", "entrance_exam": "JEE Main", "top_colleges": ["IIT", "NIT", "BITS"], "timeline": "4 years BTech"}},
    {{"career": "Data Scientist", "entrance_exam": "JEE Main / CUET", "top_colleges": ["IIT", "NIT", "IIIT"], "timeline": "4 years BTech CS"}}
  ],
  "monthly_plan": [
    {{"month": "Month 1-3", "focus": "Strengthen PCM fundamentals", "action": "NCERT mastery + daily practice"}},
    {{"month": "Month 4-6", "focus": "Start JEE foundation", "action": "Join coaching or use PW / Unacademy"}}
  ],
  "motivational_tip": "Your interest in technology combined with strong Maths is a perfect foundation for engineering."
}}"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"guidance": json.loads(clean)}