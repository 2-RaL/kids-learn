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

export const parentSpeech = voiceService;
export default voiceService;
