import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MULTILINGUAL_STORIES } from '../src/data/parentStoriesData.ts';
import { CHESS_LESSONS } from '../src/data/parentChessData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const allSentences = new Set<string>();

// 1. Stories
MULTILINGUAL_STORIES.forEach((story) => {
  const az = story.translations.az;
  if (az && az.paragraphs) {
    const sents = tokenizeSentences(az.paragraphs);
    sents.forEach((s) => allSentences.add(s));
  }
});

// 2. Chess lesson speech prompts & praise
CHESS_LESSONS.forEach((lesson) => {
  if (lesson.exercise?.speechPrompt?.az) {
    allSentences.add(cleanTextForSpeech(lesson.exercise.speechPrompt.az));
  }
});

// 3. User test sentences & praise
const testPhrases = [
  "Salam! Bu gün birlikdə maraqlı bir hekayə oxuyacağıq.",
  "Şəkildə neçə alma olduğunu saya bilərsən?",
  "Dovşan meşədə dostlarını axtarmağa başladı.",
  "At şahmat taxtasında L formasında hərəkət edir.",
  "Qırmızı rəngli dairəni seç.",
  "Afərin! Çox ağıllı gediş etdin!",
  "Əla! Şahmat taxtasını çox yaxşı öyrənirsən!",
  "Möhtəşəm! Bu qaydanı artıq tam başa düşdün!",
  "Bravo! Sən əsl şahmat ustasısan!",
  "Təbrik edirəm! Bu dərsi uğurla tamamladın!"
];
testPhrases.forEach((p) => allSentences.add(cleanTextForSpeech(p)));

const list = Array.from(allSentences);
console.log(`Exporting ${list.length} unique Azerbaijani educational sentences...`);

const outPath = path.join(__dirname, 'all_az_sentences.json');
fs.writeFileSync(outPath, JSON.stringify(list, null, 2), 'utf-8');
console.log(`Saved to ${outPath}`);
