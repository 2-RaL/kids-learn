import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Sparkles, CheckCircle2, Clock,
  Filter, Share2, Star, ThumbsUp
} from 'lucide-react';
import { OFFLINE_ACTIVITIES, type OfflineParentActivity } from '../../data/parentOfflineData';
import { useGameStore } from '../../store/gameStore';
import { parentSpeech } from '../../utils/parentSpeech';

export const ParentOfflineActivities: React.FC = () => {
  const { language, addStars } = useGameStore();
  const currentLang = language || 'az';

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kml_offline_completed');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleToggleDone = (id: string) => {
    let next: string[];
    if (completedIds.includes(id)) {
      next = completedIds.filter((item) => item !== id);
    } else {
      next = [...completedIds, id];
      addStars(2);
      parentSpeech.speak('Əhsən sizə! Valideyn və övlad birliyi möhtəşəmdir!', currentLang);
    }
    setCompletedIds(next);
    try {
      localStorage.setItem('kml_offline_completed', JSON.stringify(next));
    } catch {}
  };

  const filtered = OFFLINE_ACTIVITIES.filter((act) => {
    if (selectedFilter === 'all') return true;
    return act.category === selectedFilter;
  });

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-2xl shadow-md shadow-pink-500/20 text-white flex-shrink-0">
            🧸
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-black text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <Heart className="w-3 h-3 text-rose-600 fill-current" />
              <span>Ekrandan Kənar Əyləncə</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Uşağımla oynayıram
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            Tamamlandı: {completedIds.length} / {OFFLINE_ACTIVITIES.length} 🌟
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
        Bu sadə və maraqlı fəaliyyətlər övladınızla ev mühitində ekransız canlı ünsiyyət qurmaq, nitqi inkişaf etdirmək və ailə bağlarını möhkəmləndirmək üçün hazırlanıb.
      </p>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
        {[
          { id: 'all', label: 'Bütün fəaliyyətlər' },
          { id: 'home', label: '🏠 Ev və Əşyalar' },
          { id: 'movement', label: '🏃 Hərəkətli' },
          { id: 'speech', label: '🗣️ Danışıq və Nitq' },
          { id: 'social', label: '🫂 Emosional və Sevgi' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
              selectedFilter === f.id
                ? 'bg-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-100 hover:bg-amber-100/60 text-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const isDone = completedIds.includes(item.id);
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
                  : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-xs'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-black">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                      {item.ageGroup}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.suggestedDuration}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900">
                  {item.titleAz}
                </h3>

                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  {item.instructionAz}
                </p>

                <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-[11px] font-bold text-amber-900">
                  <span className="font-black">İnkişaf faydası:</span> {item.benefitAz}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleDone(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                    isDone
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Birlikdə Etdik! ✓' : 'Etdik! 🌟'}</span>
                </button>

                {isDone && (
                  <span className="text-[11px] font-extrabold text-emerald-700 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    +2 Ulduz qazandınız!
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ParentOfflineActivities;
