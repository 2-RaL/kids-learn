import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../store/gameStore';
import type { Language } from '../../types';
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Trophy,
  Star,
  BookOpen,
  Shield,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const LANG_OPTIONS: { code: Language; flag: string; label: string }[] = [
  { code: 'az', flag: '🇦🇿', label: 'AZ' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, logout, setShowAdminPanel } = useAuthStore();
  const {
    language,
    setLanguage,
    gameMode,
    setGameMode,
    stars,
    level,
    soundEnabled,
    toggleSound,
    isFullscreen,
    toggleFullscreen,
    setShowAchievements,
  } = useGameStore();

  return (
    <header className="w-full flex items-center justify-between px-2 sm:px-6 py-1.5 sm:py-2 z-30 select-none gap-1 sm:gap-2">
      {/* Left: 3D Sun and Clouds matching mockup */}
      <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-lg xs:text-xl sm:text-3xl"
        >
          ☁️
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 10, -5, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl xs:text-3xl sm:text-4xl filter drop-shadow-md"
        >
          ☀️
        </motion.div>
      </div>

      {/* Center: Kids Move & Learn Brand Title */}
      <div className="flex flex-col items-center justify-center text-center px-1 min-w-0">
        <h1
          className="text-base xs:text-xl sm:text-3xl md:text-4xl font-black tracking-wide text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] truncate max-w-[170px] xs:max-w-none"
          style={{ fontFamily: "'Baloo 2', 'Nunito', sans-serif" }}
        >
          Kids Move &amp; Learn
        </h1>
        <p className="text-white text-[10px] xs:text-xs sm:text-sm font-bold tracking-wider drop-shadow-sm hidden xs:block">
          Speak. Move. Learn. Have Fun!
        </p>
      </div>

      {/* Right Action Badges & Toggles */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {/* Stars / Level Badge */}
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-400 text-amber-950 font-black text-xs shadow-md border border-amber-200">
          <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950 flex-shrink-0" />
          <span>{stars > 0 ? stars : 120}</span>
          <span className="text-[10px] bg-amber-500/80 px-1 py-0.5 rounded-md text-white hidden md:inline">
            L{level > 1 ? level : 2}
          </span>
        </div>

        {/* Learn Mode Toggle (Tablet & Desktop) */}
        <button
          onClick={() => setGameMode(gameMode === 'free' ? 'learning' : 'free')}
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl sm:rounded-2xl font-black text-xs transition-all shadow-md cursor-pointer ${
            gameMode === 'learning'
              ? 'bg-purple-600 text-white ring-2 ring-white/50'
              : 'bg-purple-500/80 hover:bg-purple-500 text-white'
          }`}
          title="Öyrənmə rejimi"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Learn</span>
        </button>

        {/* Achievements Modal Trigger */}
        <button
          onClick={() => setShowAchievements(true)}
          className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl sm:rounded-2xl bg-indigo-500/80 hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition cursor-pointer"
          title="Nailiyyətlər"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">Nailiyyətlər</span>
        </button>

        {/* Language Switcher */}
        <div className="flex bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-0.5 border border-white/30">
          {LANG_OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => setLanguage(opt.code)}
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                language === opt.code
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-white hover:text-white/80'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition border border-white/30 cursor-pointer"
          title={soundEnabled ? 'Səsi bağla' : 'Səsi aç'}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" />}
        </button>

        {/* Fullscreen Toggle (Hidden on mobile) */}
        <button
          onClick={toggleFullscreen}
          className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition border border-white/30 hidden md:inline-flex cursor-pointer"
          title="Tam ekran"
        >
          {isFullscreen ? <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>

        {/* Admin Panel Button (only if admin) */}
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowAdminPanel(true)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs shadow-md transition-all border border-amber-300 cursor-pointer"
            title="Admin İdarəetmə Paneli"
          >
            <Shield className="w-3.5 h-3.5 fill-amber-950" />
            <span className="hidden md:inline">Admin</span>
          </button>
        )}

        {/* User Info & Logout Button */}
        {user && (
          <div className="flex items-center gap-0.5 sm:gap-1 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-0.5 sm:p-1 border border-white/30">
            <span className="text-xs font-bold text-white px-1 hidden lg:inline max-w-[80px] truncate">
              {user.displayName}
            </span>
            <button
              onClick={logout}
              className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl hover:bg-rose-500 text-white transition-colors cursor-pointer"
              title="Çıxış"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
