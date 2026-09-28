import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Moon, Sun, Play, Pause, Square, RotateCcw,
  Volume2, VolumeX, Search, Clock, Sparkles, X, ChevronRight,
  Bookmark, CheckCircle2, Globe
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { MULTILINGUAL_STORIES, type MultilingualStory } from '../../data/parentStoriesData';
import { parentSpeech, type VoicePersona } from '../../utils/parentSpeech';

interface ParentStoriesProps {
  selectedAge?: number | null;
}

export const ParentStories: React.FC<ParentStoriesProps> = ({ selectedAge }) => {
  const { language } = useGameStore();

  const [activeStory, setActiveStory] = useState<MultilingualStory | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'bedtime' | 'daytime'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isCozyNight, setIsCozyNight] = useState(false);
  const [voicePersona, setVoicePersona] = useState<VoicePersona>(parentSpeech.getVoicePersona());

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
  }, [language]);

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
    ? activeStory.translations[language] || activeStory.translations.az
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
      language,
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
  const filteredStories = MULTILINGUAL_STORIES.filter((story) => {
    if (selectedAge && (selectedAge < story.min_age || selectedAge > story.max_age)) {
      return false;
    }
    if (filterType === 'bedtime' && !story.is_bedtime) return false;
    if (filterType === 'daytime' && story.is_bedtime) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const tr = story.translations[language] || story.translations.az;
      const titleMatch = tr.title.toLowerCase().includes(q);
      const descMatch = tr.short_description.toLowerCase().includes(q);
      return titleMatch || descMatch;
    }
    return true;
  });

  // UI labels based on active language
  const labels = {
    az: {
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
    },
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
    },
  }[language];

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
              {labels.all} ({MULTILINGUAL_STORIES.length})
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
            const tr = story.translations[language] || story.translations.az;
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
                  ? 'bg-slate-900 text-slate-100 border border-indigo-950'
                  : 'bg-amber-50/98 text-slate-800 border border-amber-200'
              }`}
            >
              {/* Reader Top Controls */}
              <div
                className={`p-4 sm:p-5 flex items-center justify-between border-b gap-3 ${
                  isCozyNight ? 'border-slate-800 bg-slate-900/90' : 'border-amber-200/80 bg-white/80'
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-3xl flex-shrink-0">{activeStory.cover_emoji}</span>
                  <div className="overflow-hidden">
                    <h3 className="text-base sm:text-lg font-black leading-tight truncate">
                      {currentTranslation.title}
                    </h3>
                    <p
                      className={`text-[11px] font-semibold ${
                        isCozyNight ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {activeStory.min_age}-{activeStory.max_age} {labels.age} • ~
                      {activeStory.reading_duration_minutes} {labels.min} • 3-Language Narration
                    </p>
                  </div>
                </div>

                {/* Right utility buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Font size zoom */}
                  <div
                    className={`flex items-center rounded-xl p-0.5 ${
                      isCozyNight ? 'bg-slate-800' : 'bg-white shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => setFontSize((prev) => Math.max(15, prev - 2))}
                      className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-800 cursor-pointer"
                      title="A-"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize((prev) => Math.min(26, prev + 2))}
                      className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-800 cursor-pointer"
                      title="A+"
                    >
                      A+
                    </button>
                  </div>

                  {/* Cozy night toggle */}
                  <button
                    onClick={() => setIsCozyNight(!isCozyNight)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isCozyNight
                        ? 'bg-indigo-900/60 text-amber-300'
                        : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'
                    }`}
                    title={isCozyNight ? 'Gündüz' : 'Gecə'}
                  >
                    {isCozyNight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </button>

                  {/* Close */}
                  <button
                    onClick={handleCloseStory}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isCozyNight
                        ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                        : 'hover:bg-amber-100 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Dedicated Multilingual Narration Player Bar */}
              <div
                className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
                  isCozyNight
                    ? 'bg-indigo-950/60 border-slate-800'
                    : 'bg-amber-100/60 border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Play / Pause Toggle Button */}
                  {audioState === 'playing' ? (
                    <button
                      onClick={handlePauseAudio}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer animate-pulse"
                    >
                      <Pause className="w-3.5 h-3.5" />
                      <span>{labels.pause}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePlayAudio}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{audioState === 'paused' ? labels.resume : labels.play}</span>
                    </button>
                  )}

                  {/* Stop Button */}
                  {audioState !== 'idle' && (
                    <button
                      onClick={handleStopAudio}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCozyNight
                          ? 'bg-slate-800 text-slate-300 hover:text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
                      }`}
                      title={labels.stop}
                    >
                      <Square className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Replay Button */}
                  <button
                    onClick={handleReplayAudio}
                    className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCozyNight
                        ? 'bg-slate-800 text-slate-300 hover:text-white'
                        : 'bg-white text-slate-700 hover:bg-slate-50 shadow-sm'
                    }`}
                    title={labels.replay}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Voice persona & Language indicator */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Voice Persona Switcher for Azerbaijani */}
                  {language === 'az' && (
                    <div className="flex items-center gap-1 bg-white/90 p-0.5 rounded-xl border border-amber-200 shadow-xs">
                      <span className="text-[10px] font-black text-slate-400 px-1 hidden sm:inline">Səs:</span>
                      <button
                        onClick={() => {
                          parentSpeech.setVoicePersona('banu');
                          setVoicePersona('banu');
                          if (audioState === 'playing') handleStopAudio();
                        }}
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          voicePersona === 'banu'
                            ? 'bg-amber-400 text-slate-900 shadow-xs font-black'
                            : 'text-slate-600 hover:bg-amber-50'
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
                        className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          voicePersona === 'babek'
                            ? 'bg-amber-400 text-slate-900 shadow-xs font-black'
                            : 'text-slate-600 hover:bg-amber-50'
                        }`}
                        title="Babək bəy (Cəsur Bələdçi / Kişi səsi)"
                      >
                        👨 Babək
                      </button>
                    </div>
                  )}

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                      isCozyNight
                        ? 'bg-indigo-900/60 text-indigo-300'
                        : 'bg-white text-amber-800 shadow-sm'
                    }`}
                  >
                    <Globe className="w-3 h-3 text-amber-500" />
                    <span>
                      {language === 'az'
                        ? '🇦🇿 Azərbaycan dili'
                        : language === 'ru'
                        ? '🇷🇺 Русский язык'
                        : '🇬🇧 English'}
                    </span>
                  </span>

                  {audioState === 'playing' && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Səsləndirilir...</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Reader Body with Sentence Highlighting */}
              <div
                className="flex-1 p-6 sm:p-8 overflow-y-auto leading-relaxed select-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className="max-w-2xl mx-auto space-y-6 font-serif">
                  {currentTranslation.paragraphs.map((paragraph, pIdx) => {
                    const isParaActive = activeParagraphIndex === pIdx;
                    // Split into sentences for highlighting
                    const sentences = paragraph.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [paragraph];

                    return (
                      <p
                        key={pIdx}
                        ref={(el) => (paragraphRefs.current[pIdx] = el)}
                        className={`indent-4 leading-loose transition-all duration-200 rounded-2xl p-2 ${
                          isParaActive && audioState === 'playing'
                            ? isCozyNight
                              ? 'bg-indigo-950/40 ring-1 ring-indigo-800'
                              : 'bg-amber-100/40 ring-1 ring-amber-300'
                            : ''
                        }`}
                      >
                        {sentences.map((sent, sIdx) => {
                          const isSentActive = isParaActive && activeSentenceIndex === sIdx;
                          return (
                            <span
                              key={sIdx}
                              className={`transition-colors duration-150 ${
                                isSentActive && audioState === 'playing'
                                  ? isCozyNight
                                    ? 'bg-amber-400 text-slate-900 rounded px-1 font-bold shadow-sm'
                                    : 'bg-amber-300 text-slate-900 rounded px-1 font-bold shadow-sm'
                                  : ''
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
                    : 'border-amber-200 bg-amber-100/50 text-amber-800'
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
