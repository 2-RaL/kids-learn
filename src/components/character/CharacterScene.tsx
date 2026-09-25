import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { CHARACTERS } from '../../config/characters';
import CharacterAvatar from './CharacterAvatar';
import { RotateCcw, RotateCw, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AnimationSpeed, Difficulty } from '../../types';

export const CharacterScene: React.FC = () => {
  const { t } = useTranslation();
  const {
    selectedCharacter,
    currentCommand,
    animationSpeed,
    setAnimationSpeed,
    difficulty,
    setDifficulty,
    voiceState,
    feedbackMessage,
    feedbackType,
    executeCommand,
    setShowCharacterDrawer,
    setShowRightDrawer,
  } = useGameStore();

  const character = CHARACTERS.find((c) => c.id === selectedCharacter) || CHARACTERS[0];

  const handleReset = () => {
    executeCommand('idle');
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      {/* 3D Main Stage Area */}
      <div className="relative flex-1 min-h-[250px] xs:min-h-[290px] sm:min-h-[350px] md:min-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white/60 bg-gradient-to-b from-sky-300/40 via-sky-200/50 to-indigo-200/40 md:bg-sky-200">
        {/* 3D Pixar Village Background - only on tablet and desktop (md:block) */}
        <img
          src="/assets/scene/village_garden.jpg"
          alt="Village Garden"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none"
          draggable={false}
        />

        {/* Mobile Clean Studio Background (telefonda arxa fon yoxdur, sadəcə studiya işığı və kölgə) */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-sky-400/20 via-sky-300/30 to-blue-400/25 pointer-events-none" />
        <div className="md:hidden absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-8 rounded-full bg-slate-900/15 blur-sm pointer-events-none" />

        {/* Soft Ambient Sunlight Vignette (Desktop/Tablet) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10 pointer-events-none" />

        {/* Stage Top Bar: Character Drawer Trigger (Left), Status Banner (Center), and Voice/Mode (Right) */}
        <div className="absolute top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-none gap-1.5">
          {/* Mobile / Tablet: Left Button to open Character Drawer ("Açılan menyu") */}
          <div className="pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCharacterDrawer(true)}
              className="xl:hidden flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-white/80 backdrop-blur-md transition-all text-xs font-black cursor-pointer select-none active:scale-95"
              title="Personajı dəyiş"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200 flex-shrink-0">
                <img
                  src={character.thumbnail || '/assets/portraits/girl_leyla.jpg'}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-extrabold text-xs">{character.name}</span>
              <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                Dəyiş ▾
              </span>
            </motion.button>
          </div>

          {/* Top Status Banner (e.g. 🔴 Tom dinləyirəm...) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full backdrop-blur-md text-white font-bold text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 shadow-lg border border-white/25 pointer-events-auto ${
              voiceState === 'listening'
                ? 'bg-rose-600/90 ring-4 ring-rose-400/40 animate-pulse'
                : 'bg-black/55'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                voiceState === 'listening' ? 'bg-red-300 animate-ping' : 'bg-rose-500'
              }`}
            />
            <span className="truncate max-w-[130px] xs:max-w-none">
              {voiceState === 'listening'
                ? `${character.name} dinləyirəm...`
                : `${character.name} hazırdır! 🌟`}
            </span>
          </motion.div>

          {/* Mobile / Tablet: Right Button to open Voice & Learning Drawer */}
          <div className="pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowRightDrawer(true)}
              className="lg:hidden flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-lg border border-white/40 backdrop-blur-md transition-all text-xs font-bold cursor-pointer select-none active:scale-95"
              title="Səsli əmr və öyrənmə rejimi"
            >
              <span>🎙️</span>
              <span className="hidden sm:inline">Səs &amp; Rejim</span>
            </motion.button>
          </div>
        </div>

        {/* Center Character on the Stage */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 xs:pb-6 sm:pb-8 md:pb-12 z-10 pointer-events-none">
          <CharacterAvatar character={character} command={currentCommand} speed={animationSpeed} />
        </div>

        {/* Bottom Feedback Badge (e.g. Əmr başa düşüldü! ✅) */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none max-w-[90%]">
          <AnimatePresence>
            {(feedbackMessage || currentCommand !== 'idle') && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-black/80 backdrop-blur-md text-white font-extrabold text-xs sm:text-base flex items-center gap-2 shadow-2xl border border-white/30 truncate"
              >
                <span className="truncate">{feedbackMessage || t('commandUnderstood') || 'Əmr başa düşüldü!'}</span>
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Bar right below the stage */}
      <div className="mt-2 sm:mt-3 py-1.5 sm:py-2 px-2.5 sm:px-4 bg-white/75 backdrop-blur-md rounded-2xl border border-white/60 shadow-md flex items-center justify-between gap-1.5 sm:gap-2.5 text-xs sm:text-sm font-bold text-slate-700 overflow-x-auto no-scrollbar">
        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 transition shadow-sm border border-slate-200 text-slate-700 cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden xs:inline">Sıfırla</span>
          </button>
          <button
            onClick={() => executeCommand('idle')}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 transition shadow-sm border border-slate-200 text-slate-700 cursor-pointer"
            title="Geri al"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden xs:inline">Geri</span>
          </button>
        </div>

        {/* Speed Selector (Sürət: 🐢 Yavaş | 🏃 Normal | 🏃‍♂️ Sürətli) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <span className="text-slate-500 text-[11px] sm:text-xs hidden sm:inline mr-0.5">Sürət:</span>
          <button
            onClick={() => setAnimationSpeed('slow')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              animationSpeed === 'slow'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Yavaş sürət"
          >
            <span>🐢</span>
            <span className="hidden md:inline">Yavaş</span>
          </button>
          <button
            onClick={() => setAnimationSpeed('normal')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              animationSpeed === 'normal'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Normal sürət"
          >
            <span>🏃</span>
            <span className="hidden md:inline">Normal</span>
          </button>
          <button
            onClick={() => setAnimationSpeed('fast')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              animationSpeed === 'fast'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Sürətli"
          >
            <span>🏃‍♂️</span>
            <span className="hidden md:inline">Sürətli</span>
          </button>
        </div>

        {/* Difficulty Selector (Çətinlik: 😊 Asan | 😐 Normal | 🔥 Çətin) */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
          <span className="text-slate-500 text-[11px] sm:text-xs hidden sm:inline mr-0.5">Çətinlik:</span>
          <button
            onClick={() => setDifficulty('easy')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              difficulty === 'easy'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Asan"
          >
            <span>😊</span>
            <span className="hidden md:inline">Asan</span>
          </button>
          <button
            onClick={() => setDifficulty('normal')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              difficulty === 'normal'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Normal"
          >
            <span>😐</span>
            <span className="hidden md:inline">Normal</span>
          </button>
          <button
            onClick={() => setDifficulty('hard')}
            className={`px-2 sm:px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer text-xs ${
              difficulty === 'hard'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-600'
            }`}
            title="Çətin"
          >
            <span>🔥</span>
            <span className="hidden md:inline">Çətin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterScene;
