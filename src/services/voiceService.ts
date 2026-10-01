// src/services/voiceService.ts
// Reusable High-Quality Speech & Narration Engine for Kids Move & Learn
// Powers both Parent Portal ("Valideyn portalı") and Speech Therapist Portal ("Logoped")
// Uses Studio-grade Neural Azerbaijani Voices (az-AZ-BanuNeural & az-AZ-BabekNeural)
// with deliberate browser az-AZ SpeechSynthesis handling.

import type { Language } from '../types';
import { apiUrl } from '../config/api';

export type VoicePersona = 'banu' | 'babek';

export interface SentenceToken {
  text: string;
  paraIdx: number;
  sentIdx: number;
}

export interface SpeechController {
  isPlaying: boolean;
  isPaused: boolean;
  currentParagraph: number;
  currentSentence: number;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  replay: () => void;
}

/**
 * Fast, pure JavaScript MD5 hash matching Node.js crypto.createHash('md5')
 * for deterministic client-side audio cache lookups.
 */
export function md5(string: string): string {
  function rotateLeft(lValue: number, iShiftBits: number): number {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }
  function addUnsigned(lX: number, lY: number): number {
    const lX8 = lX & 0x80000000;
    const lY8 = lY & 0x80000000;
    const lX4 = lX & 0x40000000;
    const lY4 = lY & 0x40000000;
    const lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff);
    if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
    if (lX4 | lY4) {
      if (lResult & 0x40000000) return lResult ^ 0xc0000000 ^ lX8 ^ lY8;
      else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
    } else return lResult ^ lX8 ^ lY8;
  }
  function F(x: number, y: number, z: number) { return (x & y) | (~x & z); }
  function G(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
  function H(x: number, y: number, z: number) { return x ^ y ^ z; }
  function I(x: number, y: number, z: number) { return y ^ (x | ~z); }
  function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
    a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }
  function convertToWordArray(str: string): number[] {
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray = Array(lNumberOfWords - 1);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      const lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    const lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }
  function wordToHex(lValue: number): string {
    let WordToHexValue = '';
    for (let lCount = 0; lCount <= 3; lCount++) {
      const lByte = (lValue >>> (lCount * 8)) & 255;
      const WordToHexValue_temp = '0' + lByte.toString(16);
      WordToHexValue += WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  }
  function utf8Encode(str: string): string {
    return unescape(encodeURIComponent(str));
  }

  const encodedStr = utf8Encode(string);
  const x = convertToWordArray(encodedStr);
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
  const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
  const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
  const S41 = 6, S42 = 10, S43 = 15, S44 = 21;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a, BB = b, CC = c, DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 0xd76aa478);
    d = FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756);
    c = FF(c, d, a, b, x[k + 2], S13, 0x242070db);
    b = FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee);
    a = FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf);
    d = FF(d, a, b, c, x[k + 5], S12, 0x4787c62a);
    c = FF(c, d, a, b, x[k + 6], S13, 0xa8304613);
    b = FF(b, c, d, a, x[k + 7], S14, 0xfd469501);
    a = FF(a, b, c, d, x[k + 8], S11, 0x698098d8);
    d = FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af);
    c = FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1);
    b = FF(b, c, d, a, x[k + 11], S14, 0x895cd7be);
    a = FF(a, b, c, d, x[k + 12], S11, 0x6b901122);
    d = FF(d, a, b, c, x[k + 13], S12, 0xfd987193);
    c = FF(c, d, a, b, x[k + 14], S13, 0xa679438e);
    b = FF(b, c, d, a, x[k + 15], S14, 0x49b40821);

    a = GG(a, b, c, d, x[k + 1], S21, 0xf61e2562);
    d = GG(d, a, b, c, x[k + 6], S22, 0xc040b340);
    c = GG(c, d, a, b, x[k + 11], S23, 0x265e5a51);
    b = GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa);
    a = GG(a, b, c, d, x[k + 5], S21, 0xd62f105d);
    d = GG(d, a, b, c, x[k + 10], S22, 0x02441453);
    c = GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681);
    b = GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8);
    a = GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6);
    d = GG(d, a, b, c, x[k + 14], S22, 0xc33707d6);
    c = GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87);
    b = GG(b, c, d, a, x[k + 8], S24, 0x455a14ed);
    a = GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905);
    d = GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8);
    c = GG(c, d, a, b, x[k + 7], S23, 0x676f02d9);
    b = GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a);

    a = HH(a, b, c, d, x[k + 5], S31, 0xfffa3942);
    d = HH(d, a, b, c, x[k + 8], S32, 0x8771f681);
    c = HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122);
    b = HH(b, c, d, a, x[k + 14], S34, 0xfde5380c);
    a = HH(a, b, c, d, x[k + 1], S31, 0xa4beea44);
    d = HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9);
    c = HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60);
    b = HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70);
    a = HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6);
    d = HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa);
    c = HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085);
    b = HH(b, c, d, a, x[k + 6], S34, 0x04881d05);
    a = HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039);
    d = HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5);
    c = HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8);
    b = HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665);

    a = II(a, b, c, d, x[k + 0], S41, 0xf4292244);
    d = II(d, a, b, c, x[k + 7], S42, 0x432aff97);
    c = II(c, d, a, b, x[k + 14], S43, 0xab9423a7);
    b = II(b, c, d, a, x[k + 5], S44, 0xfc93a039);
    a = II(a, b, c, d, x[k + 12], S41, 0x655b59c3);
    d = II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92);
    c = II(c, d, a, b, x[k + 10], S43, 0xffeff47d);
    b = II(b, c, d, a, x[k + 1], S44, 0x85845dd1);
    a = II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f);
    d = II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0);
    c = II(c, d, a, b, x[k + 6], S43, 0xa3014314);
    b = II(b, c, d, a, x[k + 13], S44, 0x4e0811a1);
    a = II(a, b, c, d, x[k + 4], S41, 0xf7537e82);
    d = II(d, a, b, c, x[k + 11], S42, 0xbd3af235);
    c = II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb);
    b = II(b, c, d, a, x[k + 9], S44, 0xeb86d391);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }
  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

