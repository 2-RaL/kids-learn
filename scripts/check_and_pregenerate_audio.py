# scripts/check_and_pregenerate_audio.py
# Pregenerates az-AZ-BabekNeural audio files into public/assets/audio/cache/
import json
import os
import hashlib
import re
import asyncio
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(ROOT, 'public', 'assets', 'audio', 'cache')
os.makedirs(CACHE_DIR, exist_ok=True)

def clean_text_for_speech(raw: str) -> str:
    if not raw:
        return ''
    text = raw
    text = re.sub(r'<[^>]*>', ' ', text)
    text = re.sub(r'&nbsp;', ' ', text, flags=re.I)
    text = re.sub(r'&amp;', '&', text, flags=re.I)
    text = re.sub(r'&lt;', '<', text, flags=re.I)
    text = re.sub(r'&gt;', '>', text, flags=re.I)
    text = re.sub(r'&quot;', '"', text, flags=re.I)
    text = re.sub(r'&#39;', "'", text)

    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^*]+)\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    text = re.sub(r'_([^_]+)_', r'\1', text)
    text = re.sub(r'`([^`]+)`', r'\1', text)
    text = re.sub(r'^#+\s+', '', text, flags=re.M)

    # remove emojis
    text = re.sub(r'[\U0001F300-\U0001F9FF\U00002600-\U000026FF\U00002700-\U000027BF\U0001F1E0-\U0001F1FF\U0001F000-\U0001F02F\U0001F0A0-\U0001F0FF]', '', text)

    # vocalize math
    text = re.sub(r'(\d+)\s*\+\s*(\d+)', r'\1 üstəgəl \2', text)
    text = re.sub(r'(\d+)\s*=\s*(\d+)', r'\1 bərabərdir \2', text)
    text = re.sub(r'(\d+)\s*-\s*(\d+)', r'\1 çıxılsın \2', text)
    text = text.replace('+', ' üstəgəl ')
    text = text.replace('=', ' bərabərdir ')

    text = re.sub(r'[!]{2,}', '!', text)
    text = re.sub(r'[?]{2,}', '?', text)
    text = re.sub(r'\.{3,}', '…', text)
    text = re.sub(r'^[•\-\*]\s+', '', text, flags=re.M)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def get_audio_hash(voice_name: str, text: str) -> str:
    safe = text[:1500]
    key = f"{voice_name}_{safe}"
    return hashlib.md5(key.encode('utf-8')).hexdigest()

async def synthesize_one(sem, text, voice, out_path):
    async with sem:
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            return True
        try:
            comm = edge_tts.Communicate(text, voice, rate="-3%")
            await comm.save(out_path)
            return True
        except Exception as e:
            print(f"Error synthesizing '{text[:30]}...': {e}")
            return False

async def main():
    modules_file = os.path.join(ROOT, 'scratch', 'expanded_modules.json')
    with open(modules_file, 'r', encoding='utf-8') as f:
        modules = json.load(f)

    all_raw_texts = set()
    for mod in modules:
        for act in mod['activities']:
            if 'lesson' in act and act['lesson']:
                l = act['lesson']
                t = l.get('audioTextAz') or l.get('explanationAz')
                if t:
                    all_raw_texts.add(t.strip())
            q = act.get('question')
            if q:
                all_raw_texts.add(q.strip())
            ins = act.get('instruction')
            if ins:
                all_raw_texts.add(ins.strip())

    voice = 'az-AZ-BabekNeural'
    tasks_to_generate = []
    already_cached = 0

    for raw in all_raw_texts:
        cleaned = clean_text_for_speech(raw)
        if not cleaned:
            continue
        h = get_audio_hash(voice, cleaned)
        out_path = os.path.join(CACHE_DIR, f"{h}.mp3")
        if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
            already_cached += 1
        else:
            tasks_to_generate.append((cleaned, out_path))

    print(f"Total unique texts: {len(all_raw_texts)}")
    print(f"Already cached: {already_cached}")
    print(f"To generate with {voice}: {len(tasks_to_generate)}")

    if not tasks_to_generate:
        print("All audio files are cached!")
        return

    sem = asyncio.Semaphore(6)
    tasks = [synthesize_one(sem, txt, voice, path) for txt, path in tasks_to_generate]
    results = await asyncio.gather(*tasks)
    success = sum(1 for r in results if r)
    print(f"Successfully generated {success} / {len(tasks_to_generate)} audio files with Babek voice!")

if __name__ == '__main__':
    asyncio.run(main())
