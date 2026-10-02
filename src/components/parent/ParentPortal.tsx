import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Video, Activity, Brain, Calculator, Award,
  Settings, LogOut, ArrowLeft, Home, Sparkles, Filter, Menu, X, Smile, Shield, Bell
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
import ParentDailyPlan from './ParentDailyPlan';
import ParentOfflineActivities from './ParentOfflineActivities';
import ParentConversationPrompts from './ParentConversationPrompts';
import ParentProgressView from './ParentProgressView';
import LearningHubModal from '../learning/LearningHubModal';
import { GraduationCap, Clock, Heart, MessageCircle, TrendingUp } from 'lucide-react';
import {
  getParentNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  ParentNotification
} from '../../services/parentService';

type ParentTab =
  | 'dashboard'
  | 'dailyPlan'
  | 'offlinePlay'
  | 'conversation'
  | 'progress'
  | 'stories'
  | 'videos'
  | 'movement'
  | 'logic'
  | 'math'
  | 'chess'
  | 'settings';

export const ParentPortal: React.FC = () => {
  const { user, parentProfile, logout, setActivePortal } = useAuthStore();
  const { language, setLanguage } = useGameStore();
  const currentLang = language || 'az';
  const [activeTab, setActiveTab] = useState<ParentTab>('dashboard');
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLearningHubOpen, setIsLearningHubOpen] = useState(false);
  const [notifications, setNotifications] = useState<ParentNotification[]>(getParentNotifications());
  const [unreadCount, setUnreadCount] = useState<number>(getUnreadNotificationCount());
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setNotifications(getParentNotifications());
      setUnreadCount(getUnreadNotificationCount());
    };
    window.addEventListener('kml_notifications_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('kml_notifications_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const childDisplayName = parentProfile?.child_name || 'Dostumuz';

  const navLabels = {
    az: {
      dashboard: 'Ana Səhifə',
      learning: 'Təlim Bölmələri',
      dailyPlan: 'Bu gün nə edək?',
      offlinePlay: 'Uşağımla oynayıram',
      conversation: 'Danışaq',
      progress: 'İnkişaf Xülasəsi',
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
      learning: 'Learning Modules',
      dailyPlan: 'Daily 15-Min Plan',
      offlinePlay: 'Offline Play',
      conversation: 'Let us Talk',
      progress: 'Progress Summary',
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
      learning: 'Разделы Обучения',
      dailyPlan: 'План на сегодня',
      offlinePlay: 'Играем с пользой',
      conversation: 'Поговорим',
      progress: 'Прогресс ребенка',
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
    { id: 'dailyPlan' as ParentTab, label: navLabels.dailyPlan, icon: Clock, emoji: '☀️' },
    { id: 'offlinePlay' as ParentTab, label: navLabels.offlinePlay, icon: Heart, emoji: '🧸' },
    { id: 'conversation' as ParentTab, label: navLabels.conversation, icon: MessageCircle, emoji: '💬' },
    { id: 'progress' as ParentTab, label: navLabels.progress, icon: TrendingUp, emoji: '📈' },
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

          {/* Notification Center Button in Sidebar */}
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="w-full mb-3 flex items-center justify-between p-2.5 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center text-amber-800 transition-colors">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-xs font-black text-slate-800 block">Bildirişlər</span>
                <span className="text-[10px] text-slate-500 font-semibold">Loqoped və tapşırıqlar</span>
              </div>
            </div>
            {unreadCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[11px] font-black animate-pulse">
                {unreadCount} yeni
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-bold">0</span>
            )}
          </button>

          {/* Təlim Bölmələri Big Launcher Button in Sidebar */}
          <button
            onClick={() => setIsLearningHubOpen(true)}
            className="w-full mb-3 flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 font-black text-xs lg:text-sm shadow-md shadow-amber-400/30 hover:scale-[1.02] transition-all cursor-pointer border border-amber-300"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🎓</span>
              <span className="truncate">{navLabels.learning}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/40 text-slate-900 font-black">
              37 Bölmə
            </span>
          </button>

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

          {/* Mobile Notification Bell */}
          <button
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative p-2 rounded-xl bg-amber-100 text-slate-800 cursor-pointer"
            title="Bildirişlər"
          >
            <Bell className="w-5 h-5 text-amber-800" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

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
            {/* Notification Bell Button in Top Header */}
            <button
              onClick={() => setIsNotificationModalOpen(true)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-amber-300 hover:border-amber-400 text-slate-800 font-black text-xs shadow-sm transition-all cursor-pointer"
              title="Loqoped Bildirişləri"
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Bildirişlər</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-black animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Təlim Bölmələri Launcher in Top Bar */}
            <button
              onClick={() => setIsLearningHubOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs shadow-sm transition-all border border-amber-300 cursor-pointer"
              title="Bütün Təlim Bölmələri"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span className="hidden xs:inline">{navLabels.learning}</span>
            </button>

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
              {/* Unread Therapist Notification Alert Banner */}
              {unreadCount > 0 && (
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-400 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl flex-shrink-0 shadow-inner">
                      🔔
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider mb-1">
                        <span>Yeni Bildiriş</span>
                      </div>
                      <h3 className="text-base font-black">
                        Loqoped tərəfindən {unreadCount} yeni bildiriş göndərilib!
                      </h3>
                      <p className="text-xs text-indigo-100 font-medium">
                        Yeni ev tapşırığı və ya seans üzrə xüsusi loqoped müşahidəsi var.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => setIsNotificationModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-white text-indigo-900 text-xs font-black hover:bg-indigo-50 shadow-md cursor-pointer transition-all"
                    >
                      Bildirişləri Aç 🔔
                    </button>
                    <button
                      onClick={() => setActiveTab('progress')}
                      className="px-4 py-2 rounded-xl bg-indigo-500/60 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Tapşırıqlara Bax
                    </button>
                  </div>
                </div>
              )}

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

              {/* "Bu gün nə edək?" - 15-Minute Daily Micro Plan */}
              <ParentDailyPlan />

              {/* 3 Main Feature Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => setIsLearningHubOpen(true)}
                  className="p-5 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 text-slate-950 font-black shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-wider opacity-80 block font-extrabold">37 Kateqoriya</span>
                    <h3 className="text-base sm:text-lg">Təlim Bölmələri</h3>
                    <p className="text-xs font-bold opacity-90 mt-0.5">Bütün interaktiv fəaliyyətlər</p>
                  </div>
                  <span className="text-4xl">🎓</span>
                </div>

                <div
                  onClick={() => setActiveTab('offlinePlay')}
                  className="p-5 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 text-white font-black shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-wider opacity-80 block font-extrabold">Ekransız</span>
                    <h3 className="text-base sm:text-lg">Uşağımla Oynayıram</h3>
                    <p className="text-xs font-bold opacity-90 mt-0.5">Canlı ev fəaliyyətləri</p>
                  </div>
                  <span className="text-4xl">🧸</span>
                </div>

                <div
                  onClick={() => setActiveTab('conversation')}
                  className="p-5 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-500 text-white font-black shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="text-[11px] uppercase tracking-wider opacity-80 block font-extrabold">Dialoq</span>
                    <h3 className="text-base sm:text-lg">Danışaq</h3>
                    <p className="text-xs font-bold opacity-90 mt-0.5">Şəkilli nitq inkişafı</p>
                  </div>
                  <span className="text-4xl">💬</span>
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

          {activeTab === 'dailyPlan' && <ParentDailyPlan />}
          {activeTab === 'offlinePlay' && <ParentOfflineActivities />}
          {activeTab === 'conversation' && <ParentConversationPrompts />}
          {activeTab === 'progress' && <ParentProgressView />}
          {activeTab === 'stories' && <ParentStories selectedAge={selectedAge} onSelectAge={setSelectedAge} />}
          {activeTab === 'videos' && <ParentVideos selectedAge={selectedAge} />}
          {activeTab === 'movement' && <ParentMovement />}
          {activeTab === 'logic' && <ParentLogic selectedAge={selectedAge} />}
          {activeTab === 'math' && <ParentMath selectedAge={selectedAge} />}
          {activeTab === 'chess' && <ParentChess />}
          {activeTab === 'settings' && <ParentSettings />}
        </main>
      </div>

      {/* Notification Center Modal */}
      <AnimatePresence>
        {isNotificationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-amber-200"
            >
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-inner">
                    🔔
                  </div>
                  <div>
                    <h2 className="text-base font-black">Valideyn Bildirişləri</h2>
                    <p className="text-[11px] text-amber-100 font-semibold">
                      Loqoped tərəfindən göndərilən ev tapşırıqları və seans qeydləri
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNotificationModalOpen(false)}
                  className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Bar */}
              <div className="px-5 py-2.5 bg-amber-50/80 border-b border-amber-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600">
                  Cəmi {notifications.length} bildiriş ({unreadCount} oxunmamış)
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      markAllNotificationsAsRead();
                      setNotifications(getParentNotifications());
                      setUnreadCount(0);
                    }}
                    className="text-amber-800 font-black hover:underline cursor-pointer"
                  >
                    Hamısını oxunmuş et ✓
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="flex-1 p-5 overflow-y-auto space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <span className="text-4xl block mb-2">📭</span>
                    <p className="text-xs font-bold">Hələlik heç bir bildiriş yoxdur.</p>
                  </div>
                ) : (
                  notifications.map((notif) => {
                    const isNotificationRead = notif.isRead || notif.read;
                    return (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (!isNotificationRead) {
                            markNotificationAsRead(notif.id);
                            setNotifications(getParentNotifications());
                            setUnreadCount(getUnreadNotificationCount());
                          }
                        }}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isNotificationRead
                            ? 'bg-slate-50/80 border-slate-200'
                            : 'bg-amber-50/90 border-amber-300 shadow-sm ring-1 ring-amber-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">
                              {notif.type === 'homework' ? '📚' : notif.type === 'session_note' ? '📝' : '🔔'}
                            </span>
                            <span className="text-xs font-black text-slate-900">
                              {notif.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {!isNotificationRead && (
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                            )}
                            <span className="text-[10px] text-slate-400 font-bold">
                              {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                        {notif.message}
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/70">
                        <span className="text-slate-500 font-bold flex items-center gap-1">
                          <span>👧</span>
                          <span>Uşaq: {notif.childName}</span>
                        </span>
                        {notif.type === 'homework' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsNotificationModalOpen(false);
                              setActiveTab('progress');
                            }}
                            className="text-indigo-600 font-black hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Tapşırığa bax</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Learning Hub Modal */}
      <LearningHubModal
        isOpen={isLearningHubOpen}
        onClose={() => setIsLearningHubOpen(false)}
        onNavigateToExistingSection={(sec) => setActiveTab(sec)}
      />
    </div>
  );
};

export default ParentPortal;