/**
 * Text Preprocessing: Cleans raw text for high-quality, natural speech delivery.
 * Preserves all genuine Azerbaijani characters (ə, Ə, ğ, Ğ, ı, İ, ö, Ö, ü, Ü, ç, Ç, ş, Ş).
 * Strips HTML, Markdown, and non-spoken emojis.
 */
export function cleanTextForSpeech(raw: string): string {
  if (!raw) return '';
  let text = raw;

  // 1. Remove HTML tags and entities
  text = text.replace(/<[^>]*>/g, ' ');
  text = text.replace(/&nbsp;/gi, ' ');
  text = text.replace(/&amp;/gi, '&');
  text = text.replace(/&lt;/gi, '<');
  text = text.replace(/&gt;/gi, '>');
  text = text.replace(/&quot;/gi, '"');
  text = text.replace(/&#39;/gi, "'");

  // 2. Remove Markdown formatting
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/^#+\s+/gm, '');

  // 3. Remove Emojis and visual pictographs so they aren't spoken aloud
  text = text.replace(
    /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}]/gu,
    ''
  );

  // 4. Normalize excessive punctuation
  text = text.replace(/[!]{2,}/g, '!');
  text = text.replace(/[?]{2,}/g, '?');
  text = text.replace(/\.{3,}/g, '…');
  text = text.replace(/^[•\-\*]\s+/gm, '');

  // 5. Clean up multiple whitespaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Sentence Tokenizer: Splits paragraphs into natural sentences
 * while respecting Azerbaijani/Russian/English abbreviations and numbers.
 */
