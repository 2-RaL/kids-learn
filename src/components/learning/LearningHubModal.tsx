import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, Filter, Sparkles, BookOpen, Star,
  CheckCircle2, ArrowRight, Play, Flame, Layers
} from 'lucide-react';
import {
  LEARNING_MODULES,
  LEARNING_GROUPS,
  type LearningModuleCategory,
} from '../../data/learningModulesData';
import LearningActivityPlayer from './LearningActivityPlayer';
import { parentSpeech } from '../../utils/parentSpeech';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';

interface LearningHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string | null;
  onNavigateToExistingSection?: (section: 'stories' | 'videos' | 'movement' | 'logic' | 'math' | 'chess') => void;
}

const AGE_FILTERS = [
  { label: 'Bütün yaşlar', value: null },
  { label: '2–3 yaş', min: 2, max: 3 },
  { label: '3–4 yaş', min: 3, max: 4 },
  { label: '4–5 yaş', min: 4, max: 5 },
  { label: '5–6 yaş', min: 5, max: 6 },
  { label: '6–7 yaş', min: 6, max: 7 },
  { label: '7+ yaş', min: 7, max: 12 },
];

export const LearningHubModal: React.FC<LearningHubModalProps> = ({
  isOpen,
  onClose,
  initialCategory = null,
  onNavigateToExistingSection,
}) => {
  const { parentProfile } = useAuthStore();
  const { language } = useGameStore();
  const currentLang = language || 'az';

  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState<{ min: number; max: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePlayingModule, setActivePlayingModule] = useState<LearningModuleCategory | null>(null);

  useEffect(() => {
    if (isOpen) {
      parentSpeech.stop();
    }
    return () => {
      parentSpeech.stop();
    };
  }, [isOpen]);

  const filteredModules = useMemo(() => {
    return LEARNING_MODULES.filter((mod) => {
      // Group filter
      if (selectedGroup !== 'all' && mod.group !== selectedGroup) {
        return false;
      }

      // Age filter
      if (selectedAgeRange) {
        // Module must overlap with selected age range
        if (mod.minAge > selectedAgeRange.max || mod.maxAge < selectedAgeRange.min) {
          return false;
        }
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle =
          mod.titleAz.toLowerCase().includes(query) ||
          mod.titleEn.toLowerCase().includes(query) ||
          mod.titleRu.toLowerCase().includes(query) ||
          mod.descriptionAz.toLowerCase().includes(query);
        if (!matchTitle) return false;
      }

      return true;
    });
  }, [selectedGroup, selectedAgeRange, searchTerm]);

  const handleLaunchModule = (mod: LearningModuleCategory) => {
    parentSpeech.stop();
    setActivePlayingModule(mod);
  };

  const handleCloseModal = () => {
    parentSpeech.stop();
    setActivePlayingModule(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 select-none animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl w-full max-w-5xl h-[94vh] max-h-[94vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden relative">
          {/* Top Header */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white p-4 sm:p-6 flex-shrink-0 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
                🎓
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  <span>İnkişaf &amp; Öyrənmə Mərkəzi</span>
                </div>
                <h1 className="text-lg sm:text-2xl font-black tracking-tight leading-tight">
                  Təlim Bölmələri
                </h1>
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
              title="Bağla"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="p-3 sm:p-4 bg-amber-50/80 border-b border-amber-200/70 space-y-2.5 flex-shrink-0">
            {/* Search Input & Age Pills */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:w-72 flex-shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Bölmə axtar (məs. Rənglər, Heyvanlar)..."
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-amber-200 text-xs sm:text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
                />
              </div>

              {/* Age Range Pills */}
              <div className="flex items-center gap-1 overflow-x-auto w-full py-0.5 no-scrollbar">
                <span className="text-[11px] font-black text-amber-900 px-2 flex items-center gap-1 flex-shrink-0">
                  <Filter className="w-3 h-3 text-amber-700" />
                  <span>Yaş:</span>
                </span>
                {AGE_FILTERS.map((f, i) => {
                  const isSelected =
                    (!selectedAgeRange && f.value === null) ||
                    (selectedAgeRange && f.min === selectedAgeRange.min && f.max === selectedAgeRange.max);
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedAgeRange(f.value === null ? null : { min: f.min!, max: f.max! })}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
                          : 'bg-white text-slate-600 hover:bg-amber-100/60 border border-amber-200/50'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Groups Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar border-t border-amber-100 pt-2">
              {LEARNING_GROUPS.map((grp) => {
                const isSelected = selectedGroup === grp.id;
                const label =
                  currentLang === 'en' ? grp.labelEn : currentLang === 'ru' ? grp.labelRu : grp.labelAz;
                return (
                  <button
                    key={grp.id}
                    onClick={() => setSelectedGroup(grp.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer flex-shrink-0 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-amber-100/70 border border-slate-200/70'
                    }`}
                  >
                    <span>{grp.emoji}</span>
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modules Grid */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {filteredModules.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-5xl">🔍</span>
                <h3 className="text-base font-black text-slate-700">Axtarışa uyğun bölmə tapılmadı</h3>
                <p className="text-xs text-slate-500 font-bold">
                  Zəhmət olmasa axtarış sözünü və ya yaş filtrini dəyişin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {filteredModules.map((mod) => {
                  const title =
                    currentLang === 'en' ? mod.titleEn : currentLang === 'ru' ? mod.titleRu : mod.titleAz;
                  return (
                    <motion.div
                      key={mod.id}
                      whileHover={{ y: -3, scale: 1.01 }}
                      onClick={() => handleLaunchModule(mod)}
                      className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${mod.color} text-white flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform`}
                          >
                            {mod.emoji}
                          </div>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                            {mod.minAge}–{mod.maxAge} yaş
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors mb-1 line-clamp-1">
                          {title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                          {mod.descriptionAz}
                        </p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                        <span className="text-[11px] font-extrabold">
                          {mod.activities.length} interaktiv fəaliyyət
                        </span>
                        <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Başla</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 bg-slate-50 border-t border-slate-200 flex-shrink-0 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 font-bold px-5">
            <span>Cəmi {filteredModules.length} təlim bölməsi aktivdir</span>
            <button
              onClick={handleCloseModal}
              className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold cursor-pointer"
            >
              Bağla
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Activity Player Modal when a module is launched */}
      {activePlayingModule && (
        <LearningActivityPlayer
          module={activePlayingModule}
          onClose={() => setActivePlayingModule(null)}
        />
      )}
    </>
  );
};

export default LearningHubModal;
