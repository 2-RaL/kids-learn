import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Video, Activity, Brain, Calculator, Award,
  Settings, LogOut, ArrowLeft, Home, Sparkles, Filter, Menu, X, Smile, Shield
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';
import ParentStories from './ParentStories';
import ParentVideos from './ParentVideos';
import ParentMovement from './ParentMovement';
import ParentLogic from './ParentLogic';
import ParentMath from './ParentMath';
import ParentChess from './ParentChess';
import ParentSettings from './ParentSettings';

type ParentTab = 'dashboard' | 'stories' | 'videos' | 'movement' | 'logic' | 'math' | 'chess' | 'settings';

export const ParentPortal: React.FC = () => {
  const { user, parentProfile, logout, setActivePortal } = useAuthStore();
  const { language, setLanguage } = useGameStore();
  const currentLang = language || 'az';
  const [activeTab, setActiveTab] = useState<ParentTab>('dashboard');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const childDisplayName = parentProfile?.child_name || 'Dostumuz';

  const navLabels = {
    az: {
      dashboard: 'Ana Səhifə',
      stories: 'Hekayələr',
      videos: 'Video Dərslər',
      movement: 'Hərəkətlərlə Öyrən',
      logic: 'Məntiq Oyunları',
      math: 'Riyazi Əməllər',
      chess: 'Şahmat',
      settings: 'Profil və Parametrlər',
      portalTitle: 'Valideyn Portalı',
      yourChild: 'Övladınız:',
      allAges: 'Bütün yaşlar',
      backToPortals: 'Portallara Qayıt',
      logout: 'Çıxış',
      greeting: 'Salam',
      whatToLearn: 'Bu gün nə öyrənmək istəyirsən?',
      age: 'Yaş:',
      all: 'Hamısı'
    },
    en: {
      dashboard: 'Home',
      stories: 'Stories',
      videos: 'Video Lessons',
      movement: 'Move & Learn',
      logic: 'Logic Games',
      math: 'Math Fun',
      chess: 'Chess Academy',
      settings: 'Profile & Settings',
      portalTitle: 'Parent Portal',
      yourChild: 'Your Child:',
      allAges: 'All ages',
      backToPortals: 'Back to Portals',
      logout: 'Log Out',
      greeting: 'Hello',
      whatToLearn: 'What would you like to explore today?',
      age: 'Age:',
      all: 'All'
    },
    ru: {
      dashboard: 'Главная',
      stories: 'Сказки и Истории',
      videos: 'Видеоуроки',
      movement: 'Учимся в Движении',
      logic: 'Игры на Логику',
      math: 'Весёлая Математика',
      chess: 'Шахматная Школа',
      settings: 'Профиль и Настройки',
      portalTitle: 'Портал для Родителей',
      yourChild: 'Ваш ребёнок:',
      allAges: 'Все возрасты',
      backToPortals: 'К порталам',
      logout: 'Выход',
      greeting: 'Привет',
      whatToLearn: 'Что будем изучать сегодня?',
      age: 'Возраст:',
      all: 'Все'
    }
  }[currentLang];

  const navItems = [
    { id: 'dashboard' as ParentTab, label: navLabels.dashboard, icon: Home, emoji: '🏠' },
    { id: 'stories' as ParentTab, label: navLabels.stories, icon: BookOpen, emoji: '📖' },
    { id: 'videos' as ParentTab, label: navLabels.videos, icon: Video, emoji: '🎬' },
    { id: 'movement' as ParentTab, label: navLabels.movement, icon: Activity, emoji: '🏃' },
    { id: 'logic' as ParentTab, label: navLabels.logic, icon: Brain, emoji: '🧠' },
    { id: 'math' as ParentTab, label: navLabels.math, icon: Calculator, emoji: '🔢' },
    { id: 'chess' as ParentTab, label: navLabels.chess, icon: Award, emoji: '♟️' },
    { id: 'settings' as ParentTab, label: navLabels.settings, icon: Settings, emoji: '⚙️' },
  ];

  const dashboardContent = {
    az: {
      heroBadge: 'Övladınızın Sevimli İnkişaf Dünyası',
      heroTitle: 'Xoş gəldiniz, Valideynlər və Balacalar!',
      heroDesc: 'Burada uşaqlar üçün nağıllar, hərəkətli öyrədici videolar, məntiq və riyaziyyat oyunları, eləcə də şahmat dərsləri toplanıb.',
      tag1: '✓ Reklamsız',
      tag2: '✓ Təhlükəsiz Məzmun',
      tag3: '✓ Azərbaycan Dilində',
      explore: 'Bölməyə daxil ol',
      cards: [
        {
          id: 'stories' as ParentTab,
          title: 'Nağıllar və Hekayələr',
          desc: 'Gecə və gündüz üçün maraqlı nağıllar, səsli oxuma imkanı.',
          emoji: '📖',
          color: 'from-amber-500 to-orange-400',
        },
        {
          id: 'videos' as ParentTab,
          title: 'Video ilə Öyrən',
          desc: 'Nitq inkişafı və fiziki hərəkət videoları.',
          emoji: '🎬',
          color: 'from-sky-500 to-cyan-400',
        },
        {
          id: 'movement' as ParentTab,
          title: 'Hərəkətlərlə Öyrən',
          desc: 'Dovşan və digər dostlarla hərəkət komandaları və əyləncə.',
          emoji: '🏃',
          color: 'from-emerald-500 to-teal-400',
        },
        {
          id: 'logic' as ParentTab,
          title: 'Məntiq Oyunları',
          desc: 'Rənglər, fərqlər və uşaqlar üçün əyləncəli tapmacalar.',
          emoji: '🧠',
          color: 'from-purple-500 to-indigo-400',
        },
        {
          id: 'math' as ParentTab,
          title: 'Riyazi Əməllər',
          desc: 'Almalar, ulduzlar və əyləncəli sayma dərsləri.',
          emoji: '🔢',
          color: 'from-pink-500 to-rose-400',
        },
        {
          id: 'chess' as ParentTab,
          title: 'Uşaqlar üçün Şahmat',
          desc: 'Şahmat fiqurları və onların hərəkət qaydaları.',
          emoji: '♟️',
          color: 'from-slate-700 to-slate-900',
        },
      ],
    },
    en: {
      heroBadge: "Your Child's Favorite Learning World",
      heroTitle: 'Welcome, Parents and Little Explorers!',
      heroDesc: 'Fairy tales, active movement videos, interactive logic & math challenges, and chess academy lessons for children.',
      tag1: '✓ Ad-Free',
      tag2: '✓ Safe Content',
      tag3: '✓ In English',
      explore: 'Open Section',
      cards: [
        {
          id: 'stories' as ParentTab,
          title: 'Stories & Tales',
          desc: 'Bedtime and daytime stories with interactive voice narration.',
          emoji: '📖',
          color: 'from-amber-500 to-orange-400',
        },
        {
          id: 'videos' as ParentTab,
          title: 'Learn with Video',
          desc: 'Speech development, language skills, and active exercise videos.',
          emoji: '🎬',
          color: 'from-sky-500 to-cyan-400',
        },
        {
          id: 'movement' as ParentTab,
          title: 'Move & Learn',
          desc: 'Physical movement commands and exercises with fun character friends.',
          emoji: '🏃',
          color: 'from-emerald-500 to-teal-400',
        },
        {
          id: 'logic' as ParentTab,
          title: 'Logic Games',
          desc: 'Colors, shapes, differences, and thinking puzzles for young minds.',
          emoji: '🧠',
          color: 'from-purple-500 to-indigo-400',
        },
        {
          id: 'math' as ParentTab,
          title: 'Math Fun',
          desc: 'Playful additions, subtractions, and interactive counting games.',
          emoji: '🔢',
          color: 'from-pink-500 to-rose-400',
        },
        {
          id: 'chess' as ParentTab,
          title: 'Kids Chess Academy',
          desc: 'Chess pieces and their movement rules simplified for kids.',
          emoji: '♟️',
          color: 'from-slate-700 to-slate-900',
        },
      ],
    },
    ru: {
      heroBadge: 'Любимый Мир Развития Вашего Ребёнка',
      heroTitle: 'Добро пожаловать, родители и малыши!',
      heroDesc: 'Увлекательные сказки, развивающие видео, игры на логику и математику, а также детская шахматная школа.',
      tag1: '✓ Без рекламы',
      tag2: '✓ Безопасный контент',
      tag3: '✓ На русском языке',
      explore: 'Перейти к разделу',
      cards: [
        {
          id: 'stories' as ParentTab,
          title: 'Сказки и Истории',
          desc: 'Дневные и вечерние сказки с голосовым чтением для детей.',
          emoji: '📖',
          color: 'from-amber-500 to-orange-400',
        },
        {
          id: 'videos' as ParentTab,
          title: 'Учись по Видео',
          desc: 'Видеоуроки для развития речи и двигательной активности.',
          emoji: '🎬',
          color: 'from-sky-500 to-cyan-400',
        },
        {
          id: 'movement' as ParentTab,
          title: 'Учимся в Движении',
          desc: 'Двигательные команды, зарядка и весёлые упражнения с героями.',
          emoji: '🏃',
          color: 'from-emerald-500 to-teal-400',
        },
        {
          id: 'logic' as ParentTab,
          title: 'Игры на Логику',
          desc: 'Цвета, формы, отличия и увлекательные головоломки.',
          emoji: '🧠',
          color: 'from-purple-500 to-indigo-400',
        },
        {
          id: 'math' as ParentTab,
          title: 'Весёлая Математика',
          desc: 'Яблоки, звёздочки, сложение и забавные уроки счёта.',
          emoji: '🔢',
          color: 'from-pink-500 to-rose-400',
        },
        {
          id: 'chess' as ParentTab,
          title: 'Шахматы для Детей',
          desc: 'Шахматные фигуры и правила их ходов в простой форме.',
          emoji: '♟️',
          color: 'from-slate-700 to-slate-900',
        },
      ],
    },
  }[currentLang];

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row select-none"
      style={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 35%, #fde68a 100%)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 bg-white/90 backdrop-blur-xl border-r border-amber-200/60 p-5 shadow-lg flex-shrink-0">
        <div>
          {/* Brand & Portal Label */}
          <div className="flex items-center gap-3 pb-5 border-b border-amber-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-md shadow-amber-500/30 flex-shrink-0">
              👨‍👩‍👧‍👦
            </div>
            <div className="overflow-hidden">
              <h1 className="text-base font-black text-slate-800 tracking-tight truncate">
                Kids Move & Learn
              </h1>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider">
                {navLabels.portalTitle}
              </span>
            </div>
          </div>

          {/* Child Mini Badge */}
          <div className="my-4 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/80 flex items-center justify-center text-xl flex-shrink-0">
              {parentProfile?.child_gender === 'girl' ? '👧' : '👦'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-500 leading-tight">{navLabels.yourChild}</p>
              <p className="text-sm font-black text-slate-800 truncate">{childDisplayName}</p>
              <p className="text-[10px] font-bold text-amber-700">
                {parentProfile?.child_age ? `${parentProfile.child_age} ${currentLang === 'en' ? 'years' : currentLang === 'ru' ? 'лет' : 'yaş'}` : navLabels.allAges}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 mt-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs lg:text-sm transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-900 shadow-md shadow-amber-400/30 font-black'
                      : 'text-slate-600 hover:bg-amber-100/60 hover:text-slate-900'
                  }`}
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Buttons */}
        <div className="pt-4 border-t border-amber-100 space-y-2">
          {/* Language Switcher in Sidebar */}
          <div className="flex items-center justify-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200/60">
            {[
              { code: 'az' as const, label: 'AZ', flag: '🇦🇿' },
              { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
              { code: 'ru' as const, label: 'RU', flag: '🇷🇺' },
            ].map(l => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`flex-1 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  currentLang === l.code
                    ? 'bg-amber-400 text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:bg-amber-100/60'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>

          {user && ['admin', 'editor'].includes(user.role) && (
            <button
              onClick={() => setActivePortal('admin')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-colors cursor-pointer border border-amber-400 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{user.role === 'editor' ? 'Redaktor Paneli' : 'Admin Paneli'}</span>
            </button>
          )}

          <button
            onClick={() => setActivePortal('select')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{navLabels.backToPortals}</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{navLabels.logout}</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-amber-200 p-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👨‍👩‍👧‍👦</span>
          <div>
            <h2 className="text-sm font-black text-slate-800">{navLabels.portalTitle}</h2>
            <p className="text-[10px] text-slate-500 font-bold">
              {childDisplayName} ({parentProfile?.child_age ? `${parentProfile.child_age} yaş` : navLabels.allAges})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-0.5 bg-amber-100 p-0.5 rounded-lg">
            {(['az', 'en', 'ru'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                  currentLang === l ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-amber-100 text-slate-700 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-amber-200 p-4 space-y-2 z-30 shadow-lg"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-xs text-left cursor-pointer ${
                  activeTab === item.id ? 'bg-amber-400 text-slate-900 font-black' : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setActivePortal('select')}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                {navLabels.backToPortals}
              </button>
              <button
                onClick={logout}
                className="flex-1 py-2 rounded-xl bg-red-50 text-red-600 text-xs font-bold"
              >
                {navLabels.logout}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Filter Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-amber-200/50 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-800">
                {navLabels.greeting}, <span className="text-amber-600">{childDisplayName}</span>!
              </h2>
              <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
                {navLabels.whatToLearn}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 3-Language Selector in Top Header */}
            <div className="flex items-center gap-1 bg-white/95 border border-amber-300/80 p-1 rounded-2xl shadow-sm">
              {[
                { code: 'az' as const, label: 'AZ', flag: '🇦🇿' },
                { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
                { code: 'ru' as const, label: 'RU', flag: '🇷🇺' },
              ].map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                    currentLang === l.code
                      ? 'bg-amber-400 text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:bg-amber-100/50'
                  }`}
                  title={l.label}
                >
                  <span>{l.flag}</span>
                  <span className="font-extrabold">{l.label}</span>
                </button>
              ))}
            </div>

            {/* Quick Age Filter Selector */}
            <div className="flex items-center gap-1 bg-amber-100/60 p-1 rounded-2xl">
              <span className="text-[11px] font-bold text-amber-900 px-2 flex items-center gap-1">
                <Filter className="w-3 h-3 text-amber-700" />
                <span className="hidden sm:inline">{navLabels.age}</span>
              </span>
              {[
                { label: navLabels.all, value: null },
                { label: '3-4', value: 4 },
                { label: '5-6', value: 6 },
                { label: '7-8', value: 8 },
                { label: '9-10', value: 10 },
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedAge(opt.value)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedAge === opt.value
                      ? 'bg-amber-400 text-slate-900 shadow-sm'
                      : 'text-amber-800 hover:bg-amber-200/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Tab Content Display */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Welcome Hero Banner */}
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-xl overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-9xl opacity-20 select-none">
                  🚀
                </div>
                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>{dashboardContent.heroBadge}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-2">
                    {dashboardContent.heroTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-50 font-medium leading-relaxed mb-4">
                    {dashboardContent.heroDesc}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-extrabold">
                    <span className="bg-white/25 px-3 py-1 rounded-xl">{dashboardContent.tag1}</span>
                    <span className="bg-white/25 px-3 py-1 rounded-xl">{dashboardContent.tag2}</span>
                    <span className="bg-white/25 px-3 py-1 rounded-xl">{dashboardContent.tag3}</span>
                  </div>
                </div>
              </div>

              {/* Quick Launch Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardContent.cards.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab(item.id)}
                    className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-amber-100 flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-3xl shadow-md mb-4 group-hover:scale-105 transition-transform`}>
                        {item.emoji}
                      </div>
                      <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                      <span>{dashboardContent.explore}</span>
                      <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stories' && <ParentStories selectedAge={selectedAge} onSelectAge={setSelectedAge} />}
          {activeTab === 'videos' && <ParentVideos selectedAge={selectedAge} />}
          {activeTab === 'movement' && <ParentMovement />}
          {activeTab === 'logic' && <ParentLogic selectedAge={selectedAge} />}
          {activeTab === 'math' && <ParentMath selectedAge={selectedAge} />}
          {activeTab === 'chess' && <ParentChess />}
          {activeTab === 'settings' && <ParentSettings />}
        </main>
      </div>
    </div>
  );
};

export default ParentPortal;
