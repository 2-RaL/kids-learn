import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Moon, Sun, Volume2, VolumeX, Search, Clock, Sparkles, X, ChevronRight, Bookmark } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';

interface Story {
  id: number;
  title: string;
  short_description: string;
  full_story: string;
  cover_image: string | null;
  category_id: number;
  category_name?: string;
  category_icon?: string;
  min_age: number;
  max_age: number;
  reading_duration_minutes: number;
  is_bedtime: number | boolean;
}

interface ParentStoriesProps {
  selectedAge?: number | null;
}

export const ParentStories: React.FC<ParentStoriesProps> = ({ selectedAge }) => {
  const { token } = useAuthStore();
  const [stories, setStories] = useState<Story[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'bedtime' | 'daytime'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Reader Modal State
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [fontSize, setFontSize] = useState<number>(18);
  const [isCozyNight, setIsCozyNight] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    fetchStories();
  }, [selectedAge, token]);

  const fetchStories = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      let url = apiUrl('/api/parent/stories');
      if (selectedAge) {
        url += `?age=${selectedAge}`;
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setStories(data.stories || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Fetch stories error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenStory = (story: Story) => {
    setActiveStory(story);
    setIsCozyNight(!!story.is_bedtime);
    stopSpeech();
  };

  const handleCloseStory = () => {
    stopSpeech();
    setActiveStory(null);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window) || !activeStory) return;

    if (isSpeaking) {
      stopSpeech();
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${activeStory.title}. ${activeStory.full_story || activeStory.short_description}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.9; // Friendly slower child pace
      utterance.pitch = 1.1;

      // Try finding az or tr voice
      const voices = window.speechSynthesis.getVoices();
      const matchVoice = voices.find(v => v.lang.startsWith('az') || v.lang.startsWith('tr'));
      if (matchVoice) {
        utterance.voice = matchVoice;
      }

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const filteredStories = stories.filter(story => {
    if (filterType === 'bedtime' && !story.is_bedtime) return false;
    if (filterType === 'daytime' && story.is_bedtime) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = story.title.toLowerCase().includes(q);
      const descMatch = (story.short_description || '').toLowerCase().includes(q);
      return titleMatch || descMatch;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            Nağıllar və Hekayələr
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Uşaqların xəyal dünyasını və lüğət ehtiyatını zənginləşdirən maarifləndirici nağıllar
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hamısı ({stories.length})
            </button>
            <button
              onClick={() => setFilterType('bedtime')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'bedtime' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-300" />
              <span>Gecə</span>
            </button>
            <button
              onClick={() => setFilterType('daytime')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === 'daytime' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-white" />
              <span>Gündüz</span>
            </button>
          </div>

          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Hekayə axtar..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 border-none"
            />
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-bold text-sm">
          Nağıllar yüklənir...
        </div>
      ) : filteredStories.length === 0 ? (
        <div className="bg-white/60 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">📚</div>
          <h3 className="text-base font-extrabold text-slate-700">Heç bir hekayə tapılmadı</h3>
          <p className="text-xs text-slate-500 mt-1">Filtrləri dəyişərək yenidən yoxlayın və ya admin panelindən yeni hekayələr əlavə edin.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -4 }}
              onClick={() => handleOpenStory(story)}
              className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Badges bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    story.is_bedtime ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {story.is_bedtime ? <Moon className="w-3 h-3 text-indigo-600" /> : <Sun className="w-3 h-3 text-amber-600" />}
                    <span>{story.is_bedtime ? 'Gecə nağılı' : 'Gündüz hekayəsi'}</span>
                  </span>

                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>~{story.reading_duration_minutes || 5} dəq</span>
                  </span>
                </div>

                {/* Title & Preview */}
                <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors mb-2">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-4">
                  {story.short_description || (story.full_story ? story.full_story.slice(0, 100) + '...' : '')}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-amber-600">
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[10px]">
                  {story.min_age}-{story.max_age} yaş
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Oxu</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reader Modal */}
      <AnimatePresence>
        {activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-2xl w-full rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transition-colors duration-300 ${
                isCozyNight ? 'bg-slate-900 text-slate-100 border border-indigo-950' : 'bg-amber-50/95 text-slate-800 border border-amber-200'
              }`}
            >
              {/* Reader Top Controls */}
              <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                isCozyNight ? 'border-slate-800 bg-slate-900/80' : 'border-amber-200/80 bg-white/70'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{isCozyNight ? '🌙' : '☀️'}</span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black leading-tight line-clamp-1">
                      {activeStory.title}
                    </h3>
                    <p className={`text-[11px] font-semibold ${isCozyNight ? 'text-slate-400' : 'text-slate-500'}`}>
                      {activeStory.min_age}-{activeStory.max_age} yaş üçün • ~{activeStory.reading_duration_minutes} dəq
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Speech synthesis read aloud */}
                  <button
                    onClick={handleToggleSpeech}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-amber-500 text-white animate-pulse'
                        : isCozyNight
                        ? 'bg-slate-800 text-slate-300 hover:text-white'
                        : 'bg-white text-slate-700 hover:bg-amber-100 shadow-sm'
                    }`}
                    title={isSpeaking ? 'Dayandır' : 'Səsli oxu'}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
                    <span className="hidden sm:inline">{isSpeaking ? 'Dayandır' : 'Səsləndir'}</span>
                  </button>

                  {/* Font size buttons */}
                  <div className={`flex items-center rounded-xl p-0.5 ${isCozyNight ? 'bg-slate-800' : 'bg-white shadow-sm'}`}>
                    <button
                      onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                      className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-800 cursor-pointer"
                      title="Şrifti kiçilt"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setFontSize(prev => Math.min(26, prev + 2))}
                      className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-800 cursor-pointer"
                      title="Şrifti böyüt"
                    >
                      A+
                    </button>
                  </div>

                  {/* Cozy night toggle */}
                  <button
                    onClick={() => setIsCozyNight(!isCozyNight)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isCozyNight ? 'bg-indigo-900/60 text-amber-300' : 'bg-white text-slate-600 shadow-sm hover:bg-slate-100'
                    }`}
                    title={isCozyNight ? 'Gündüz rejimi' : 'Gecə rejimi'}
                  >
                    {isCozyNight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </button>

                  {/* Close */}
                  <button
                    onClick={handleCloseStory}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isCozyNight ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-amber-100 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div
                className="flex-1 p-6 sm:p-8 overflow-y-auto leading-relaxed select-text"
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className="max-w-xl mx-auto space-y-4 font-serif">
                  {(activeStory.full_story || activeStory.short_description || '')
                    .split('\n')
                    .map((paragraph, idx) => paragraph.trim() ? (
                      <p key={idx} className="indent-4 leading-loose">
                        {paragraph}
                      </p>
                    ) : null)}
                </div>
              </div>

              {/* Reader Bottom bar */}
              <div className={`p-4 border-t text-center text-xs font-semibold ${
                isCozyNight ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-amber-200 bg-amber-100/50 text-amber-800'
              }`}>
                ✨ Nağılın sonu. Xoş yuxular və gözəl arzular!
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentStories;
