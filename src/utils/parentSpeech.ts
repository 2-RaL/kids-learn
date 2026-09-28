import type { Language } from '../types';

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

class ParentSpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;
  private isPlaying: boolean = false;
  private heartbeatTimer: any = null;

  // Active story playlist
  private sentences: { text: string; paraIdx: number; sentIdx: number }[] = [];
  private currentSentenceIndex: number = 0;
  private activeLang: Language = 'az';
  private onSentenceChangeCallback: ((paraIdx: number, sentIdx: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Preload voices
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {};
      }
    }
  }

  /**
   * Find best voice for requested language
   */
  public getBestVoice(lang: Language): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return null;

    if (lang === 'az') {
      // Look for Azerbaijani first
      const azVoice = voices.find(v => v.lang.toLowerCase().startsWith('az'));
      if (azVoice) return azVoice;
      // High-quality Turkish voice is phonetically closest and sounds very clear for AZ
      const trVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google')) && v.lang.toLowerCase().startsWith('tr'));
      if (trVoice) return trVoice;
      const anyTr = voices.find(v => v.lang.toLowerCase().startsWith('tr'));
      if (anyTr) return anyTr;
    } else if (lang === 'en') {
      // Prefer Google US or Microsoft Natural / Samantha
      const naturalEn = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')) && v.lang.startsWith('en'));
      if (naturalEn) return naturalEn;
      const anyEn = voices.find(v => v.lang.startsWith('en'));
      if (anyEn) return anyEn;
    } else if (lang === 'ru') {
      // Prefer Google or Microsoft Natural Russian
      const naturalRu = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Milena')) && v.lang.startsWith('ru'));
      if (naturalRu) return naturalRu;
      const anyRu = voices.find(v => v.lang.startsWith('ru'));
      if (anyRu) return anyRu;
    }

    return voices[0] || null;
  }

  /**
   * Speak a short explanation or instruction
   */
  public speakQuick(text: string, lang: Language, onEnd?: () => void): void {
    if (!this.synth || !text.trim()) {
      onEnd?.();
      return;
    }

    this.stop();

    const u = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoice(lang);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US';
    }

    u.rate = 0.90; // Pleasant slightly slower child pace
    u.pitch = 1.08; // Friendly warm pitch

    u.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      onEnd?.();
    };
    u.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      onEnd?.();
    };

    this.isPlaying = true;
    this.isPaused = false;
    this.currentUtterance = u;
    this.synth.speak(u);
    this.startHeartbeat();
  }

  /**
   * Split text into coherent child-friendly sentences
   */
  public tokenizeSentences(paragraphs: string[]): { text: string; paraIdx: number; sentIdx: number }[] {
    const list: { text: string; paraIdx: number; sentIdx: number }[] = [];

    paragraphs.forEach((p, pIdx) => {
      if (!p.trim()) return;
      // Split on sentence terminals . ! ? followed by space or end of string
      const rawSentences = p.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [p];
      rawSentences.forEach((s, sIdx) => {
        const trimmed = s.trim();
        if (trimmed) {
          list.push({ text: trimmed, paraIdx: pIdx, sentIdx: sIdx });
        }
      });
    });

    return list;
  }

  /**
   * Start storytelling with full sentence-by-sentence tracking
   */
  public startStoryNarrator(
    paragraphs: string[],
    lang: Language,
    onSentenceChange: (paraIdx: number, sentIdx: number) => void,
    onEnd: () => void
  ): void {
    this.stop();

    this.sentences = this.tokenizeSentences(paragraphs);
    this.currentSentenceIndex = 0;
    this.activeLang = lang;
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
    if (!this.synth || !this.isPlaying) return;

    if (this.currentSentenceIndex >= this.sentences.length) {
      this.stop();
      this.onEndCallback?.();
      return;
    }

    const current = this.sentences[this.currentSentenceIndex];
    this.onSentenceChangeCallback?.(current.paraIdx, current.sentIdx);

    const u = new SpeechSynthesisUtterance(current.text);
    const voice = this.getBestVoice(this.activeLang);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = this.activeLang === 'az' ? 'az-AZ' : this.activeLang === 'ru' ? 'ru-RU' : 'en-US';
    }

    u.rate = 0.88; // Gentle storytelling pace
    u.pitch = 1.05;

    u.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentSentenceIndex++;
        // Natural breath pause between sentences (220ms)
        setTimeout(() => {
          this.playNextSentence();
        }, 220);
      }
    };

    u.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        this.currentSentenceIndex++;
        this.playNextSentence();
      }
    };

    this.currentUtterance = u;
    this.synth.speak(u);
    this.startHeartbeat();
  }

  public pause(): void {
    if (!this.synth || !this.isPlaying) return;
    this.isPaused = true;
    this.synth.pause();
    this.stopHeartbeat();
  }

  public resume(): void {
    if (!this.synth || !this.isPlaying) return;
    this.isPaused = false;
    this.synth.resume();
    this.startHeartbeat();
  }

  public stop(): void {
    this.stopHeartbeat();
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
    };
  }

  // Workaround for Chromium 14-second speech synthesis silence bug
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

export const parentSpeech = new ParentSpeechService();
export default parentSpeech;
