import os
import sys
import json
import hashlib
import asyncio
import edge_tts
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, "public", "assets", "audio", "cache")
DIST_CACHE_DIR = os.path.join(BASE_DIR, "dist", "assets", "audio", "cache")
os.makedirs(CACHE_DIR, exist_ok=True)
os.makedirs(DIST_CACHE_DIR, exist_ok=True)

VOICES = {
    "banu": "az-AZ-BanuNeural",
    "babek": "az-AZ-BabekNeural",
}

def clean_text(raw: str) -> str:
    if not raw:
        return ""
    text = raw
    text = re.sub(r"<[^>]*>", " ", text)
    text = re.sub(r"&nbsp;", " ", text, flags=re.I)
    text = re.sub(r"&amp;", "&", text, flags=re.I)
    text = re.sub(r"&lt;", "<", text, flags=re.I)
    text = re.sub(r"&gt;", ">", text, flags=re.I)
    text = re.sub(r"&quot;", '"', text, flags=re.I)
    text = re.sub(r"&#39;", "'", text, flags=re.I)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    text = re.sub(r"__([^_]+)__", r"\1", text)
    text = re.sub(r"_([^_]+)_", r"\1", text)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"^#+\s+", "", text, flags=re.M)
    text = re.sub(r"[\U0001F300-\U0001F9FF\U00002600-\U000026FF\U00002700-\U000027BF\U0001F1E0-\U0001F1FF\U0001F000-\U0001F02F\U0001F0A0-\U0001F0FF]", "", text)
    text = re.sub(r"[!]{2,}", "!", text)
    text = re.sub(r"[?]{2,}", "?", text)
    text = re.sub(r"\.{3,}", "…", text)
    text = re.sub(r"^[•\-\*]\s+", "", text, flags=re.M)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def get_hash(voice_name: str, text: str) -> str:
    safe_text = text[:1500]
    key = f"{voice_name}_{safe_text}"
    return hashlib.md5(key.encode("utf-8")).hexdigest()

sem = asyncio.Semaphore(4)

async def synthesize(text: str, voice_name: str):
    cleaned = clean_text(text)
    if not cleaned:
        return
    h = get_hash(voice_name, cleaned)
    pub_file = os.path.join(CACHE_DIR, f"{h}.mp3")
    dist_file = os.path.join(DIST_CACHE_DIR, f"{h}.mp3")

    if os.path.exists(pub_file) and os.path.getsize(pub_file) > 100:
        if not os.path.exists(dist_file):
            import shutil
            shutil.copy2(pub_file, dist_file)
        return

    async with sem:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(cleaned, voice_name, rate="-4%")
                await comm.save(pub_file)
                if os.path.exists(pub_file) and os.path.getsize(pub_file) > 100:
                    import shutil
                    shutil.copy2(pub_file, dist_file)
                    print(f"Generated [{voice_name}]: {cleaned[:40]}... -> {h}.mp3")
                    return
            except Exception as e:
                if attempt == 2:
                    print(f"Error on '{cleaned[:30]}': {e}", file=sys.stderr)
                await asyncio.sleep(1)

# Extract theoryVoice directly from parentChessData.ts
chess_path = os.path.join(BASE_DIR, "src", "data", "parentChessData.ts")
with open(chess_path, "r", encoding="utf-8") as f:
    content = f.read()

theory_texts = []
pattern = r"theoryVoice:\s*\{[\s\S]*?az:\s*['\"]([\s\S]*?)['\"],"
for m in re.finditer(pattern, content):
    t = m.group(1).replace(r"\'", "'").replace(r'\"', '"')
    theory_texts.append(t)

print(f"Found {len(theory_texts)} chess theory texts.")

async def main():
    tasks = []
    for t in theory_texts:
        for _, voice_name in VOICES.items():
            tasks.append(synthesize(t, voice_name))

    print(f"Synthesizing {len(tasks)} audio files...")
    await asyncio.gather(*tasks)
    print("All chess theory audio generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
