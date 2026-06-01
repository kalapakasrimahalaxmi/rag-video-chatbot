import yt_dlp
import re
import os

def get_video_id(url):
    match = re.search(r"v=([a-zA-Z0-9_-]+)", url)
    return match.group(1) if match else url.split("/")[-1]

def fetch_transcript(url):
    video_id = get_video_id(url)

    ydl_opts = {
        "quiet": True,
        "skip_download": True,
        "writeautomaticsub": True,
        "writesubtitles": True,
        "subtitleslangs": ["en"],
        "subtitlesformat": "vtt",
        "outtmpl": f"{video_id}",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        title = info.get("title", "Unknown Title")
        creator = info.get("uploader", "Unknown")
        views = str(info.get("view_count", 0))

    transcript = ""
    for fname in [f"{video_id}.en.vtt", f"{video_id}.en-orig.vtt"]:
        if os.path.exists(fname):
            with open(fname, "r", encoding="utf-8") as f:
                lines = f.readlines()
            text_lines = []
            for line in lines:
                line = line.strip()
                if (line and
                    not line.startswith("WEBVTT") and
                    not line.startswith("NOTE") and
                    "-->" not in line and
                    not line.isdigit()):
                    text_lines.append(line)
            transcript = " ".join(text_lines)
            os.remove(fname)
            break

    if not transcript:
        transcript = f"This is a video titled {title} by {creator}"

    metadata = {
        "title": title,
        "creator": creator,
        "views": views,
        "url": url
    }
    return transcript, metadata

def chunk_text(text, chunk_size=300, overlap=50):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks