// src/utils/parentSpeech.ts
// Professional 3-Language Speech & Narration Engine for Parent Portal
// Supports both Neural Studio Voices (az-AZ-BanuNeural / az-AZ-BabekNeural) and Web Speech API

import type { Language } from '../types';
import { apiUrl } from '../config/api';

export type VoicePersona = 'banu' | 'babek';

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
  private activeAudio: HTMLAudioElement | null = null;

  private isPaused: boolean = false;
  private isPlaying: boolean = false;
  private heartbeatTimer: any = null;

  // Active voice persona (default: 'banu' - Female Azerbaijani teacher/storyteller)
  private persona: VoicePersona = 'banu';

  // Active story playlist
  private sentences: { text: string; paraIdx: number; sentIdx: number }[] = [];
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
        if (this.synth.onvoiceschanged !== undefined) {
          this.synth.onvoiceschanged = () => {};
        }
      }
    }
  }

  /**
   * Set voice persona ('banu' for female or 'babek' for male)
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
   * Find best voice for requested language in Web Speech API
   */
  public getBestVoice(lang: Language): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (voices.length === 0) return null;

    if (lang === 'az') {
      // 1. Look for Microsoft Natural Azerbaijani voice matching preferred persona
      const personaVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        return (
          (vLang.startsWith('az') || name.includes('azerbaijan')) &&
          name.includes(this.persona)
        );
      });
      if (personaVoice) return personaVoice;

      // 2. Look for Banu specifically (female natural voice)
      const banuVoice = voices.find(v => {
        const name = v.name.toLowerCase();
        return name.includes('banu') && (v.lang.toLowerCase().startsWith('az') || name.includes('azerbaijan'));
      });
      if (banuVoice) return banuVoice;

      // 3. Look for any genuine Azerbaijani voice
      const anyAzVoice = voices.find(v => v.lang.toLowerCase().startsWith('az') || v.name.toLowerCase().includes('azerbaijan'));
      if (anyAzVoice) return anyAzVoice;

      // 4. Soft female Turkish Natural voice as pleasant phonetic fallback for children
      const trNatural = voices.find(v => (v.name.includes('Emel') || v.name.includes('Natural') || v.name.includes('Google')) && v.lang.toLowerCase().startsWith('tr'));
      if (trNatural) return trNatural;

      const anyTr = voices.find(v => v.lang.toLowerCase().startsWith('tr'));
      if (anyTr) return anyTr;
    } else if (lang === 'en') {
      const naturalEn = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Ana')) && v.lang.startsWith('en'));
      if (naturalEn) return naturalEn;
      const anyEn = voices.find(v => v.lang.startsWith('en'));
      if (anyEn) return anyEn;
    } else if (lang === 'ru') {
      const naturalRu = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Svetlana')) && v.lang.startsWith('ru'));
      if (naturalRu) return naturalRu;
      const anyRu = voices.find(v => v.lang.startsWith('ru'));
      if (anyRu) return anyRu;
    }

    return voices[0] || null;
  }

  /**
   * Speak a short explanation or educational prompt.
   * Prefers studio-grade neural audio endpoint for Azerbaijani.
   */
  public speakQuick(text: string, lang: Language, onEnd?: () => void, onError?: () => void): void {
    if (!text.trim()) {
      onEnd?.();
      return;
    }

    this.stop();

    // Use neural audio endpoint for Azerbaijani for 100% natural native studio voice
    if (lang === 'az') {
      const voiceName = this.persona === 'babek' ? 'az-AZ-BabekNeural' : 'az-AZ-BanuNeural';
      const audioUrl = apiUrl(`/api/tts?text=${encodeURIComponent(text)}&voice=${voiceName}`);

      try {
        const audio = new Audio(audioUrl);
        this.activeAudio = audio;
        this.isPlaying = true;
        this.isPaused = false;

        audio.onended = () => {
          this.isPlaying = false;
          this.isPaused = false;
          this.activeAudio = null;
          onEnd?.();
        };

        audio.onerror = () => {
          // If server TTS fails or offline, fall back to browser SpeechSynthesis
          this.activeAudio = null;
          this.speakWithBrowserSynth(text, lang, onEnd, onError);
        };

        audio.play().catch(() => {
          this.activeAudio = null;
          this.speakWithBrowserSynth(text, lang, onEnd, onError);
        });
        return;
      } catch {
        this.speakWithBrowserSynth(text, lang, onEnd, onError);
        return;
      }
    }

    // English or Russian: use Web Speech API or audio
    this.speakWithBrowserSynth(text, lang, onEnd, onError);
  }

  /**
   * Fallback Web Speech Synthesis
   */
  private speakWithBrowserSynth(text: string, lang: Language, onEnd?: () => void, onError?: () => void): void {
    if (!this.synth) {
      onError?.();
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoice(lang);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = lang === 'az' ? 'az-AZ' : lang === 'ru' ? 'ru-RU' : 'en-US';
    }

    u.rate = 0.88; // Gentle, child-friendly pace
    u.pitch = this.persona === 'babek' ? 0.98 : 1.06; // Banu is warm female, Babek is clear male

    u.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    u.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentUtterance = null;
      onError?.();
    };

    this.isPlaying = true;
    this.isPaused = false;
    this.currentUtterance = u;
    this.synth.speak(u);
    this.startHeartbeat();
  }

  /**
   * Tokenize paragraphs into coherent sentences
   */
  public tokenizeSentences(paragraphs: string[]): { text: string; paraIdx: number; sentIdx: number }[] {
    const list: { text: string; paraIdx: number; sentIdx: number }[] = [];

    paragraphs.forEach((p, pIdx) => {
      if (!p.trim()) return;
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
    if (!this.isPlaying) return;

    if (this.currentSentenceIndex >= this.sentences.length) {
      this.stop();
      this.onEndCallback?.();
      return;
    }

    const current = this.sentences[this.currentSentenceIndex];
    this.onSentenceChangeCallback?.(current.paraIdx, current.sentIdx);

    // If Azerbaijani, use studio-quality Neural Audio stream per sentence
    if (this.activeLang === 'az') {
      const voiceName = this.persona === 'babek' ? 'az-AZ-BabekNeural' : 'az-AZ-BanuNeural';
      const audioUrl = apiUrl(`/api/tts?text=${encodeURIComponent(current.text)}&voice=${voiceName}`);

      try {
        const audio = new Audio(audioUrl);
        this.activeAudio = audio;

        audio.onended = () => {
          if (this.isPlaying && !this.isPaused) {
            this.currentSentenceIndex++;
            setTimeout(() => {
              this.playNextSentence();
            }, 260); // Natural pause between sentences
          }
        };

        audio.onerror = () => {
          this.activeAudio = null;
          this.playSentenceWithSynth(current.text);
        };

        audio.play().catch(() => {
          this.activeAudio = null;
          this.playSentenceWithSynth(current.text);
        });
        return;
      } catch {
        this.playSentenceWithSynth(current.text);
        return;
      }
    }

    this.playSentenceWithSynth(current.text);
  }

  private playSentenceWithSynth(text: string): void {
    if (!this.synth || !this.isPlaying) return;

    const u = new SpeechSynthesisUtterance(text);
    const voice = this.getBestVoice(this.activeLang);
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    } else {
      u.lang = this.activeLang === 'az' ? 'az-AZ' : this.activeLang === 'ru' ? 'ru-RU' : 'en-US';
    }

    u.rate = 0.88;
    u.pitch = this.persona === 'babek' ? 0.98 : 1.06;

    u.onend = () => {
      if (this.isPlaying && !this.isPaused) {
        this.currentSentenceIndex++;
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
    this.isPaused = true;
    if (this.activeAudio) {
      this.activeAudio.pause();
    }
    if (this.synth) {
      this.synth.pause();
    }
    this.stopHeartbeat();
  }

  public resume(): void {
    this.isPaused = false;
    if (this.activeAudio) {
      this.activeAudio.play().catch(() => {});
    }
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
    this.startHeartbeat();
  }

  public stop(): void {
    this.stopHeartbeat();
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
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
