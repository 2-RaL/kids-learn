// src/utils/parentSpeech.ts
// Re-export unified, high-quality VoiceService for full backward compatibility across all Parent Portal components.

import {
  voiceService,
  cleanTextForSpeech,
  tokenizeSentences,
  type VoicePersona,
  type SpeechController,
  type SentenceToken,
} from '../services/voiceService';

export {
  voiceService,
  cleanTextForSpeech,
  tokenizeSentences,
  type VoicePersona,
  type SpeechController,
  type SentenceToken,
};

export const parentSpeech = {
  ...voiceService,
  speak: (text: string, lang: any = 'az', onEnd?: () => void, onError?: () => void) =>
    voiceService.speakQuick(text, lang, onEnd, onError),
  speakQuick: (text: string, lang: any = 'az', onEnd?: () => void, onError?: () => void) =>
    voiceService.speakQuick(text, lang, onEnd, onError),
  stop: () => voiceService.stop(),
  pause: () => voiceService.pause(),
  resume: () => voiceService.resume(),
  startStoryNarrator: (paragraphs: string[], lang: any, onSentenceChange: any, onEnd: any) =>
    voiceService.startStoryNarrator(paragraphs, lang, onSentenceChange, onEnd),
  getVoicePersona: () => voiceService.getVoicePersona(),
  setVoicePersona: (persona: any) => voiceService.setVoicePersona(persona),
  getStatus: () => voiceService.getStatus(),
};
export default parentSpeech;
