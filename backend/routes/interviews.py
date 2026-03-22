from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os
import json

router = APIRouter()

def get_client():
    return Groq(api_key=os.getenv("GROQ_API_KEY"))

class InterviewRequest(BaseModel):
    role: str
    skills: str
    answer: str = ""
    question: str = ""

@router.post("/interview-question")
def get_interview_question(req: InterviewRequest):
    client = get_client()
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": f"""You are a tough but fair technical interviewer for a {req.role} position. The candidate has these skills: {req.skills}.

Generate one interview question and if an answer was provided evaluate it.

Previous question: {req.question if req.question else "None"}
Candidate answer: {req.answer if req.answer else "None"}

Respond ONLY with a JSON object like this, nothing else, no markdown:
{{
  "question": "Explain the difference between supervised and unsupervised learning with a real world example.",
  "category": "Technical",
  "difficulty": "Medium",
  "hint": "Think about whether you have labeled data or not",
  "feedback": {{
    "score": 78,
    "strengths": "Good understanding of core concepts",
    "improvements": "Could have given a more specific real world example",
    "better_answer": "Supervised learning uses labeled data like spam detection. Unsupervised learning finds patterns without labels like customer segmentation."
  }}
}}"""
            }
        ]
    )
    text = response.choices[0].message.content
    clean = text.replace("```json", "").replace("```", "").strip()
    return {"interview": json.loads(clean)}