from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class MarketRequest(BaseModel):
    domain: str = "AI / Machine Learning"

@router.post("/market-insights")
def get_market_insights(req: MarketRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a tech industry analyst. Give current market insights for the {req.domain} domain.

Respond ONLY with a JSON object like this, nothing else, no markdown:
{{
  "hot_skills": [
    {{"skill": "Agentic AI", "demand": "Exploding", "trend": "up"}},
    {{"skill": "RAG Systems", "demand": "Very High", "trend": "up"}},
    {{"skill": "MLOps", "demand": "High", "trend": "up"}}
  ],
  "top_roles": [
    {{"role": "AI Engineer", "avg_salary": "12-25 LPA", "openings": "High"}},
    {{"role": "ML Engineer", "avg_salary": "10-20 LPA", "openings": "High"}}
  ],
  "insight": "Generative AI and agentic systems are the hottest areas right now.",
  "avoid": "Pure data entry or manual testing roles are shrinking fast due to automation."
}}"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"insights": json.loads(clean)}