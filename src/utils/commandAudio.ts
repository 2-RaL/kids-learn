import type { CharacterCommand } from '../types';
import type { Language } from '../types';
import { voiceService } from '../services/voiceService';
import { apiUrl } from '../config/api';

/**
 * Play pre-recorded TTS audio for a command in the given language.
 * Uses edge-tts generated MP3 files stored in /assets/audio/{lang}/{gender}/{command}.mp3
 * Coordinated with voiceService to prevent voice collision.
 */

const COMMAND_NAMES: Record<Language, Partial<Record<CharacterCommand, string>>> = {
  az: {
    sit: 'Otur',
    stand: 'Qalx',
    walkForward: 'İrəli get',
    walkBackward: 'Geri get',
    run: 'Qaç',
    jump: 'Tullan',
    wave: 'Əlini salla',
    clap: 'Alqışla',
    dance: 'Rəqs et',
    spin: 'Yerində dön',
    stop: 'Dayan',
    moveLeft: 'Sola get',
    moveRight: 'Sağa get',
    nod: 'Başı salla',
    shakeHead: 'Başı yellə',
    eat: 'Yemək ye',
    drink: 'Su iç',
    sleep: 'Yat',
    read: 'Kitab oxu',
    write: 'Yaz',
    draw: 'Şəkil çək',
    count: 'Say',
    think: 'Düşün',
    sing: 'Mahnı oxu',
    laugh: 'Gül',
    cry: 'Ağla',
    stretch: 'Gəril',
    point: 'Göstər',
    walk: 'Yol ilə get',
    slide: 'Sürüş',
    rideBike: 'Velosiped sür',
    surprised: 'Təəccüblən',
    playInstrument: 'Musiqi aləti çal',
    playToy: 'Oyuncaqla oyna',
    wakeUp: 'Yuxudan oyan',
    bathe: 'Çim',
    wash: 'Əlini yu',
    comb: 'Saçını dara',
    dress: 'Geyin',
    paint: 'Rənglə',
    cut: 'Qayçı ilə kəs',
    talk: 'Danış',
    build: 'Düzəlt',
    hug: 'Qucaqla',
    holdHands: 'Əl-ələ tut',
    help: 'Kömək et',
    openDoor: 'Qapını aç',
    closeDoor: 'Qapını bağla',
    putAway: 'Əşyanı yerinə qoy',
    collect: 'Əşyaları topla',
    clean: 'Təmizlə',
    bring: 'Gətir',
    takeAway: 'Apar',
    carry: 'Daşı',
    pull: 'Dart',
    scatter: 'Dağıt',
    waterPlant: 'Bitkini sula',
    lightMatch: 'Kibrit yandır',
  },
  en: {
    sit: 'Sit',
    stand: 'Stand',
    walkForward: 'Walk forward',
    walkBackward: 'Walk backward',
    run: 'Run',
    jump: 'Jump',
    wave: 'Wave',
    clap: 'Clap',
    dance: 'Dance',
    spin: 'Spin',
    stop: 'Stop',
    moveLeft: 'Move left',
    moveRight: 'Move right',
    nod: 'Nod',
    shakeHead: 'Shake head',
    eat: 'Eat',
    drink: 'Drink',
    sleep: 'Sleep',
    read: 'Read',
    write: 'Write',
    draw: 'Draw',
    count: 'Count',
    think: 'Think',
    sing: 'Sing',
    laugh: 'Laugh',
    cry: 'Cry',
    stretch: 'Stretch',
    point: 'Point',
    walk: 'Walk along',
    slide: 'Slide',
    rideBike: 'Ride bike',
    surprised: 'Be surprised',
    playInstrument: 'Play instrument',
    playToy: 'Play with toy',
    wakeUp: 'Wake up',
    bathe: 'Take a bath',
    wash: 'Wash hands',
    comb: 'Comb hair',
    dress: 'Get dressed',
    paint: 'Color and paint',
    cut: 'Cut with scissors',
    talk: 'Speak',
    build: 'Build and fix',
    hug: 'Give a hug',
    holdHands: 'Hold hands',
    help: 'Help someone',
    openDoor: 'Open door',
    closeDoor: 'Close door',
    putAway: 'Put away',
    collect: 'Collect items',
    clean: 'Clean up',
    bring: 'Bring here',
    takeAway: 'Take away',
    carry: 'Carry',
    pull: 'Pull',
    scatter: 'Scatter',
    waterPlant: 'Water plant',
    lightMatch: 'Light match',
  },
  ru: {
    sit: 'Сидеть',
    stand: 'Встать',
    walkForward: 'Иди вперёд',
    walkBackward: 'Иди назад',
    run: 'Беги',
    jump: 'Прыгай',
    wave: 'Помаши рукой',
    clap: 'Хлопай',
    dance: 'Танцуй',
    spin: 'Крутись',
    stop: 'Стоп',
    moveLeft: 'Влево',
    moveRight: 'Вправо',
    nod: 'Кивни',
    shakeHead: 'Покачай головой',
    eat: 'Кушай',
    drink: 'Пей',
    sleep: 'Спи',
    read: 'Читай',
    write: 'Пиши',
    draw: 'Рисуй',
    count: 'Считай',
    think: 'Думай',
    sing: 'Пой',
    laugh: 'Смейся',
    cry: 'Плачь',
    stretch: 'Потянись',
    point: 'Покажи',
    walk: 'Иди по дороге',
    slide: 'Катайся с горки',
    rideBike: 'Катайся на велосипеде',
    surprised: 'Удивись',
    playInstrument: 'Играй на инструменте',
    playToy: 'Играй с игрушкой',
    wakeUp: 'Просыпайся',
    bathe: 'Принимай душ',
    wash: 'Мой руки',
    comb: 'Расчеши волосы',
    dress: 'Одевайся',
    paint: 'Раскрашивай',
    cut: 'Режь ножницами',
    talk: 'Говори',
    build: 'Мастери',
    hug: 'Обними',
    holdHands: 'Держись за руки',
    help: 'Помоги',
    openDoor: 'Открой дверь',
    closeDoor: 'Закрой дверь',
    putAway: 'Положи на место',
    collect: 'Собери вещи',
    clean: 'Убирай',
    bring: 'Принеси',
    takeAway: 'Унеси',
    carry: 'Неси',
    pull: 'Тяни',
    scatter: 'Разбросай',
    waterPlant: 'Полей цветок',
    lightMatch: 'Зажги спичку',
  },
};

