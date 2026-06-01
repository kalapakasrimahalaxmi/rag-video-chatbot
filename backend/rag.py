import chromadb
from groq import Groq
from ingest import fetch_transcript, chunk_text
import os
from dotenv import load_dotenv

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

chroma = chromadb.Client()
collection = chroma.get_or_create_collection(
    name="videos",
    metadata={"hnsw:space": "cosine"}
)

def ingest_video(url):
    transcript, metadata = fetch_transcript(url)
    chunks = chunk_text(transcript)
    for i, chunk in enumerate(chunks):
        collection.add(
            documents=[chunk],
            metadatas=[metadata],
            ids=[f"chunk_{i}_{abs(hash(url))}"]
        )
    return metadata, len(chunks)

def answer_question(question):
    results = collection.query(
        query_texts=[question],
        n_results=5
    )
    context = "\n".join(results["documents"][0])
    prompt = f"""Answer using ONLY this context:
{context}

Question: {question}"""
    res = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )
    return res.choices[0].message.content, results["metadatas"][0]
