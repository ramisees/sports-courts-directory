from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import openai
import json

app = FastAPI(title="Courty AI Service", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatMessage(BaseModel):
    message: str
    location: Optional[str] = None
    sport_type: Optional[str] = None

class CourtRecommendation(BaseModel):
    court_id: str
    name: str
    sport_types: List[str]
    distance: float
    rating: float
    reason: str

class ProductRecommendation(BaseModel):
    name: str
    price: float
    url: str
    affiliate_link: str
    reason: str

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "courty-ai"}

@app.post("/chat")
async def chat_with_courty(message: ChatMessage):
    try:
        # This is a basic implementation - you'll expand this with Claude Code
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are Courty, a helpful AI assistant for finding sports courts. Be friendly and helpful."
                },
                {
                    "role": "user",
                    "content": message.message
                }
            ]
        )
        
        return {
            "response": response.choices[0].message.content,
            "recommendations": []  # Will be populated with actual court data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend-courts")
async def recommend_courts(message: ChatMessage):
    # Placeholder - implement with actual court data
    return {
        "courts": [],
        "message": "Court recommendations will be implemented here"
    }

@app.post("/recommend-products")
async def recommend_products(sport_type: str):
    # Placeholder - implement with Amazon/CJ APIs
    return {
        "products": [],
        "message": f"Product recommendations for {sport_type} will be implemented here"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
