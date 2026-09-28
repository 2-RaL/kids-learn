import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Activity, BookOpen, Video, Brain, Award, ShieldCheck, ArrowRight, Lock, Smile, Compass } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const PortalSelectionPage: React.FC = () => {
  const { user, isAuthenticated, logout, setActivePortal } = useAuthStore();

  const handleSelectTherapist = () => {
    setActivePortal('therapist');
  };

  const handleSelectParent = () => {
    setActivePortal('parent');
  };

  const handleSelectAdmin = () => {
    setActivePortal('admin');
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-x-hidden selection:bg-sky-200"
      style={{
        background: 'radial-gradient(ellipse at top, #38bdf8 0%, #2563eb 50%, #1e3a8a 100%)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Decorative Floating Blobs & Background Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto pb-4 border-b border-white/15">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center shadow-lg shadow-amber-500/30 text-2xl sm:text-3xl">
            🚀
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
              Kids Move & Learn
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 font-medium">
              Uşaqlar üçün İnteraktiv Öyrənmə və İnkişaf Sistemi
            </p>
          </div>
        </motion.div>

        {/* Right Header Status / Admin shortcut */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {isAuthenticated && user && (
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="hidden sm:inline">Daxil olunub: <strong>{user.displayName || user.username}</strong></span>
              <span className="bg-sky-500/80 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
                {user.role === 'admin' ? 'Admin' : user.role === 'editor' ? 'Redaktor' : user.role === 'therapist' ? 'Loqoped' : user.role === 'parent' ? 'Valideyn' : 'İstifadəçi'}
              </span>
            </div>
          )}

          {(!user || ['admin', 'editor'].includes(user.role)) && (
            <button
              onClick={handleSelectAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white/90 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              title="Sistem İdarəetmə Paneli"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>{user?.role === 'editor' ? 'Redaktor Paneli' : 'Admin Girişi'}</span>
            </button>
          )}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-red-500/80 hover:bg-red-600 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer"
              title="Hesabdan çıxış"
            >
              Çıxış
            </button>
          )}
        </motion.div>
      </header>

      {/* Main Choice Section */}
      <main className="relative z-10 max-w-5xl w-full mx-auto my-auto py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold mb-4 border border-white/30 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Xoş gəlmisiniz! Zəhmət olmasa daxil olmaq istədiyiniz portalı seçin</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-md"
          >
            Hansı portala daxil olmaq istəyirsiniz?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-sky-100 max-w-2xl mx-auto mt-2"
          >
            Mütəxəssislər üçün loqopedik seanslar və ya valideynlər üçün evdə əyləncəli inkişaf bölməsini seçin.
          </motion.p>
        </div>

        {/* 2 Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Speech Therapist Portal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={handleSelectTherapist}
            className="group relative bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-cyan-400/25 transition-all border-4 border-transparent hover:border-cyan-400 flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            {/* Top Accent Pill */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-sky-500 text-white font-extrabold text-[11px] sm:text-xs px-4 py-1 rounded-bl-2xl uppercase tracking-wider shadow">
              Mütəxəssislər üçün
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
                  🩺
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-sky-600 transition-colors">
                    Loqopedlər üçün
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                    Nitq inkişafı və artikulyasiya seansı
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Loqoped və defektoloqlar üçün hazırlanmış interaktiv seans mühiti. 3D personajlar, səsli əmrlər, mimika və artikulyasiya məşqləri ilə uşaqların nitqini inkişaf etdirin.
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {[
                  { icon: Activity, text: 'İnteraktiv 3D hərəkət və mimika komandaları' },
                  { icon: Smile, text: 'Zəngin personajlar (Oğlan, Qız, Dovşan və s.)' },
                  { icon: Brain, text: 'Nitq tanıma və səsli rəhbərlik' },
                  { icon: Award, text: 'Tərəqqi izləmə və nailiyyət qutusu' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3 h-3" />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full mt-4 py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-500/30 flex items-center justify-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
              <span>Loqoped Portalına Keçid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 2: Parent Portal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={handleSelectParent}
            className="group relative bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-amber-400/25 transition-all border-4 border-transparent hover:border-amber-400 flex flex-col justify-between cursor-pointer overflow-hidden"
          >
            {/* Top Accent Pill */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-white font-extrabold text-[11px] sm:text-xs px-4 py-1 rounded-bl-2xl uppercase tracking-wider shadow">
              Ailələr üçün
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-3xl sm:text-4xl shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                    Valideynlər üçün
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                    Evdə əyləncəli və maarifləndirici inkişaf
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Uşağınızın yaşına uyğun nağıllar, öyrədici hərəkətli videolar, məntiq oyunları, sadə riyaziyyat və şahmat dərsləri ilə evdə vaxtı səmərəli və maraqlı edin.
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-6">
                {[
                  { icon: BookOpen, text: 'Gecə və gündüz hekayələri (Azərbaycan dilində)' },
                  { icon: Video, text: 'Öyrədici hərəkət və nitq inkişafı videoları' },
                  { icon: Brain, text: 'Uşaqlar üçün interaktiv məntiq tapşırıqları' },
                  { icon: Compass, text: 'Sadə riyaziyyat və uşaqlar üçün şahmat dərsləri' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3 h-3" />
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full mt-4 py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
              <span>Valideyn Portalına Keçid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/80 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Təhlükəsiz, reklamsız və uşaq yönümlü platforma</span>
        </div>
        <div>
          <span>© 2026 Kids Move & Learn. Bütün hüquqlar qorunur.</span>
        </div>
      </footer>
    </div>
  );
};

export default PortalSelectionPage;
