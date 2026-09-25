import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/gameStore';
import { useAuthStore } from './store/authStore';
import Header from './components/layout/Header';
import LeftPanel from './components/layout/LeftPanel';
import RightPanel from './components/layout/RightPanel';
import BottomControls from './components/layout/BottomControls';
import CharacterScene from './components/character/CharacterScene';
import CharacterDrawer from './components/character/CharacterDrawer';
import RightDrawer from './components/layout/RightDrawer';
import AchievementsModal from './components/achievements/AchievementsModal';
import LoadingScreen from './components/common/LoadingScreen';
import LoginPage from './components/auth/LoginPage';
import AdminPanel from './components/admin/AdminPanel';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const { isLoading, showCharacterDrawer, setShowCharacterDrawer, showRightDrawer, setShowRightDrawer } = useGameStore();
  const { isAuthenticated, showAdminPanel, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div
      className="flex flex-col min-h-screen w-full overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #38bdf8 0%, #60a5fa 45%, #93c5fd 100%)',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Animated Loading Screen */}
      <LoadingScreen />

      {/* Main Game Interface */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-screen max-h-screen overflow-hidden"
          >
            {/* Top Navigation Header */}
            <div className="flex-shrink-0 z-30 pt-1 pb-1">
              <Header />
            </div>

            {/* Responsive Main Playing Field */}
            <div className="flex flex-1 gap-2 sm:gap-3 px-2 sm:px-3 pb-1.5 sm:pb-2 min-h-0 overflow-hidden">
              {/* Left Column - Character Selection (Desktop XL+ only; on mobile/tablet it opens as Left Drawer) */}
              <div className="hidden xl:block w-56 lg:w-60 xl:w-64 flex-shrink-0 min-h-0">
                <LeftPanel />
              </div>

              {/* Center Column - Character Stage & Bottom Command Controls */}
              <div className="flex-1 flex flex-col gap-1.5 sm:gap-2.5 min-h-0 min-w-0">
                {/* 3D Scene */}
                <div className="flex-1 min-h-0">
                  <CharacterScene />
                </div>

                {/* Command Buttons */}
                <div className="flex-shrink-0">
                  <BottomControls />
                </div>
              </div>

              {/* Right Column - Voice Control, Learning Mode & History (Desktop LG+ only; on mobile/tablet opens as Right Drawer) */}
              <div className="hidden lg:block w-64 lg:w-72 xl:w-80 flex-shrink-0 min-h-0">
                <RightPanel />
              </div>
            </div>

            {/* Footer */}
            <footer className="flex-shrink-0 py-1 px-3 sm:px-4 bg-sky-900/40 backdrop-blur-md text-white/90 text-[10px] sm:text-xs flex items-center justify-center gap-1.5 border-t border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 flex-shrink-0" />
              <span className="truncate">
                Uşaqların təhlükəsizliyi bizim prioritetimizdir. Səsiniz cihazınızda işlənir, heç bir məlumat toplanmır.
              </span>
              <button className="underline hover:text-white ml-1 text-sky-200 font-semibold cursor-pointer hidden sm:inline">
                Valideyn məlumatı
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile/Tablet Character Drawer ("Soldan açılan personaj menyu") */}
      <CharacterDrawer
        isOpen={showCharacterDrawer}
        onClose={() => setShowCharacterDrawer(false)}
      />

      {/* Mobile/Tablet Right Drawer (Voice, Challenges & History) */}
      <RightDrawer
        isOpen={showRightDrawer}
        onClose={() => setShowRightDrawer(false)}
      />

      {/* Achievements Modal */}
      <AchievementsModal />

      {/* Admin Panel Modal */}
      {showAdminPanel && <AdminPanel />}
    </div>
  );
};

export default App;
