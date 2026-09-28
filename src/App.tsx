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
import PortalSelectionPage from './components/portal/PortalSelectionPage';
import PortalLoginPage from './components/auth/PortalLoginPage';
import ParentPortal from './components/parent/ParentPortal';
import AdminPanel from './components/admin/AdminPanel';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const {
    isLoading,
    showCharacterDrawer,
    setShowCharacterDrawer,
    showRightDrawer,
    setShowRightDrawer,
  } = useGameStore();

  const {
    isAuthenticated,
    user,
    activePortal,
    setActivePortal,
    checkAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();

    // Listen to hash changes in browser URL
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#therapist') {
        setActivePortal('therapist');
      } else if (hash === '#parent') {
        setActivePortal('parent');
      } else if (hash === '#admin') {
        setActivePortal('admin');
      } else if (!hash || hash === '#' || hash === '#select') {
        setActivePortal('select');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ── Route 1: Portal Selection Landing Page ──────────────────────────
  if (activePortal === 'select') {
    return <PortalSelectionPage />;
  }

  // ── Route 2: Parent Portal ──────────────────────────────────────────
  if (activePortal === 'parent') {
    const isParentOrAdmin = isAuthenticated && user && ['parent', 'admin'].includes(user.role);
    if (!isParentOrAdmin) {
      return <PortalLoginPage portalType="parent" />;
    }
    return <ParentPortal />;
  }

  // ── Route 3: Admin Panel ────────────────────────────────────────────
  if (activePortal === 'admin') {
    const isAdmin = isAuthenticated && user && user.role === 'admin';
    if (!isAdmin) {
      return <PortalLoginPage portalType="admin" />;
    }
    return <AdminPanel />;
  }

  // ── Route 4: Speech Therapist Portal ("Logopedlər üçün") ─────────────
  // (Requires therapist, admin, or user role)
  const isTherapistAuthorized =
    isAuthenticated && user && ['therapist', 'admin', 'user'].includes(user.role);

  if (!isTherapistAuthorized) {
    return <PortalLoginPage portalType="therapist" />;
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

      {/* Main Game Interface for Speech Therapist */}
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
              {/* Left Column - Character Selection (Desktop XL+ only; on mobile/tablet opens as Left Drawer) */}
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

              {/* Right Column - Voice Control, Learning Mode & History */}
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
              <button
                onClick={() => setActivePortal('parent')}
                className="underline hover:text-white ml-1 text-sky-200 font-semibold cursor-pointer hidden sm:inline"
              >
                Valideyn portalı
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
    </div>
  );
};

export default App;
