import os
import sys

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import json
import hashlib
import asyncio
import edge_tts

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(BASE_DIR, "public", "assets", "audio", "cache")
os.makedirs(CACHE_DIR, exist_ok=True)

VOICES = {
    "banu": "az-AZ-BanuNeural",
    "babek": "az-AZ-BabekNeural",
}

def get_cache_filename(voice_name: str, text: str) -> str:
    safe_text = text[:1500]
    key = f"{voice_name}_{safe_text}"
    h = hashlib.md5(key.encode("utf-8")).hexdigest()
    return os.path.join(CACHE_DIR, f"{h}.mp3")

sem = asyncio.Semaphore(6)

async def synthesize_sentence(text: str, voice_name: str):
    output_path = get_cache_filename(voice_name, text)
    if os.path.exists(output_path) and os.path.getsize(output_path) > 100:
        return
    async with sem:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(text, voice_name, rate="-4%")
                await comm.save(output_path)
                if os.path.exists(output_path) and os.path.getsize(output_path) > 100:
                    print(f"Generated: {os.path.basename(output_path)}")
                    return
            except Exception as e:
                if attempt == 2:
                    print(f"Error on sentence: {e}")
                await asyncio.sleep(1)

async def main():
    json_path = os.path.join(BASE_DIR, "scripts", "all_az_sentences.json")
    with open(json_path, "r", encoding="utf-8") as f:
        sentences = json.load(f)

    print(f"Loaded {len(sentences)} unique Azerbaijani sentences.")

    tasks = []
    for s in sentences:
        for _, voice in VOICES.items():
            tasks.append(synthesize_sentence(s, voice))

    print(f"Total audio files to check/generate: {len(tasks)}")
    await asyncio.gather(*tasks)
    print("All educational audio files successfully pre-cached!")

if __name__ == "__main__":
    asyncio.run(main())
