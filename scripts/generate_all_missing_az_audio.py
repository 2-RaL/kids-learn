"""
Generates all missing Azerbaijani audio files for both Banu and Babek neural voices:
- Movement commands (ParentMovement & BottomControls)
- Math questions & explanations (ParentMath)
- Logic questions & explanations (ParentLogic)
- Chess theory & lesson prompts (ParentChess)
- Praise phrases & educational feedback
"""
import os
import sys
import hashlib
import asyncio
import edge_tts

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

PHRASES = [
    # ── 1. Movements (ParentMovement & main portal) ──
    "Otur",
    "Qalx",
    "İrəli get",
    "Qaç",
    "Tullan",
    "Əlini salla",
    "Yerində dön",
    "Dayan",
    "Oturmaq",
    "Durmaq",
    "Qaçmaq",
    "Tullanmaq",
    "Əl sallamaq",
    "Addımla irəli",
    "Sürətlə qaç",
    "Yuxarı tullan",
    "Dostlarına salam ver",
    "Bir dəfə fırlan",
    "Hərəkətsiz qal",
    "Rahatca əyləş",
    "Ayağa qalx",
    # Main portal commands
    "Alqışla",
    "Rəqs et",
    "Sola get",
    "Sağa get",
    "Başı salla",
    "Başı yellə",
    "Geri get",
    "Su iç",
    "Yemək ye",
    "Yat",
    "Gəril",
    "Göstər",
    "Kitab oxu",
    "Yaz",
    "Şəkil çək",
    "Say",
    "Düşün",
    "Mahnı oxu",
    "Gül",
    "Ağla",

    # ── 2. Math Questions & Explanations ──
    "Şəkildə neçə qırmızı alma var?",
    "2 + 1 cəmi neçə edir?",
    "Hansı ədəd daha böyükdür?",
    "4 - 1 fərqi neçə edir?",
    "3 + 2 cəmi neçə edir?",
    "5 - 2 fərqi neçə edir?",
    "Hansı ədəd daha kiçikdir?",
    "Neçə ulduz görürsən?",
    "1, 2, 3 alma var.",
    "2 ulduza 1 ulduz əlavə etsək 3 olar.",
    "5 ədədi 2-dən böyükdür.",
    "4 şardan 1-i uçduqda 3 şar qalır.",
    "3 almanın üzərinə 2 alma gəldikdə 5 alma edir.",
    "5 şardan 2-si partladıqda 3 şar qalır.",

    # ── 3. Logic Questions & Explanations ──
    "Hansı əşya digərlərindən fərqlidir?",
    "Qırmızı rəngdə olan meyvə hansıdır?",
    "Hansı heyvan uça bilir?",
    "Qış fəslində nə yağır?",
    "Hansı heyvan suda üzür?",
    "Hansı nəqliyyat vasitəsi havada uçur?",
    "Sarı rəngli meyvə hansıdır?",
    "Hansı əşya məktəb ləvazimatıdır?",
    "Avtomobil nəqliyyat vasitəsidir, meyvə deyil.",
    "Çiyələk parlaq qırmızı rəngdə olur.",
    "Qaranquş qanadları olan və uçan quşdur.",
    "Qış fəslində soyuq havada ağ qar yağır.",
    "Balıqlar suda üzən canlılardır.",
    "Təyyarə səmada uça bilən nəqliyyat növüdür.",
    "Limon sarı rəngdə və turş dadlı meyvədir.",
    "Dəftər və qələm məktəb ləvazimatıdır.",

    # ── 4. Chess Lessons: All 14 Theory Explanations ──
    "Şahmat taxtası 64 xanadan ibarətdir: 32 ağ və 32 qara xana. Taxtanı elə qoyuruq ki, hər oyunçunun sağ küncündə ağ xana olsun.",
    "Piyadalar ən cəsarətli əsgərlərdir. Onlar yalnız irəli gedir və ilk gedişdə 1 və ya 2 xana atlaya bilərlər.",
    "Top həm üfüqi, həm də şaquli xətlər boyunca istədiyi qədər irəliləyə bilən güclü qaladır.",
    "At şahmatın ən hiyləgər və sevimli fiqurudur. O, L hərfi formasında hərəkət edir və digər fiqurların üzərindən tullana bilir!",
    "Fil yalnız öz rəngindəki diaqonal xətlər üzrə hərəkət edir: ağ xanalı fil ağ diaqonallarda, qara xanalı fil qara diaqonallarda gəzir.",
    "Vəzir şahmat ordusunun ən güclü fiqurudur. O, həm top kimi düz, həm də fil kimi diaqonal xətlər boyunca istədiyi qədər gedə bilir.",
    "Şah ordunun ən mühüm şəxsiyyətidir. O, istənilən istiqamətə yalnız bir xana addım ata bilir. Şahı hər zaman diqqətlə qorumaq lazımdır!",
    "Mat şahmat oyununun ən böyük qələbəsidir. Rəqib şaha hücum edildikdə və onun qaça biləcək heç bir xanası qalmadıqda oyun bitir və qələbə qazanılır!",
    "Piyada qarşı tərəfin sonuncu sırasına çatdıqda möcüzə baş verir! O, ən güclü fiqura — Vəzirə çevrilə bilir!",
    "Qalaqurma xüsusi sehrli bir gedişdir! Şah və Top eyni vaxtda yerlərini dəyişərək şahı təhlükəsiz qalaya aparırlar.",
    "Piyada rəqib fiqurları irəli deyil, yalnız bir xana diaqonal istiqamətdə vurur. Bu onların gizli döyüş fəndidir!",
    "Şahmat lövhəsinin mərkəzindəki 4 xana ən strateji meydandır. Mərkəzi tutan oyunçu bütün oyunu asanlıqla idarə edir.",
    "Fiqurların güc xalları var: Piyada 1 xal, At və Fil 3 xal, Top 5 xal, Vəzir isə tam 9 xaldır!",
    "Atın eyni vaxtda iki güclü rəqib fiquruna hücum etməsinə Çəngəl deyilir. Bu çox ağıllı və gözəl taktiki zərbədir!",

    # ── 5. Chess Lesson Speech Prompts ──
    "Ağ xanaya toxun və onun adını öyrən.",
    "Piyadanı bir xana irəli apar.",
    "Topu düz xətlə rəqib xanasına hərəkət etdir.",
    "Atı L hərfi şəklində tullandıraraq mərkəzə gətir.",
    "Fili diaqonal boyunca ulduza doğru apar.",
    "Vəziri lövhənin o biri tərəfinə hərəkət etdir.",
    "Şahı təhlükəsiz yaşıl xanaya çək.",
    "Vəzirlə rəqib şaha son zərbəni vur və mat elan et!",
    "Piyadanı 8-ci sıraya çatdır və vəzir seç.",
    "Şahı iki xana sağa çəkərək qalaqurma et.",
    "Piyada ilə diaqonaldakı qara piyadanı vur.",
    "Piyadanı mərkəzi d4 xanasına gətir.",
    "Hansı fiqur daha dəyərlidir? Doğru fiquru seç.",
    "Atla həm şaha, həm vəzirə çəngəl zərbəsi vur.",

    # ── 6. Praise & Feedback Phrases ──
    "Afərin! Çox ağıllı gediş etdin!",
    "Əla! Şahmat taxtasını çox yaxşı öyrənirsən!",
    "Möhtəşəm! Bu qaydanı artıq tam başa düşdün!",
    "Bravo! Sən əsl şahmat ustasısan!",
    "Təbrik edirəm! Bu dərsi uğurla tamamladın!",
    "Salam! Bu gün birlikdə maraqlı bir hekayə oxuyacağıq.",
    "Dovşan meşədə dostlarını axtarmağa başladı.",
    "At şahmat taxtasında L formasında hərəkət edir.",
    "Qırmızı rəngli dairəni seç.",
    "Əhsən!",
    "Çox gözəl!",
    "Möhtəşəmsən!",
    "Əhsən! Doğru cavab!",
    "Təəssüf ki, səhvdir. Bir daha yoxla.",
    "Düzdür! Afərin sənə!",
]

async def main():
    print(f"Total phrases to verify/generate: {len(PHRASES)}")
    tasks = []
    for p in PHRASES:
        for _, voice_name in VOICES.items():
            tasks.append(synthesize(p, voice_name))

    print(f"Checking {len(tasks)} audio targets (Banu & Babek)...")
    await asyncio.gather(*tasks)
    print("Done generating all missing Azerbaijani educational audio!")

if __name__ == "__main__":
    asyncio.run(main())
