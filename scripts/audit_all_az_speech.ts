import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { MULTILINGUAL_STORIES } from '../src/data/parentStoriesData.ts';
import { CHESS_LESSONS } from '../src/data/parentChessData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function md5(str: string): string {
  return crypto.createHash('md5').update(str).digest('hex');
}

function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';
  let text = raw;
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/&amp;/gi, '&');
  text = text.replace(/&lt;/gi, '<');
  text = text.replace(/&gt;/gi, '>');
  text = text.replace(/&quot;/gi, '"');
  text = text.replace(/&#39;/gi, "'");
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/^#+\s+/gm, '');
  text = text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}]/gu, '');
  text = text.replace(/[!]{2,}/g, '!');
  text = text.replace(/[?]{2,}/g, '?');
  text = text.replace(/\.{3,}/g, '…');
  text = text.replace(/^[•\-\*]\s+/gm, '');
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

function tokenizeSentences(paragraphs: string[]): string[] {
  const result: string[] = [];
  paragraphs.forEach((p) => {
    const cleaned = cleanTextForSpeech(p);
    if (!cleaned) return;
    const protectedText = cleaned
      .replace(/\b(məs|və s|sm|km|q|kq|mln|mlrd|səh|ill)\./gi, '$1§DOT§')
      .replace(/(\d+)\.(\d+)/g, '$1§DOT§$2');
    const parts = protectedText.match(/[^.!?…]+[.!?…]+(?=[\s"»'”]|$)|[^.!?…]+$/g) || [protectedText];
    parts.forEach((raw) => {
      const restored = raw.replace(/§DOT§/g, '.').trim();
      if (restored) result.push(restored);
    });
  });
  return result;
}

const cacheDir = path.join(__dirname, '..', 'public', 'assets', 'audio', 'cache');

// 1. Stories
const storySentences: string[] = [];
MULTILINGUAL_STORIES.forEach((story) => {
  const az = story.translations.az;
  if (az && az.paragraphs) {
    const sents = tokenizeSentences(az.paragraphs);
    sents.forEach((s) => storySentences.push(s));
  }
});

// 2. Movements
const movementPhrases = [
  'Otur',
  'Qalx',
  'İrəli get',
  'Qaç',
  'Tullan',
  'Əlini salla',
  'Yerində dön',
  'Dayan',
  'Oturmaq',
  'Durmaq',
  'Qaçmaq',
  'Tullanmaq',
  'Əl sallamaq',
];

// 3. Math Questions
const mathQuestions = [
  'Şəkildə neçə qırmızı alma var?',
  '2 + 1 cəmi neçə edir?',
  'Hansı ədəd daha böyükdür?',
  '4 - 1 fərqi neçə edir?',
  '1, 2, 3 alma var.',
  '2 ulduza 1 ulduz əlavə etsək 3 olar.',
  '5 ədədi 2-dən böyükdür.',
  '4 şardan 1-i uçduqda 3 şar qalır.',
];

// 4. Logic Questions
const logicQuestions = [
  'Hansı əşya digərlərindən fərqlidir?',
  'Qırmızı rəngdə olan meyvə hansıdır?',
  'Hansı heyvan uça bilir?',
  'Qış fəslində nə yağır?',
  'Avtomobil nəqliyyat vasitəsidir, meyvə deyil.',
  'Çiyələk parlaq qırmızı rəngdə olur.',
  'Qaranquş qanadları olan və uçan quşdur.',
  'Qış fəslində soyuq havada ağ qar yağır.',
];

// 5. Chess Lessons
const chessPhrases: string[] = [];
CHESS_LESSONS.forEach((lesson) => {
  if (lesson.theoryVoice?.az) {
    chessPhrases.push(cleanTextForSpeech(lesson.theoryVoice.az));
  }
  if (lesson.exercise?.speechPrompt?.az) {
    chessPhrases.push(cleanTextForSpeech(lesson.exercise.speechPrompt.az));
  }
});

// 6. Praise & Test
const praisePhrases = [
  'Afərin! Çox ağıllı gediş etdin!',
  'Əla! Şahmat taxtasını çox yaxşı öyrənirsən!',
  'Möhtəşəm! Bu qaydanı artıq tam başa düşdün!',
  'Bravo! Sən əsl şahmat ustasısan!',
  'Təbrik edirəm! Bu dərsi uğurla tamamladın!',
  'Salam! Bu gün birlikdə maraqlı bir hekayə oxuyacağıq.',
  'Dovşan meşədə dostlarını axtarmağa başladı.',
  'At şahmat taxtasında L formasında hərəkət edir.',
  'Qırmızı rəngli dairəni seç.',
  'Əhsən!',
  'Çox gözəl!',
  'Möhtəşəmsən!',
];

const allAudited = {
  Stories: storySentences,
  Movements: movementPhrases,
  Math: mathQuestions,
  Logic: logicQuestions,
  Chess: chessPhrases,
  Praise: praisePhrases,
};

console.log('--- AZERBAIJANI AUDIO CACHE AUDIT ---');
let grandTotal = 0;
let grandMissing = 0;

for (const [category, items] of Object.entries(allAudited)) {
  let missing = 0;
  items.forEach((item) => {
    grandTotal++;
    const banuHash = md5(`az-AZ-BanuNeural_${item.slice(0, 1500)}`);
    const file = path.join(cacheDir, `${banuHash}.mp3`);
    if (!fs.existsSync(file)) {
      missing++;
      grandMissing++;
      console.log(`  Missing [${category}]: "${item}" (hash: ${banuHash})`);
    }
  });
  console.log(`${category}: total ${items.length}, missing in cache: ${missing}`);
}

console.log(`GRAND TOTAL: ${grandTotal}, TOTAL MISSING: ${grandMissing}`);