export function tokenizeSentences(paragraphs: string[]): SentenceToken[] {
  const result: SentenceToken[] = [];

  paragraphs.forEach((p, pIdx) => {
    const cleaned = cleanTextForSpeech(p);
    if (!cleaned) return;

    // Protect known abbreviations from being split
    const protectedText = cleaned
      .replace(/\b(məs|və s|sm|km|q|kq|mln|mlrd|səh|ill)\./gi, '$1§DOT§')
      .replace(/(\d+)\.(\d+)/g, '$1§DOT§$2');

    // Split on sentence terminals: . ! ? …
    const parts = protectedText.match(/[^.!?…]+[.!?…]+(?=[\s"»'”]|$)|[^.!?…]+$/g) || [protectedText];

    let sIdx = 0;
    parts.forEach((raw) => {
      const restored = raw.replace(/§DOT§/g, '.').trim();
      if (restored) {
        result.push({
          text: restored,
          paraIdx: pIdx,
          sentIdx: sIdx++,
        });
      }
    });
  });

  return result;
}

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded: boolean = false;
  private audioPlayer: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private heartbeatTimer: any = null;
  private sentenceTimer: any = null;

  // Active voice persona (default: 'banu' - Female teacher/storyteller)
  private persona: VoicePersona = 'banu';

  // Story playlist
  private sentences: SentenceToken[] = [];
  private currentSentenceIndex: number = 0;
  private activeLang: Language = 'az';
  private onSentenceChangeCallback: ((paraIdx: number, sentIdx: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedPersona = localStorage.getItem('parent_voice_persona');
        if (savedPersona === 'banu' || savedPersona === 'babek') {
          this.persona = savedPersona;
        }
      } catch {}

      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
        this.initVoiceDiscovery();
      }
    }
  }

  /**
   * Robust asynchronous voice discovery
   */
  private initVoiceDiscovery(): void {
    if (!this.synth) return;

    const load = () => {
      const list = this.synth?.getVoices() || [];
      if (list.length > 0) {
        this.voices = list;
        this.voicesLoaded = true;
      }
    };

    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = () => load();
    }
    // Backup poll in case onvoiceschanged fires before listener
    setTimeout(load, 200);
    setTimeout(load, 1000);
  }

  /**
   * Set voice persona ('banu' or 'babek')
   */
  public setVoicePersona(persona: VoicePersona): void {
    this.persona = persona;
    try {
      localStorage.setItem('parent_voice_persona', persona);
    } catch {}
  }

  public getVoicePersona(): VoicePersona {
    return this.persona;
  }

  /**
   * Deliberate Voice Selection Strategy.
   * STRICT: Never returns an unrelated foreign voice (Turkish, Russian, English) for Azerbaijani!
   */
  public getBestVoice(lang: Language): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.voices.length > 0 ? this.voices : this.synth.getVoices();
    if (voices.length === 0) return null;

    if (lang === 'az') {
      // 1. Exact match for preferred persona in genuine Azerbaijani voice
      const personaVoice = voices.find((v) => {
        const name = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        const isAz = vLang.startsWith('az') || name.includes('azerbaijan') || name.includes('azərbaycan');
        return isAz && name.includes(this.persona);
      });
      if (personaVoice) return personaVoice;

      // 2. High-quality Microsoft Natural Azerbaijani voices (Banu / Babek)
      const azNatural = voices.find((v) => {
        const name = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        return (
          (vLang.startsWith('az') || name.includes('azerbaijan') || name.includes('azərbaycan')) &&
          (name.includes('natural') || name.includes('online'))
        );
      });
      if (azNatural) return azNatural;

      // 3. Any genuine Azerbaijani browser voice
      const anyAzVoice = voices.find((v) => {
        const name = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        return vLang.startsWith('az') || name.includes('azerbaijan') || name.includes('azərbaycan');
      });
      if (anyAzVoice) return anyAzVoice;

      // STRICT: Return NULL if no real Azerbaijani voice exists!
      // Do NOT fall back to Turkish, Russian or English!
      return null;
    } else if (lang === 'en') {
      // Natural English voices
      const naturalEn = voices.find(
        (v) =>
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Ana') || v.name.includes('Jenny') || v.name.includes('Samantha')) &&
          v.lang.startsWith('en')
      );
      if (naturalEn) return naturalEn;
      const anyEn = voices.find((v) => v.lang.startsWith('en'));
      return anyEn || null;
    } else if (lang === 'ru') {
      // Natural Russian voices
      const naturalRu = voices.find(
        (v) =>
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Svetlana') || v.name.includes('Milena')) &&
          v.lang.startsWith('ru')
      );
      if (naturalRu) return naturalRu;
      const anyRu = voices.find((v) => v.lang.startsWith('ru'));
      return anyRu || null;
    }

    return null;
  }

  /**
   * Check if the browser natively supports Azerbaijani SpeechSynthesis
   */
  public hasNativeAzVoice(): boolean {
    return this.getBestVoice('az') !== null;
  }

  /**
   * Compute deterministic cache hash for audio playback
   */
  public getAudioHash(voiceName: string, text: string): string {
    const safeText = text.slice(0, 1500);
    return md5(`${voiceName}_${safeText}`);
  }

  /**
   * Speak a single prompt, educational instruction, question, or movement command.
   * Universal method used across Parent Portal, Speech Therapist Portal, and Learning modules.
   */
  public speak(
    text: string,
    lang: Language = 'az',
    onEnd?: () => void,
    onError?: () => void
  ): void {
    this.speakQuick(text, lang, onEnd, onError);
  }

  /**
   * Speak a single prompt, educational instruction, question, or movement command.
   * Priority 1: Instant static cache / Neural Studio Audio endpoint (az-AZ-BanuNeural / BabekNeural)
   * Priority 2: Genuine browser az-AZ SpeechSynthesis
   * STRICT: Never uses Turkish or English for Azerbaijani.
   */
  public speakQuick(
    text: string,
    lang: Language = 'az',
    onEnd?: () => void,
    onError?: () => void
  ): void {
    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) {
      onEnd?.();
      return;
    }

    this.stop();

    if (lang === 'az') {
      const voiceName = this.persona === 'babek' ? 'az-AZ-BabekNeural' : 'az-AZ-BanuNeural';
      const hash = this.getAudioHash(voiceName, cleaned);
      const staticCacheUrl = apiUrl(`/assets/audio/cache/${hash}.mp3`);
      const apiTtsUrl = apiUrl(`/api/tts?text=${encodeURIComponent(cleaned)}&voice=${voiceName}`);

      this.isPlaying = true;
      this.isPaused = false;

      // Try static cache first, then API endpoint, then native az-AZ browser voice
      this.playAudioWithFallback(
        staticCacheUrl,
        apiTtsUrl,
        () => {
          this.speakWithBrowserSynth(cleaned, 'az', onEnd, onError);
        },
        () => {
          this.isPlaying = false;
          this.isPaused = false;
          onEnd?.();
        },
        () => {
          this.isPlaying = false;
          this.isPaused = false;
          onError?.();
        }
      );
      return;
    }

    // English or Russian: use Web Speech API or server fallback
    this.speakWithBrowserSynth(cleaned, lang, onEnd, onError);
  }

  private getAudioPlayer(): HTMLAudioElement | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioPlayer) {
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';
    }
    return this.audioPlayer;
  }

  private stopCurrentAudio(): void {
    if (this.audioPlayer) {
      this.audioPlayer.onended = null;
      this.audioPlayer.onerror = null;
      try {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
      } catch {}
      this.audioPlayer.removeAttribute('src');
    }
  }

  private clearSentenceTimer(): void {
    if (this.sentenceTimer) {
      clearTimeout(this.sentenceTimer);
      this.sentenceTimer = null;
    }
  }

  /**
   * Robust Audio player trying primary URL then fallback URL using single persistent player.
   * Eliminates browser autoplay NotAllowedError and stalls on subsequent sentences.
   */
  private playAudioWithFallback(
    primaryUrl: string,
    fallbackUrl: string,
    onAllAudioFailed: () => void,
    onEnd?: () => void,
    onError?: () => void
  ): void {
    this.stopCurrentAudio();
    this.clearSentenceTimer();

    const player = this.getAudioPlayer();
    if (!player) {
      onAllAudioFailed();
      return;
    }

    this.isPlaying = true;
    this.isPaused = false;

    let hasFallbackTriggered = false;
    const triggerFallback = () => {
      if (hasFallbackTriggered) return;
      hasFallbackTriggered = true;

      if (!this.isPlaying) return;

      console.warn('[VoiceService] Primary audio failed, attempting fallback URL:', fallbackUrl);

      player.onended = () => {
        if (this.isPlaying) {
          onEnd?.();
        }
      };

      player.onerror = () => {
        console.warn('[VoiceService] Fallback audio onerror for:', fallbackUrl);
        onAllAudioFailed();
      };

      try {
        player.src = fallbackUrl;
        player.load();
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('[VoiceService] Fallback play() rejected:', err);
            onAllAudioFailed();
          });
        }
      } catch (err) {
        console.warn('[VoiceService] Fallback synchronous error:', err);
        onAllAudioFailed();
      }
    };

    player.onended = () => {
      if (this.isPlaying) {
        onEnd?.();
      }
    };

    player.onerror = () => {
      triggerFallback();
    };

    try {
      player.src = primaryUrl;
      player.load();
      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // ANY play() rejection triggers fallback immediately!
          console.warn('[VoiceService] Primary audio play() rejected:', err);
          triggerFallback();
        });
      }
    } catch (err) {
      console.warn('[VoiceService] Primary audio synchronous error:', err);
      triggerFallback();
    }
  }

  /**
   * Browser SpeechSynthesis execution with strict language verification.
   */
  private speakWithBrowserSynth(
    text: string,
    lang: Language,
    onEnd?: () => void,
    onError?: () => void
  ): void {
    if (!this.synth) {
      onError?.();
      return;
    }

    const voice = this.getBestVoice(lang);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US';
    }

    // Professional Child-Friendly delivery rates
    u.rate = lang === 'az' ? 0.90 : lang === 'ru' ? 0.90 : 0.92;
    u.pitch = lang === 'az' ? (this.persona === 'babek' ? 0.98 : 1.04) : 1.0;
    u.volume = 1.0;

    u.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.stopHeartbeat();
      onEnd?.();
    };

    u.onerror = (e) => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      this.stopHeartbeat();
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        onError?.();
      }
    };

    this.isPlaying = true;
    this.isPaused = false;
    this.currentUtterance = u;
    this.synth.speak(u);
    this.startHeartbeat();
  }

  /**
   * Tokenize story paragraphs into coherent sentences
   */
  public tokenizeSentences(paragraphs: string[]): SentenceToken[] {
    return tokenizeSentences(paragraphs);
  }

  /**
   * Start sequential storytelling with full sentence tracking.
   */
  public startStoryNarrator(
    paragraphs: string[],
    lang: Language,
    onSentenceChange: (paraIdx: number, sentIdx: number) => void,
    onEnd: () => void
  ): void {
    this.stop();

    // Prepare and unlock audio element inside the user interaction event
    const player = this.getAudioPlayer();
    if (player) {
      try {
        player.load();
      } catch {}
    }

    this.sentences = this.tokenizeSentences(paragraphs);
    this.currentSentenceIndex = 0;
    this.activeLang = lang || 'az';
    this.onSentenceChangeCallback = onSentenceChange;
    this.onEndCallback = onEnd;

    if (this.sentences.length === 0) {
      onEnd();
      return;
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.playNextSentence();
  }

  private playNextSentence(): void {
    this.clearSentenceTimer();

    if (!this.isPlaying || this.isPaused) return;

    if (this.currentSentenceIndex >= this.sentences.length) {
      this.stop();
      this.onEndCallback?.();
      return;
    }

    const current = this.sentences[this.currentSentenceIndex];
    this.onSentenceChangeCallback?.(current.paraIdx, current.sentIdx);

    // Azerbaijani: use studio-grade neural audio (cache -> API -> browser az-AZ)
    if (this.activeLang === 'az') {
      const voiceName = this.persona === 'babek' ? 'az-AZ-BabekNeural' : 'az-AZ-BanuNeural';
      const hash = this.getAudioHash(voiceName, current.text);
      const staticCacheUrl = apiUrl(`/assets/audio/cache/${hash}.mp3`);
      const apiTtsUrl = apiUrl(`/api/tts?text=${encodeURIComponent(current.text)}&voice=${voiceName}`);

      this.playAudioWithFallback(
        staticCacheUrl,
        apiTtsUrl,
        () => {
          this.playSentenceWithSynth(current.text);
        },
        () => {
          if (this.isPlaying && !this.isPaused) {
            this.currentSentenceIndex++;
            this.clearSentenceTimer();
            this.sentenceTimer = setTimeout(() => {
              if (this.isPlaying && !this.isPaused) {
                this.playNextSentence();
              }
            }, 250); // Natural breath pause between sentences
          }
        },
        () => {
          if (this.isPlaying && !this.isPaused) {
            this.currentSentenceIndex++;
            this.clearSentenceTimer();
            this.sentenceTimer = setTimeout(() => {
              if (this.isPlaying && !this.isPaused) {
                this.playNextSentence();
              }
            }, 300);
          }
        }
      );
      return;
    }

    // English or Russian: use Web Speech API
    this.playSentenceWithSynth(current.text);
  }

  private playSentenceWithSynth(text: string): void {
    if (!this.synth || !this.isPlaying || this.isPaused) return;

    const voice = this.getBestVoice(this.activeLang);
    const u = new SpeechSynthesisUtterance(text);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = this.activeLang === 'az' ? 'az-AZ' : this.activeLang === 'ru' ? 'ru-RU' : 'en-US';
    }

    u.rate = this.activeLang === 'az' ? 0.90 : 0.92;
    u.pitch = this.activeLang === 'az' ? (this.persona === 'babek' ? 0.98 : 1.04) : 1.0;
    u.volume = 1.0;

    u.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentSentenceIndex++;
        this.clearSentenceTimer();
        this.sentenceTimer = setTimeout(() => {
          if (this.isPlaying && !this.isPaused) {
            this.playNextSentence();
          }
        }, 250);
      }
    };

    u.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        if (this.isPlaying && !this.isPaused) {
          this.currentSentenceIndex++;
          this.clearSentenceTimer();
          this.sentenceTimer = setTimeout(() => {
            if (this.isPlaying && !this.isPaused) {
              this.playNextSentence();
            }
          }, 200);
        }
      }
    };

    this.currentUtterance = u;
    this.synth.speak(u);
    this.startHeartbeat();
  }

  public pause(): void {
    this.isPaused = true;
    this.clearSentenceTimer();
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
      } catch {}
    }
    if (this.synth) {
      this.synth.pause();
    }
    this.stopHeartbeat();
  }

  public resume(): void {
    this.isPaused = false;
    this.clearSentenceTimer();
    if (this.audioPlayer && this.audioPlayer.src && this.audioPlayer.paused) {
      this.audioPlayer.play().catch(() => {});
    } else if (this.sentences.length > 0 && this.currentSentenceIndex < this.sentences.length) {
      this.playNextSentence();
    }
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
    this.startHeartbeat();
  }

  public stop(): void {
    this.clearSentenceTimer();
    this.stopHeartbeat();
    this.stopCurrentAudio();
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentUtterance = null;
    this.sentences = [];
    this.currentSentenceIndex = 0;
  }

  public replay(): void {
    this.stop();
    if (this.sentences.length > 0 && this.onSentenceChangeCallback && this.onEndCallback) {
      this.currentSentenceIndex = 0;
      this.isPlaying = true;
      this.isPaused = false;
      this.playNextSentence();
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSentenceIndex: this.currentSentenceIndex,
      totalSentences: this.sentences.length,
    };
  }

  // Chromium 14-second cutoff watchdog
  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      if (this.synth && this.isPlaying && !this.isPaused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 10000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

export const voiceService = new VoiceService();
export default voiceService;
