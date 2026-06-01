from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import ingest_video, answer_question

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class VideoRequest(BaseModel):
    url: str

class ChatRequest(BaseModel):
    question: str

@app.post("/ingest")
async def ingest(req: VideoRequest):
    metadata, count = ingest_video(req.url)
    return {"status": "ok", "metadata": metadata, "chunks": count}

@app.post("/chat")
async def chat(req: ChatRequest):
    answer, sources = answer_question(req.question)
    return {"answer": answer, "sources": sources}