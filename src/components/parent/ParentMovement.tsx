import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, Award, Play, RotateCcw, Smile } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';

interface Movement {
  id: number;
  name: string;
  name_az: string;
  command_key: string;
  icon: string;
  description: string;
  min_age: number;
  max_age: number;
}

interface ParentCharacter {
  id: number;
  name: string;
  name_az: string;
  emoji: string;
  description: string;
}

const DEFAULT_CHARACTERS: ParentCharacter[] = [
  { id: 1, name: 'Rabbit', name_az: 'Dovşan', emoji: '🐰', description: 'Cəld və sevimli meşə dostu' },
  { id: 2, name: 'Lion', name_az: 'Aslan', emoji: '🦁', description: 'Cəsur və güclü heyvanlar şahı' },
  { id: 3, name: 'Bear', name_az: 'Ayı', emoji: '🐻', description: 'Mehriban və şən ayı balası' },
  { id: 4, name: 'Fox', name_az: 'Tülkü', emoji: '🦊', description: 'Ağıllı və çevik tülkü' },
];

export const ParentMovement: React.FC = () => {
  const { token } = useAuthStore();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [characters, setCharacters] = useState<ParentCharacter[]>(DEFAULT_CHARACTERS);
  const [selectedChar, setSelectedChar] = useState<ParentCharacter>(DEFAULT_CHARACTERS[0]);
  const [currentAction, setCurrentAction] = useState<string>('idle');
  const [actionLabel, setActionLabel] = useState<string>('Hazıram! Bir hərəkət seçin');
  const [starsWon, setStarsWon] = useState<number>(0);

  useEffect(() => {
    fetchMovements();
    fetchCharacters();
  }, [token]);

  const fetchMovements = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/parent/movements'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.movements?.length > 0) {
        setMovements(data.movements);
      } else {
        // Fallback default movements
        setMovements([
          { id: 1, name: 'Sit', name_az: 'Otur', command_key: 'sit', icon: '🧘', description: 'Rahatca əyləş', min_age: 3, max_age: 12 },
          { id: 2, name: 'Stand', name_az: 'Qalx', command_key: 'stand', icon: '🧍', description: 'Ayağa qalx', min_age: 3, max_age: 12 },
          { id: 3, name: 'Walk Forward', name_az: 'İrəli get', command_key: 'walkForward', icon: '🚶', description: 'Addımla irəli', min_age: 3, max_age: 12 },
          { id: 4, name: 'Run', name_az: 'Qaç', command_key: 'run', icon: '🏃', description: 'Sürətlə qaç', min_age: 3, max_age: 12 },
          { id: 5, name: 'Jump', name_az: 'Tullan', command_key: 'jump', icon: '🦘', description: 'Yuxarı tullan', min_age: 3, max_age: 12 },
          { id: 6, name: 'Wave', name_az: 'Əlini salla', command_key: 'wave', icon: '👋', description: 'Dostlarına salam ver', min_age: 3, max_age: 12 },
          { id: 7, name: 'Spin', name_az: 'Yerində dön', command_key: 'spin', icon: '🌀', description: 'Bir dəfə fırlan', min_age: 3, max_age: 12 },
          { id: 8, name: 'Stop', name_az: 'Dayan', command_key: 'stop', icon: '✋', description: 'Hərəkətsiz qal', min_age: 3, max_age: 12 },
        ]);
      }
    } catch {
      // Fallback
    }
  };

  const fetchCharacters = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/parent/characters'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.characters?.length > 0) {
        setCharacters(data.characters);
        setSelectedChar(data.characters[0]);
      }
    } catch {}
  };

  const playSoundEffect = (action: string) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (action === 'jump') {
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (action === 'spin' || action === 'run') {
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        // Bell chime
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {}
  };

  const speakAction = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.2;
      utterance.rate = 0.95;
      const voices = window.speechSynthesis.getVoices();
      const azVoice = voices.find(v => v.lang.startsWith('az') || v.lang.startsWith('tr'));
      if (azVoice) utterance.voice = azVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const executeMovement = (mov: Movement) => {
    setCurrentAction(mov.command_key);
    setActionLabel(`${mov.name_az}! Gəl sən də təkrar et!`);
    playSoundEffect(mov.command_key);
    speakAction(mov.name_az);
    setStarsWon(prev => prev + 1);

    // Reset to idle after animation
    setTimeout(() => {
      setCurrentAction('idle');
      setActionLabel(`Əhsən! ${selectedChar.name_az} ilə növbəti hərəkəti seç.`);
    }, 2800);
  };

  // Determine framer animation props for currentAction
  const getAnimationVariants = () => {
    switch (currentAction) {
      case 'jump':
        return {
          animate: { y: [0, -90, 0, -50, 0], scale: [1, 1.15, 0.95, 1.05, 1] },
          transition: { duration: 1.2, ease: 'easeInOut' },
        };
      case 'spin':
        return {
          animate: { rotate: [0, 360, 720], scale: [1, 1.1, 1] },
          transition: { duration: 1.4, ease: 'easeInOut' },
        };
      case 'run':
        return {
          animate: { x: [-40, 40, -40, 40, 0], scaleX: [1, -1, 1, -1, 1] },
          transition: { duration: 1.5, ease: 'linear' },
        };
      case 'walkForward':
        return {
          animate: { scale: [1, 1.3, 1], y: [0, -15, 0] },
          transition: { duration: 1.5, repeat: 1 },
        };
      case 'sit':
        return {
          animate: { y: [0, 40, 40], scaleY: [1, 0.8, 0.85] },
          transition: { duration: 1.8 },
        };
      case 'stand':
        return {
          animate: { y: [40, 0], scaleY: [0.85, 1] },
          transition: { duration: 0.8 },
        };
      case 'wave':
        return {
          animate: { rotate: [0, 15, -15, 15, -15, 0], scale: [1, 1.05, 1] },
          transition: { duration: 1.4 },
        };
      case 'nod':
        return {
          animate: { y: [0, 15, 0, 15, 0] },
          transition: { duration: 1.2 },
        };
      case 'stop':
        return {
          animate: { scale: [1, 1.2, 1] },
          transition: { duration: 0.5 },
        };
      default:
        // Idle gentle float
        return {
          animate: { y: [0, -8, 0] },
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
        };
    }
  };

  const anim = getAnimationVariants();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">🏃</span>
            Hərəkətlərlə Öyrən
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Dostunu seç, hərəkətlərə kliklə və onunla birlikdə fiziki məşqləri yerinə yetir!
          </p>
        </div>

        {/* Stars counter */}
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 shadow-sm">
          <span className="text-xl">⭐</span>
          <span className="text-xs font-bold text-amber-800">Qazanılan Ulduzlar:</span>
          <span className="text-base font-black text-amber-600">{starsWon}</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage Viewport (Left / Center) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 rounded-3xl p-6 shadow-md border-4 border-white flex flex-col justify-between min-h-[380px] sm:min-h-[440px] relative overflow-hidden">
          {/* Sky elements */}
          <div className="absolute top-4 left-6 text-2xl opacity-80 animate-pulse">☁️</div>
          <div className="absolute top-8 right-12 text-3xl opacity-90 animate-pulse" style={{ animationDelay: '1s' }}>☀️</div>
          <div className="absolute top-16 right-36 text-xl opacity-70">☁️</div>

          {/* Grass & flower bottom decorations */}
          <div className="absolute bottom-2 left-6 text-xl">🌷</div>
          <div className="absolute bottom-2 right-8 text-xl">🌼</div>
          <div className="absolute bottom-3 left-1/3 text-lg">🌿</div>

          {/* Top Stage Character Selector */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
              Qəhrəmanını seç:
            </span>

            <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-sm">
              {characters.map(char => (
                <button
                  key={char.id}
                  onClick={() => {
                    setSelectedChar(char);
                    speakAction(char.name_az);
                  }}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all cursor-pointer ${
                    selectedChar.id === char.id
                      ? 'bg-amber-400 scale-110 shadow-md ring-2 ring-white'
                      : 'hover:bg-slate-100'
                  }`}
                  title={char.name_az}
                >
                  {char.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Mascot in the Center of Stage */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
            <motion.div
              key={currentAction + selectedChar.id}
              animate={anim.animate}
              transition={anim.transition}
              className="text-8xl sm:text-9xl select-none filter drop-shadow-2xl cursor-pointer"
              onClick={() => {
                executeMovement({
                  id: 0,
                  name: 'Jump',
                  name_az: 'Tullan',
                  command_key: 'jump',
                  icon: '🦘',
                  description: 'Tullan',
                  min_age: 3,
                  max_age: 12,
                });
              }}
            >
              {selectedChar.emoji}
            </motion.div>

            {/* Shadow beneath mascot */}
            <motion.div
              animate={{
                scaleX: currentAction === 'jump' ? [1, 0.4, 1] : 1,
                opacity: currentAction === 'jump' ? [0.4, 0.1, 0.4] : 0.4,
              }}
              transition={{ duration: 1.2 }}
              className="w-24 h-4 bg-slate-800/30 rounded-full blur-[2px] mt-2"
            />
          </div>

          {/* Action Speech Bubble Banner */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-white text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            <p className="text-xs sm:text-sm font-extrabold text-slate-800">
              {actionLabel}
            </p>
          </div>
        </div>

        {/* Movements Command Cards (Right Column) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>🎯</span>
              <span>Hərəkəti Seç və Təkrar Et</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Düymələrə klikləyərək qəhrəmana komanda verin:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {movements.map((mov) => (
                <motion.button
                  key={mov.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => executeMovement(mov)}
                  className={`p-3 rounded-2xl font-bold text-xs flex items-center gap-2.5 shadow-sm transition-all border cursor-pointer ${
                    currentAction === mov.command_key
                      ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md ring-2 ring-amber-300'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{mov.icon}</span>
                  <div className="text-left overflow-hidden">
                    <p className="font-extrabold text-slate-800 text-xs truncate">{mov.name_az}</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">{mov.description || mov.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Tip for Parents */}
          <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2.5">
            <span className="text-xl">💡</span>
            <span>
              Valideyn tövsiyəsi: Uşaqla birlikdə hərəkətləri yerinə yetirin və hər düzgün hərəkətdən sonra onu tərifləyin!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentMovement;
