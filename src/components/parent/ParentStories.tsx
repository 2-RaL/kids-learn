import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Moon, Sun, Play, Pause, Square, RotateCcw,
  Volume2, VolumeX, Search, Clock, Sparkles, X, ChevronRight,
  Bookmark, CheckCircle2, Globe
} from 'lucide-react';
import type { Language } from '../../types';
import { useGameStore } from '../../store/gameStore';
import { useAuthStore } from '../../store/authStore';
import { apiUrl } from '../../config/api';
import { MULTILINGUAL_STORIES, type MultilingualStory } from '../../data/parentStoriesData';
import { parentSpeech, type VoicePersona } from '../../utils/parentSpeech';

interface ParentStoriesProps {
  selectedAge?: number | null;
}

export const ParentStories: React.FC<ParentStoriesProps> = ({ selectedAge }) => {
  const { language, setLanguage } = useGameStore();
  const currentLang: Language = (language as Language) || 'az';
  const { token } = useAuthStore();

  const [stories, setStories] = useState<MultilingualStory[]>(MULTILINGUAL_STORIES);
  const [activeStory, setActiveStory] = useState<MultilingualStory | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'bedtime' | 'daytime'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isCozyNight, setIsCozyNight] = useState(false);
  const [voicePersona, setVoicePersona] = useState<VoicePersona>(parentSpeech.getVoicePersona());

  // Fetch stories from database to sync with Admin Panel additions/updates
  useEffect(() => {
    fetchStories();
  }, [selectedAge, token]);

  const fetchStories = async () => {
    if (!token) return;
    try {
      let url = apiUrl('/api/parent/stories');
      if (selectedAge) {
        url += `?age=${selectedAge}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.stories && data.stories.length > 0) {
          const mapped: MultilingualStory[] = data.stories.map((s: any) => {
            let parsedTr: any = null;
            if (s.translations) {
              try {
                parsedTr = typeof s.translations === 'string' ? JSON.parse(s.translations) : s.translations;
              } catch (e) {
                parsedTr = null;
              }
            }

            const rawParagraphs = s.full_story
              ? s.full_story.split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean)
              : [s.short_description || s.title];

            const translations = parsedTr || {
              az: {
                title: s.title,
                short_description: s.short_description || '',
                paragraphs: rawParagraphs,
              },
              en: {
                title: s.title,
                short_description: s.short_description || '',
                paragraphs: rawParagraphs,
              },
              ru: {
                title: s.title,
                short_description: s.short_description || '',
                paragraphs: rawParagraphs,
              },
            };

            return {
              id: s.id,
              min_age: s.min_age || 3,
              max_age: s.max_age || 12,
              is_bedtime: Boolean(s.is_bedtime),
              category: s.is_bedtime ? 'bedtime' : 'daytime',
              reading_duration_minutes: s.reading_duration_minutes || 5,
              cover_emoji: s.cover_emoji || (s.is_bedtime ? '🌙' : '📖'),
              translations,
            };
          });
          setStories(mapped);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch stories from API, using fallback:', err);
    }
  };

  // Audio Playback State
  const [audioState, setAudioState] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number>(-1);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number>(-1);

  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Stop narration on unmount or story close
  useEffect(() => {
    return () => {
      parentSpeech.stop();
    };
  }, []);

  // When portal language changes while reading, update narration text if playing
  useEffect(() => {
    if (activeStory && audioState === 'playing') {
      handleStopAudio();
    }
  }, [currentLang]);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    if (audioState === 'playing') {
      handleStopAudio();
    }
  };

  const handleOpenStory = (story: MultilingualStory) => {
    parentSpeech.stop();
    setAudioState('idle');
    setActiveParagraphIndex(-1);
    setActiveSentenceIndex(-1);
    setActiveStory(story);
    setIsCozyNight(story.is_bedtime);
  };

  const handleCloseStory = () => {
    parentSpeech.stop();
    setAudioState('idle');
    setActiveParagraphIndex(-1);
    setActiveSentenceIndex(-1);
    setActiveStory(null);
  };

  const currentTranslation = activeStory
    ? activeStory.translations[currentLang] || activeStory.translations.az
    : null;

  // ── Narration Controls ──────────────────────────────────────────────

  const handlePlayAudio = () => {
    if (!currentTranslation) return;

    if (audioState === 'paused') {
      parentSpeech.resume();
      setAudioState('playing');
      return;
    }

    setAudioState('playing');
    parentSpeech.startStoryNarrator(
      currentTranslation.paragraphs,
      currentLang,
      (paraIdx, sentIdx) => {
        setActiveParagraphIndex(paraIdx);
        setActiveSentenceIndex(sentIdx);
        // Scroll paragraph into view smoothly if needed
        if (paragraphRefs.current[paraIdx]) {
          paragraphRefs.current[paraIdx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      },
      () => {
        setAudioState('idle');
        setActiveParagraphIndex(-1);
        setActiveSentenceIndex(-1);
      }
    );
  };

  const handlePauseAudio = () => {
    parentSpeech.pause();
    setAudioState('paused');
  };

  const handleStopAudio = () => {
    parentSpeech.stop();
    setAudioState('idle');
    setActiveParagraphIndex(-1);
    setActiveSentenceIndex(-1);
  };

  const handleReplayAudio = () => {
    parentSpeech.stop();
    handlePlayAudio();
  };

  // Filter stories by age, category and search term
  const filteredStories = stories.filter((story) => {
    if (selectedAge && (selectedAge < story.min_age || selectedAge > story.max_age)) {
      return false;
    }
    if (filterType === 'bedtime' && !story.is_bedtime) return false;
    if (filterType === 'daytime' && story.is_bedtime) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const tr = story.translations[currentLang] || story.translations.az;
      const titleMatch = tr?.title?.toLowerCase().includes(q);
      const descMatch = tr?.short_description?.toLowerCase().includes(q);
      return Boolean(titleMatch || descMatch);
    }
    return true;
  });

  // UI labels based on active language
  const defaultLabels = {
    heading: 'Nağıllar və Hekayələr',
    subheading: 'Hər yaş qrupu üçün 3 dildə zəngin və səsli nağıl xəzinəsi',
    all: 'Hamısı',
    bedtime: 'Gecə Nağılları',
    daytime: 'Gündüz Hekayələri',
    searchPlaceholder: 'Hekayə axtar...',
    min: 'dəq',
    read: 'Oxu və Dinlə',
    play: 'Dinlə',
    pause: 'Fasilə',
    resume: 'Davam et',
    stop: 'Dayandır',
    replay: 'Yenidən dinlə',
    endMessage: '✨ Nağılın sonu. Xoş xəyallar və şirin yuxular!',
    notFound: 'Bu seçim üçün hekayə tapılmadı',
    age: 'yaş',
    nightMode: 'Gecə rejimi',
    dayMode: 'Gündüz rejimi',
    switchToNight: 'Gecə rejiminə keç (Night mode)',
    switchToDay: 'Gündüz rejiminə keç (Light mode)',
    narrationBadge: '3 dildə səsli oxu',
    voiceLabel: 'Səs:',
    speaking: 'Səsləndirilir...',
  };

  const labels = {
    az: defaultLabels,
    en: {
      heading: 'Stories and Fairy Tales',
      subheading: 'Rich audio-narrated stories in 3 languages for all age groups',
      all: 'All',
      bedtime: 'Bedtime Stories',
      daytime: 'Daytime Stories',
      searchPlaceholder: 'Search stories...',
      min: 'min',
      read: 'Read & Listen',
      play: 'Listen',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop',
      replay: 'Replay',
      endMessage: '✨ The end of the story. Sweet dreams and happy thoughts!',
      notFound: 'No stories found for this selection',
      age: 'years',
      nightMode: 'Night Mode',
      dayMode: 'Day Mode',
      switchToNight: 'Switch to Night mode',
      switchToDay: 'Switch to Day mode',
      narrationBadge: '3-Language Narration',
      voiceLabel: 'Voice:',
      speaking: 'Playing...',
    },
    ru: {
      heading: 'Сказки и Истории',
      subheading: 'Увлекательные озвученные сказки на трёх языках для всех возрастов',
      all: 'Все',
      bedtime: 'Сказки на ночь',
      daytime: 'Дневные истории',
      searchPlaceholder: 'Поиск историй...',
      min: 'мин',
      read: 'Читать и слушать',
      play: 'Слушать',
      pause: 'Пауза',
      resume: 'Продолжить',
      stop: 'Стоп',
      replay: 'Сначала',
      endMessage: '✨ Конец сказки. Добрых снов и прекрасных мечтаний!',
      notFound: 'Истории по данному запросу не найдены',
      age: 'лет',
      nightMode: 'Ночной режим',
      dayMode: 'Дневной режим',
      switchToNight: 'Перейти в ночной режим',
      switchToDay: 'Перейти в дневной режим',
      narrationBadge: 'Озвучка на 3 языках',
      voiceLabel: 'Голос:',
      speaking: 'Озвучивается...',
    },
  }[currentLang] || defaultLabels;

  return (
    <div className="space-y-6">
      {/* Top Header & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            {labels.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            {labels.subheading}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {labels.all} ({stories.length})
            </button>
            <button
              onClick={() => setFilterType('bedtime')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'bedtime'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>{labels.bedtime}</span>
            </button>
            <button
              onClick={() => setFilterType('daytime')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'daytime'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-white" />
              <span>{labels.daytime}</span>
            </button>
          </div>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 border-none"
            />
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="bg-white/60 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-base font-extrabold text-slate-700">{labels.notFound}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStories.map((story) => {
            const tr = story.translations[currentLang] || story.translations.az;
            return (
              <motion.div
                key={story.id}
                whileHover={{ y: -4 }}
                onClick={() => handleOpenStory(story)}
                className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Badges bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                        story.is_bedtime
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {story.is_bedtime ? (
                        <Moon className="w-3 h-3 text-indigo-600" />
                      ) : (
                        <Sun className="w-3 h-3 text-amber-600" />
                      )}
                      <span>{story.is_bedtime ? labels.bedtime : labels.daytime}</span>
                    </span>

                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>~{story.reading_duration_minutes} {labels.min}</span>
                    </span>
                  </div>

                  {/* Title & Preview */}
                  <div className="flex items-start gap-2.5 mb-2">
                    <span className="text-2xl flex-shrink-0">{story.cover_emoji}</span>
                    <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors leading-snug">
                      {tr.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                    {tr.short_description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-amber-600">
                  <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-lg text-[11px]">
                    {story.min_age}-{story.max_age} {labels.age}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{labels.read}</span>
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Reader Modal */}
      <AnimatePresence>
        {activeStory && currentTranslation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-3xl w-full rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transition-colors duration-300 ${
                isCozyNight
                  ? 'bg-slate-950 text-slate-100 border border-indigo-950 shadow-indigo-950/50'
                  : 'bg-amber-50/95 text-slate-900 border border-amber-300/80 shadow-amber-900/20'
              }`}
            >
              {/* Reader Top Controls */}
              <div
                className={`p-4 sm:p-5 flex items-center justify-between border-b gap-3 ${
                  isCozyNight ? 'border-slate-800 bg-slate-900/95' : 'border-amber-200 bg-white/95'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-3xl flex-shrink-0">{activeStory.cover_emoji}</span>
                  <div className="overflow-hidden">
                    <h3 className={`text-base sm:text-lg font-black leading-tight truncate ${
                      isCozyNight ? 'text-white' : 'text-slate-900'
                    }`}>
                      {currentTranslation.title}
                    </h3>
                    <p
                      className={`text-[11px] font-semibold flex items-center gap-1.5 flex-wrap ${
                        isCozyNight ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      <span>{activeStory.min_age}-{activeStory.max_age} {labels.age}</span>
                      <span>•</span>
                      <span>~{activeStory.reading_duration_minutes} {labels.min}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                        <Sparkles className="w-3 h-3" />
                        {labels.narrationBadge}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right utility buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Font size zoom */}
                  <div
                    className={`flex items-center rounded-xl p-0.5 border ${
                      isCozyNight ? 'bg-slate-800 border-slate-700' : 'bg-white border-amber-200 shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setFontSize((prev) => Math.max(15, prev - 2))}
                      className={`px-2 py-1 text-xs font-black transition-colors cursor-pointer ${
                        isCozyNight ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                      title="Şrifti kiçilt (A-)"
                    >
                      A-
                    </button>
                    <span className={`text-[10px] font-bold px-1 ${
                      isCozyNight ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                      {fontSize}px
                    </span>
                    <button
                      onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
                      className={`px-2 py-1 text-xs font-black transition-colors cursor-pointer ${
                        isCozyNight ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                      }`}
                      title="Şrifti böyüt (A+)"
                    >
                      A+
                    </button>
                  </div>

                  {/* Cozy night / Day mode toggle */}
                  <button
                    onClick={() => setIsCozyNight(!isCozyNight)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black border ${
                      isCozyNight
                        ? 'bg-indigo-950 border-indigo-800 text-amber-300 hover:bg-indigo-900 shadow-sm'
                        : 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/80 shadow-sm'
                    }`}
                    title={isCozyNight ? labels.switchToDay : labels.switchToNight}
                  >
                    {isCozyNight ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                        <span className="hidden sm:inline">{labels.dayMode}</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-indigo-700 fill-indigo-700" />
                        <span className="hidden sm:inline">{labels.nightMode}</span>
                      </>
                    )}
                  </button>

                  {/* Close */}
                  <button
                    onClick={handleCloseStory}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isCozyNight
                        ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                        : 'hover:bg-amber-100 text-slate-500 hover:text-slate-900'
                    }`}
                    title="Bağla"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Dedicated Multilingual Narration Player Bar */}
              <div
                className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
                  isCozyNight
                    ? 'bg-indigo-950/80 border-slate-800'
                    : 'bg-amber-100/70 border-amber-200'
                }`}
              >
                {/* Left: Audio Controls */}
                <div className="flex items-center gap-2">
                  {/* Play / Pause Toggle Button */}
                  {audioState === 'playing' ? (
                    <button
                      onClick={handlePauseAudio}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md transition-all cursor-pointer animate-pulse"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>{labels.pause}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePlayAudio}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{audioState === 'paused' ? labels.resume : labels.play}</span>
                    </button>
                  )}

                  {/* Stop Button */}
                  {audioState !== 'idle' && (
                    <button
                      onClick={handleStopAudio}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isCozyNight
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                          : 'bg-white border-amber-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                      }`}
                      title={labels.stop}
                    >
                      <Square className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Replay Button */}
                  <button
                    onClick={handleReplayAudio}
                    className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isCozyNight
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                        : 'bg-white border-amber-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                    }`}
                    title={labels.replay}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  {audioState === 'playing' && (
                    <span className="flex items-center gap-1.5 text-xs font-black text-emerald-500 animate-pulse ml-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span className="hidden sm:inline">{labels.speaking}</span>
                    </span>
                  )}
                </div>

                {/* Right: Language Switcher & Voice Persona */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Language Selector inside Reader */}
                  <div
                    className={`flex items-center gap-1 p-1 rounded-xl border shadow-xs ${
                      isCozyNight
                        ? 'bg-slate-900 border-indigo-900/80'
                        : 'bg-white/95 border-amber-300/80'
                    }`}
                  >
                    {[
                      { code: 'az' as const, label: 'AZ', flag: '🇦🇿' },
                      { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
                      { code: 'ru' as const, label: 'RU', flag: '🇷🇺' },
                    ].map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                          currentLang === l.code
                            ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                            : isCozyNight
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-700 hover:bg-amber-100/60'
                        }`}
                        title={l.label}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Voice Persona Switcher for Azerbaijani */}
                  {currentLang === 'az' && (
                    <div
                      className={`flex items-center gap-1 p-1 rounded-xl border shadow-xs ${
                        isCozyNight
                          ? 'bg-slate-900 border-indigo-900/80'
                          : 'bg-white/95 border-amber-300/80'
                      }`}
                    >
                      <span className={`text-[10px] font-black px-1 hidden sm:inline ${
                        isCozyNight ? 'text-indigo-300' : 'text-amber-800'
                      }`}>
                        {labels.voiceLabel}
                      </span>
                      <button
                        onClick={() => {
                          parentSpeech.setVoicePersona('banu');
                          setVoicePersona('banu');
                          if (audioState === 'playing') handleStopAudio();
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          voicePersona === 'banu'
                            ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                            : isCozyNight
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-700 hover:bg-amber-100/60'
                        }`}
                        title="Banu xanım (Mehriban Müəllimə / Qadın səsi)"
                      >
                        👩 Banu
                      </button>
                      <button
                        onClick={() => {
                          parentSpeech.setVoicePersona('babek');
                          setVoicePersona('babek');
                          if (audioState === 'playing') handleStopAudio();
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          voicePersona === 'babek'
                            ? 'bg-amber-400 text-slate-950 shadow-xs font-black'
                            : isCozyNight
                              ? 'text-slate-300 hover:bg-slate-800'
                              : 'text-slate-700 hover:bg-amber-100/60'
                        }`}
                        title="Babək bəy (Cəsur Bələdçi / Kişi səsi)"
                      >
                        👨 Babək
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reader Body with Sentence Highlighting on Dark Canvas for Ultra-Crisp Readability */}
              <div
                className={`flex-1 p-4 sm:p-6 sm:px-8 overflow-y-auto leading-relaxed select-text ${
                  isCozyNight ? 'bg-slate-950/90' : 'bg-amber-100/50'
                }`}
                style={{ fontSize: `${fontSize}px` }}
              >
                {/* Dark text background container so letters are 100% sharp and readable in light mode and night mode */}
                <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-slate-900 text-slate-100 shadow-2xl border border-slate-800/90 space-y-6 font-serif">
                  {currentTranslation.paragraphs.map((paragraph, pIdx) => {
                    const isParaActive = activeParagraphIndex === pIdx;
                    // Split into sentences for highlighting
                    const sentences = paragraph.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [paragraph];

                    return (
                      <p
                        key={pIdx}
                        ref={(el) => (paragraphRefs.current[pIdx] = el)}
                        className={`indent-4 leading-loose transition-all duration-200 rounded-2xl p-3 text-slate-100 ${
                          isParaActive && audioState === 'playing'
                            ? 'bg-slate-800/90 ring-1 ring-amber-400/50 shadow-inner'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        {sentences.map((sent, sIdx) => {
                          const isSentActive = isParaActive && activeSentenceIndex === sIdx;
                          return (
                            <span
                              key={sIdx}
                              className={`transition-colors duration-150 ${
                                isSentActive && audioState === 'playing'
                                  ? 'bg-amber-400 text-slate-950 font-black rounded px-1.5 py-0.5 shadow-md inline-block my-0.5'
                                  : 'text-slate-100'
                              }`}
                            >
                              {sent}
                            </span>
                          );
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Reader Bottom bar */}
              <div
                className={`p-3.5 border-t text-center text-xs font-semibold ${
                  isCozyNight
                    ? 'border-slate-800 bg-slate-900 text-slate-400'
                    : 'border-amber-200 bg-amber-100/80 text-amber-900'
                }`}
              >
                {labels.endMessage}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentStories;
