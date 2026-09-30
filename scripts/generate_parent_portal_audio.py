import os
import sys
import hashlib
import asyncio
import edge_tts
import shutil

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
    import re
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

sem = asyncio.Semaphore(5)

async def synthesize(text: str, voice_name: str):
    cleaned = clean_text(text)
    if not cleaned:
        return
    h = get_hash(voice_name, cleaned)
    pub_file = os.path.join(CACHE_DIR, f"{h}.mp3")
    dist_file = os.path.join(DIST_CACHE_DIR, f"{h}.mp3")

    if os.path.exists(pub_file) and os.path.getsize(pub_file) > 100:
        if not os.path.exists(dist_file):
            shutil.copy2(pub_file, dist_file)
        return

    async with sem:
        for attempt in range(3):
            try:
                comm = edge_tts.Communicate(cleaned, voice_name, rate="-4%")
                await comm.save(pub_file)
                if os.path.exists(pub_file) and os.path.getsize(pub_file) > 100:
                    shutil.copy2(pub_file, dist_file)
                    print(f"Generated [{voice_name}]: '{cleaned}' -> {h}.mp3")
                    return
            except Exception as e:
                if attempt == 2:
                    print(f"Error generating '{cleaned}': {e}", file=sys.stderr)
                await asyncio.sleep(1)

TARGET_PHRASES = [
    # Logic Questions & Explanations
    "Hansı əşya digərlərindən fərqlidir?",
    "Hansı meyvə qırmızı rəngdədir?",
    "Qırmızı rəngdə olan meyvə hansıdır?",
    "Hansı heyvan uça bilir?",
    "Qış fəslində nə yağır?",
    "Avtomobil nəqliyyat vasitəsidir, meyvə deyil.",
    "Çiyələk parlaq qırmızı rəngdə şirin meyvədir.",
    "Çiyələk parlaq qırmızı rəngdə olur.",
    "Qaranquş qanadları olan və uçan quşdur.",
    "Qışda hava soyuq olur və ağ qar yağır.",
    "Qış fəslində soyuq havada ağ qar yağır.",
    "Əla! Düzgün cavab!",
    "Əla! Düzgün cavab! 🎉",
    "Yaxın idi! Bir daha diqqətlə bax",
    "Yaxın idi! Bir daha diqqətlə bax 💭",

    # Logic Answer items
    "Alma",
    "Portağal",
    "Maşın",
    "Banan",
    "Çiyələk",
    "Limon",
    "Qaragilə",
    "İt",
    "Quş",
    "Pişik",
    "Qar",
    "Yarpaq",
    "Günəş şüası",

    # Math Questions & Explanations
    "Şəkildə neçə qırmızı alma var?",
    "2 + 1 cəmi neçə edir?",
    "Hansı ədəd daha böyükdür?",
    "4 - 1 fərqi neçə edir?",
    "1, 2, 3 alma var.",
    "2 ulduza 1 ulduz əlavə etsək 3 olar.",
    "5 ədədi 2-dən böyükdür.",
    "4 şardan 1-i uçduqda 3 şar qalır.",
    "Möhtəşəm! Düzgün cavab!",
    "Möhtəşəm! Düzgün cavab! 🌟",
    "Bir daha cəhd et, sən bacararsan!",
    "Bir daha cəhd et, sən bacararsan! 💪",

    # Movements
    "Otur",
    "Qalx",
    "İrəli get",
    "Qaç",
    "Tullan",
    "Əlini salla",
    "Yerində dön",
    "Dayan",

    # Chess Praises & Commands
    "Əhsən! Doğru gediş!",
    "Bravo! Doğru gediş!",
    "Afərin! Çox ağıllı gediş etdin!",
    "Təbrik edirəm! Bu dərsi uğurla tamamladın!",
]

async def main():
    print(f"Generating missing audio for {len(TARGET_PHRASES)} targeted phrases...")
    tasks = []
    for p in TARGET_PHRASES:
        for v in VOICES.values():
            tasks.append(synthesize(p, v))
    await asyncio.gather(*tasks)
    print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
