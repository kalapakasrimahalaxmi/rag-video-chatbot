import { useState } from "react";
import axios from "axios";

const API = "http://localhost:8000";

export default function App() {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [ingested, setIngested] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleIngest = async () => {
    try {
      setMessages([{ role: "system", text: "⏳ Loading video, please wait..." }]);
      const res = await axios.post(`${API}/ingest`, { url });
      setIngested(true);
      setMessages([{ role: "system", text: `✅ Loaded: ${res.data.metadata.title}` }]);
    } catch (err) {
      setMessages([{ role: "system", text: "❌ Error: Make sure backend is running and URL is valid" }]);
    }
  };

  const handleChat = async () => {
    if (!question) return;
    try {
      setLoading(true);
      setMessages(m => [...m, { role: "user", text: question }]);
      setQuestion("");
      const res = await axios.post(`${API}/chat`, { question });
      setMessages(m => [...m, { role: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages(m => [...m, { role: "system", text: "❌ Error connecting to backend" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 650,
      margin: "2rem auto",
      fontFamily: "sans-serif",
      padding: "0 1rem"
    }}>
      <h2>🎬 Video RAG Chatbot</h2>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 12 }}>
        Paste a YouTube URL, load it, then ask questions about the video.
      </p>

      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Paste YouTube URL here..."
        style={{
          width: "100%",
          padding: 10,
          marginBottom: 8,
          fontSize: 14,
          borderRadius: 6,
          border: "1px solid #ccc"
        }}
      />
      <button
        onClick={handleIngest}
        style={{
          padding: "10px 20px",
          marginBottom: 20,
          backgroundColor: "#0066cc",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14
        }}
      >
        Load Video
      </button>

      <div style={{
        border: "1px solid #ddd",
        minHeight: 220,
        padding: 14,
        marginBottom: 14,
        borderRadius: 8,
        backgroundColor: "#fafafa"
      }}>
        {messages.length === 0 && (
          <p style={{ color: "#aaa", fontSize: 14 }}>
            Load a video to start chatting...
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <p style={{
              color: m.role === "bot" ? "#1a7a1a" :
                     m.role === "user" ? "#0000cc" : "#888",
              fontSize: 14,
              margin: 0
            }}>
              <b>
                {m.role === "bot" ? "🤖 Bot" :
                 m.role === "user" ? "🧑 You" : "ℹ️ System"}:
              </b>{" "}
              {m.text}
            </p>
          </div>
        ))}
        {loading && (
          <p style={{ color: "#888", fontSize: 13 }}>🤖 Thinking...</p>
        )}
      </div>

      {ingested && (
        <>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleChat()}
            placeholder="Ask something about the video..."
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 8,
              fontSize: 14,
              borderRadius: 6,
              border: "1px solid #ccc"
            }}
          />
          <button
            onClick={handleChat}
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#aaa" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: 14
            }}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </>
      )}
    </div>
  );
}