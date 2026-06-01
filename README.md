# 🎬 RAG Video Chatbot

> Ask anything about a YouTube video — powered by AI that actually reads the video content.



![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square)




![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=flat-square)




![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square)




![Groq](https://img.shields.io/badge/LLM-Groq-orange?style=flat-square)



---

## 🚀 Live Demo
🎥 [Watch Demo Video](https://www.loom.com/share/12e71ec7b54e4a7daa874df7dc030f07)

---

## 💡 What It Does

Paste any YouTube URL → the app fetches the transcript → stores it in a vector database → you can chat with the video content using AI.

No more watching long videos just to find one answer!

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| 🎨 Frontend | React.js |
| ⚙️ Backend | FastAPI (Python) |
| 🧠 LLM | Groq (llama-3.3-70b-versatile) |
| 🗄️ Vector DB | ChromaDB |
| 📝 Transcripts | yt-dlp |

---

## ✨ Features

- 🎥 Load any YouTube video by URL
- 💬 Ask natural language questions
- 🤖 Get accurate AI answers from video content
- ⚡ Super fast responses via Groq LLM
- 📚 Load multiple videos and chat across all of them

---

## 🏃 How to Run

### 1️⃣ Clone the repo
```bash
git clone https://github.com/kalapakasrimahalaxmi/rag-video-chatbot.git
cd rag-video-chatbot
```

### 2️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install fastapi uvicorn chromadb groq yt-dlp python-dotenv
```

Create a `.env` file inside `backend/`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Start the server:
```bash
uvicorn main:app --reload
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 4️⃣ Open the app
Visit `http://localhost:3000` in your browser 🎉

---

## 📁 Project Structure

```
rag-video-chatbot/
├── 📂 backend/
│   ├── main.py       # FastAPI routes
│   ├── rag.py        # RAG logic + Groq LLM
│   └── ingest.py     # YouTube transcript fetching
├── 📂 frontend/
│   └── src/
│       └── App.js    # React chat interface
└── README.md
```

---

## 🔗 Links

- 🐙 **GitHub:** [kalapakasrimahalaxmi/rag-video-chatbot](https://github.com/kalapakasrimahalaxmi/rag-video-chatbot)
- ⚡ **Groq API:** [console.groq.com](https://console.groq.com)

---

⭐ Star this repo if you found it useful!
