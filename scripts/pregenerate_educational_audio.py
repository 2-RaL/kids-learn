"""
Pre-generates studio-grade Azerbaijani Neural TTS audio for Parent Portal:
- Stories (Banu and Babek voices)
- User test sentences
- Chess lesson prompts and praise texts
- Math and logic questions
Saves to public/assets/audio/cache/{md5_hash}.mp3
"""
import os
import re
import sys
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

def clean_text_for_speech(raw: str) -> str:
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
    # Remove emoji symbols
    text = re.sub(r"[\U0001F300-\U0001F9FF\U00002600-\U000026FF\U00002700-\U000027BF\U0001F1E0-\U0001F1FF\U0001F000-\U0001F02F\U0001F0A0-\U0001F0FF]", "", text)
    text = re.sub(r"[!]{2,}", "!", text)
    text = re.sub(r"[?]{2,}", "?", text)
    text = re.sub(r"\.{3,}", "…", text)
    text = re.sub(r"^[•\-\*]\s+", "", text, flags=re.M)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def tokenize_sentences(paragraphs):
    sentences = []
    for p in paragraphs:
        cleaned = clean_text_for_speech(p)
        if not cleaned:
            continue
        protected = re.sub(r"\b(məs|və s|sm|km|q|kq|mln|mlrd|səh|ill)\.", r"\1§DOT§", cleaned, flags=re.I)
        protected = re.sub(r"(\d+)\.(\d+)", r"\1§DOT§\2", protected)
        parts = re.findall(r"[^.!?…]+[.!?…]+(?=[\s\"»'”]|$)|[^.!?…]+$", protected)
        if not parts:
            parts = [protected]
        for part in parts:
            restored = part.replace("§DOT§", ".").strip()
            if restored:
                sentences.append(restored)
    return sentences

def get_cache_filename(voice_name: str, text: str) -> str:
    safe_text = text[:1500]
    key = f"{voice_name}_{safe_text}"
    h = hashlib.md5(key.encode("utf-8")).hexdigest()
    return os.path.join(CACHE_DIR, f"{h}.mp3")

sem = asyncio.Semaphore(5)

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
                    print(f"Generated: {os.path.basename(output_path)} ({len(text)} chars)")
                    return
            except Exception as e:
                if attempt == 2:
                    print(f"Error on '{text[:30]}...': {e}", file=sys.stderr)
                await asyncio.sleep(1)

def extract_story_paragraphs():
    stories_file = os.path.join(BASE_DIR, "src", "data", "parentStoriesData.ts")
    with open(stories_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Find az: { ... paragraphs: [ ... ] }
    paragraphs = []
    az_sections = re.findall(r"az:\s*\{[\s\S]*?paragraphs:\s*\[([\s\S]*?)\]\s*\}", content)
    for sec in az_sections:
        matches = re.findall(r"['\"]([\s\S]*?)['\"],?", sec)
        for m in matches:
            cleaned = m.strip()
            if cleaned and len(cleaned) > 10:
                paragraphs.append(cleaned)
    return paragraphs

def extract_chess_prompts():
    chess_file = os.path.join(BASE_DIR, "src", "data", "parentChessData.ts")
    with open(chess_file, "r", encoding="utf-8") as f:
        content = f.read()
    prompts = []
    matches = re.findall(r"speechPrompt:\s*\{[\s\S]*?az:\s*['\"]([\s\S]*?)['\"]", content)
    for m in matches:
        cleaned = clean_text_for_speech(m)
        if cleaned:
            prompts.append(cleaned)
    return prompts

TEST_SENTENCES = [
    "Salam! Bu gün birlikdə maraqlı bir hekayə oxuyacağıq.",
    "Şəkildə neçə alma olduğunu saya bilərsən?",
    "Dovşan meşədə dostlarını axtarmağa başladı.",
    "At şahmat taxtasında L formasında hərəkət edir.",
    "Qırmızı rəngli dairəni seç.",
    # Chess praises
    "Afərin! Çox ağıllı gediş etdin!",
    "Əla! Şahmat taxtasını çox yaxşı öyrənirsən!",
    "Möhtəşəm! Bu qaydanı artıq tam başa düşdün!",
    "Bravo! Sən əsl şahmat ustasısan!",
    "Təbrik edirəm! Bu dərsi uğurla tamamladın!"
]

async def main():
    print("Collecting Azerbaijani educational texts...")
    paragraphs = extract_story_paragraphs()
    story_sentences = tokenize_sentences(paragraphs)
    chess_prompts = extract_chess_prompts()

    all_sentences = set(TEST_SENTENCES + story_sentences + chess_prompts)
    print(f"Total unique Azerbaijani sentences to ensure cached: {len(all_sentences)}")

    tasks = []
    for s in all_sentences:
        for persona, voice_name in VOICES.items():
            tasks.append(synthesize_sentence(s, voice_name))

    print(f"Synthesizing {len(tasks)} audio items across Banu and Babek voices...")
    await asyncio.gather(*tasks)
    print("Pre-generation complete! All core educational content is cached.")

if __name__ == "__main__":
    asyncio.run(main())