let currentAudio: HTMLAudioElement | null = null;

export function playCommandAudio(
  command: CharacterCommand,
  language: Language,
  gender: 'girl' | 'boy' = 'girl'
): void {
  if (command === 'idle') return;

  try {
    // Stop any ongoing narration from voiceService
    voiceService.stop();

    // Stop any currently playing command audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    const genderAudioPath = apiUrl(`/assets/audio/${language}/${gender}/${command}.mp3`);
    const fallbackAudioPath = apiUrl(`/assets/audio/${language}/${command}.mp3`);

    const audio = new Audio(genderAudioPath);
    audio.volume = 0.9;
    audio.playbackRate = 1.0;

    const playFallbackOrVoice = () => {
      const fallback = new Audio(fallbackAudioPath);
      fallback.volume = 0.9;
      fallback.onended = () => {
        currentAudio = null;
      };
      fallback.onerror = () => {
        currentAudio = null;
        // Ultimate fallback to voiceService
        const phrase = COMMAND_NAMES[language]?.[command];
        if (phrase) {
          voiceService.speakQuick(phrase, language);
        }
      };
      currentAudio = fallback;
      fallback.play().catch(() => {
        currentAudio = null;
        const phrase = COMMAND_NAMES[language]?.[command];
        if (phrase) {
          voiceService.speakQuick(phrase, language);
        }
      });
    };

    audio.onended = () => {
      currentAudio = null;
    };

    audio.onerror = () => {
      playFallbackOrVoice();
    };

    currentAudio = audio;
    audio.play().catch((err) => {
      if (audio.error) {
        playFallbackOrVoice();
      } else {
        console.warn('[CommandAudio] audio.play() rejected:', err);
      }
    });
  } catch (e) {
    console.error('[CommandAudio] error:', e);
  }
}

export function stopCommandAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}
