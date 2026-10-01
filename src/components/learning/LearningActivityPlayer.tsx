import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Volume2, VolumeX, Sparkles, CheckCircle2, RotateCcw,
  ArrowRight, Award, Star, ArrowLeft, BookOpen, Lightbulb
} from 'lucide-react';
import type {
  LearningModuleCategory,
  LearningActivityItem,
  VisualScene,
  LearningLesson,
} from '../../data/learningModulesData';
import { ACTIVITY_TRANSLATIONS, UI_TRANSLATIONS } from '../../data/learningTranslations';
import { parentSpeech } from '../../utils/parentSpeech';
import { useGameStore } from '../../store/gameStore';

interface LearningActivityPlayerProps {
  module: LearningModuleCategory;
  onClose: () => void;
  onCompleteActivity?: (activityId: string, score: number) => void;
}

// ── Visual Scene Renderer (for Spatial Placement & Math Formulas) ───
interface VisualSceneCardProps {
  scene: VisualScene;
  activeLang: 'az' | 'en' | 'ru';
}

const VisualSceneCard: React.FC<VisualSceneCardProps> = ({ scene, activeLang }) => {
  const caption =
    activeLang === 'en'
      ? scene.captionEn || scene.captionAz
      : activeLang === 'ru'
      ? scene.captionRu || scene.captionAz
      : scene.captionAz;

  if (scene.type === 'spatial') {
    const { containerEmoji = '🪑', itemEmoji = '📖', position = 'on' } = scene;
    return (
      <div className="w-full bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50/30 rounded-3xl border-2 border-amber-200/80 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
        {caption && (
          <div className="mb-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-amber-200 text-xs sm:text-sm font-black text-slate-700 shadow-xs">
            <span>🖼️</span>
            <span>{caption}</span>
          </div>
        )}

        {/* Scene Container */}
        <div className="w-full max-w-sm h-48 sm:h-56 relative flex items-center justify-center bg-white/80 rounded-2xl border border-slate-200/80 shadow-sm p-4">
          {position === 'on' && (
            <div className="flex flex-col items-center justify-center relative">
              {/* Item on top */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="text-7xl sm:text-8xl md:text-9xl filter drop-shadow-lg z-10 -mb-2 select-none"
              >
                {itemEmoji}
              </motion.div>
              {/* Table top beam */}
              <div className="w-48 sm:w-56 h-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-md z-0" />
              {/* Table / Chair base */}
              <div className="text-6xl sm:text-7xl text-slate-700 -mt-2 opacity-90 select-none">
                {containerEmoji}
              </div>
              <span className="absolute -bottom-2 bg-emerald-500 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                👆 {activeLang === 'en' ? 'On top' : activeLang === 'ru' ? 'Сверху' : 'Üstündə'}
              </span>
            </div>
          )}

          {position === 'under' && (
            <div className="flex flex-col items-center justify-center relative">
              {/* Table top and container */}
              <div className="text-6xl sm:text-7xl text-slate-700 -mb-2 opacity-90 select-none">
                {containerEmoji}
              </div>
              <div className="w-48 sm:w-56 h-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 rounded-full shadow-md" />
              {/* Item below */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                className="text-7xl sm:text-8xl md:text-9xl filter drop-shadow-lg mt-1 z-10 select-none"
              >
                {itemEmoji}
              </motion.div>
              <span className="absolute -bottom-2 bg-indigo-500 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                👇 {activeLang === 'en' ? 'Underneath' : activeLang === 'ru' ? 'Под' : 'Altında'}
              </span>
            </div>
          )}

          {position === 'in' && (
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative flex items-center justify-center">
                <span className="text-8xl sm:text-9xl filter drop-shadow-md select-none">
                  {containerEmoji}
                </span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1], y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute text-6xl sm:text-7xl md:text-8xl filter drop-shadow-lg select-none"
                >
                  {itemEmoji}
                </motion.div>
              </div>
              <span className="mt-2 bg-sky-500 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                📥 {activeLang === 'en' ? 'Inside' : activeLang === 'ru' ? 'Внутри' : 'İçində'}
              </span>
            </div>
          )}

          {position === 'beside' && (
            <div className="flex flex-col items-center justify-center relative">
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                <span className="text-7xl sm:text-8xl filter drop-shadow-md select-none">
                  {containerEmoji}
                </span>
                <span className="text-2xl text-amber-500 font-black animate-pulse select-none">↔️</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="text-7xl sm:text-8xl filter drop-shadow-lg select-none"
                >
                  {itemEmoji}
                </motion.div>
              </div>
              <span className="mt-3 bg-amber-500 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                👉 {activeLang === 'en' ? 'Beside' : activeLang === 'ru' ? 'Рядом' : 'Yanında'}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (scene.type === 'math' && scene.mathFormula) {
    const { leftCount, leftEmoji, operator, rightCount, rightEmoji, resultEmoji } = scene.mathFormula;
    return (
      <div className="w-full bg-gradient-to-r from-amber-50 via-rose-50 to-sky-50 rounded-3xl border-2 border-amber-200/80 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center">
        {caption && (
          <div className="mb-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-amber-200 text-xs sm:text-sm font-black text-slate-700 shadow-xs">
            <span>🍎</span>
            <span>{caption}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 py-2">
          {/* Left item/group */}
          <div className="bg-white/90 border-2 border-rose-300 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px]">
            {leftCount <= 5 ? (
              <div className="flex gap-1 justify-center flex-wrap max-w-[120px]">
                {Array.from({ length: leftCount }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl filter drop-shadow-xs select-none">
                    {leftEmoji}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-4xl sm:text-5xl filter drop-shadow-xs select-none">{leftEmoji}</span>
                <span className="text-xs sm:text-sm font-black text-slate-400">×</span>
              </div>
            )}
            <span className="text-xl sm:text-3xl font-black text-rose-600 mt-1">{leftCount}</span>
          </div>

          {/* Operator */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400 text-slate-950 font-black text-2xl flex items-center justify-center shadow-md select-none">
            {operator}
          </div>

          {/* Right item/group */}
          <div className="bg-white/90 border-2 border-emerald-300 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col items-center justify-center min-w-[80px] sm:min-w-[100px]">
            {rightCount <= 5 ? (
              <div className="flex gap-1 justify-center flex-wrap max-w-[120px]">
                {Array.from({ length: rightCount }).map((_, i) => (
                  <span key={i} className="text-3xl sm:text-4xl filter drop-shadow-xs select-none">
                    {rightEmoji}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-4xl sm:text-5xl filter drop-shadow-xs select-none">{rightEmoji}</span>
                <span className="text-xs sm:text-sm font-black text-slate-400">×</span>
              </div>
            )}
            <span className="text-xl sm:text-3xl font-black text-emerald-600 mt-1">{rightCount}</span>
          </div>

          {/* Equals */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-200 text-slate-900 font-black text-2xl flex items-center justify-center shadow-md select-none">
            =
          </div>

          {/* Question / Mystery Box */}
          <div className="bg-amber-300/80 border-2 border-dashed border-amber-500 rounded-2xl p-3 sm:p-4 shadow-md flex flex-col items-center justify-center min-w-[70px] sm:min-w-[90px] animate-pulse">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">?</span>
            <span className="text-[11px] font-extrabold text-amber-900 mt-0.5 select-none">
              {resultEmoji || leftEmoji}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (scene.type === 'tracing') {
    const { startEmoji = '⭐', targetEmoji = '🌙', pathType = 'straight' } = scene;
    return (
      <div className="w-full bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white rounded-3xl border-2 border-indigo-400/80 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center relative overflow-hidden">
        {caption && (
          <div className="mb-4 inline-flex items-center gap-1.5 bg-indigo-900/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-indigo-400 text-xs sm:text-sm font-black text-amber-300 shadow-xs">
            <span>✨</span>
            <span>{caption}</span>
          </div>
        )}

        {/* Tracing Track Display */}
        <div className="w-full max-w-md h-36 sm:h-44 bg-slate-950/80 rounded-2xl border-2 border-indigo-500/50 p-4 flex items-center justify-between relative shadow-lg">
          {/* Start Point */}
          <div className="flex flex-col items-center z-10">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl sm:text-7xl md:text-8xl filter drop-shadow-md select-none"
            >
              {startEmoji}
            </motion.div>
            <span className="text-[10px] font-black uppercase text-amber-400 mt-1">
              {activeLang === 'en' ? 'Start' : activeLang === 'ru' ? 'Старт' : 'Başlanğıc'}
            </span>
          </div>

          {/* Path Line */}
          <div className="flex-1 mx-3 sm:mx-6 relative flex items-center justify-center">
            {pathType === 'straight' && (
              <div className="w-full border-t-4 border-dashed border-amber-300 relative flex items-center">
                <motion.div
                  animate={{ x: ['0%', '100%'], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="absolute -top-3.5 text-xl select-none"
                >
                  ✨
                </motion.div>
              </div>
            )}
            {pathType === 'zigzag' && (
              <div className="w-full flex items-center justify-around text-amber-400 font-black tracking-widest text-lg sm:text-xl select-none">
                <span>⚡</span>
                <span className="text-xs sm:text-sm font-mono text-indigo-300">~/~/~/~➔</span>
                <span>⚡</span>
              </div>
            )}
            {pathType === 'wave' && (
              <div className="w-full flex items-center justify-around text-pink-400 font-black tracking-widest text-lg sm:text-xl select-none">
                <span>🌸</span>
                <span className="text-xs sm:text-sm font-mono text-pink-300">∿∿∿∿➔</span>
                <span>🌸</span>
              </div>
            )}
          </div>

          {/* Target Destination */}
          <div className="flex flex-col items-center z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="text-6xl sm:text-7xl md:text-8xl filter drop-shadow-md select-none"
            >
              {targetEmoji}
            </motion.div>
            <span className="text-[10px] font-black uppercase text-emerald-400 mt-1">
              {activeLang === 'en' ? 'Goal' : activeLang === 'ru' ? 'Цель' : 'Hədəf'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (scene.type === 'comparison') {
    const { leftItem, rightItem } = scene;
    const getSizeClass = (size?: string) => {
      switch (size) {
        case 'huge': return 'text-7xl sm:text-8xl md:text-9xl';
        case 'large': return 'text-6xl sm:text-7xl';
        case 'small': return 'text-3xl sm:text-4xl';
        case 'tiny': return 'text-2xl sm:text-3xl';
        default: return 'text-5xl sm:text-6xl';
      }
    };
    return (
      <div className="w-full bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 rounded-3xl border-2 border-amber-200/80 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center">
        {caption && (
          <div className="mb-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-amber-200 text-xs sm:text-sm font-black text-slate-700 shadow-xs">
            <span>⚖️</span>
            <span>{caption}</span>
          </div>
        )}
        <div className="w-full max-w-md flex items-center justify-around gap-4 bg-white/80 rounded-2xl border border-slate-200 p-4 shadow-sm">
          {leftItem && (
            <div className="flex flex-col items-center gap-1">
              <span className={`${getSizeClass(leftItem.size)} filter drop-shadow select-none`}>
                {leftItem.emoji}
              </span>
              <span className="font-black text-xs sm:text-sm text-slate-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {activeLang === 'en' ? leftItem.labelEn || leftItem.labelAz : activeLang === 'ru' ? leftItem.labelRu || leftItem.labelAz : leftItem.labelAz}
              </span>
            </div>
          )}
          <span className="text-xl sm:text-2xl font-black text-slate-400">vs</span>
          {rightItem && (
            <div className="flex flex-col items-center gap-1">
              <span className={`${getSizeClass(rightItem.size)} filter drop-shadow select-none`}>
                {rightItem.emoji}
              </span>
              <span className="font-black text-xs sm:text-sm text-slate-700 bg-sky-100 px-2.5 py-0.5 rounded-full">
                {activeLang === 'en' ? rightItem.labelEn || rightItem.labelAz : activeLang === 'ru' ? rightItem.labelRu || rightItem.labelAz : rightItem.labelAz}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (scene.type === 'traffic') {
    const { activeLight = 'red' } = scene;
    return (
      <div className="w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl border-2 border-slate-700 p-4 sm:p-6 shadow-inner flex flex-col items-center justify-center">
        {caption && (
          <div className="mb-3 inline-flex items-center gap-1.5 bg-slate-800/90 backdrop-blur px-3.5 py-1.5 rounded-full border border-slate-600 text-xs sm:text-sm font-black text-amber-300 shadow-xs">
            <span>🚦</span>
            <span>{caption}</span>
          </div>
        )}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-3xl border-4 border-slate-700 flex flex-col items-center gap-3 shadow-2xl">
          {/* Red Light */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
            activeLight === 'red'
              ? 'bg-rose-500 ring-8 ring-rose-500/40 shadow-lg shadow-rose-500 animate-pulse'
              : 'bg-rose-950/40 opacity-40'
          }`}>
            {activeLight === 'red' && '🛑'}
          </div>
          {/* Yellow Light */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
            activeLight === 'yellow'
              ? 'bg-amber-400 ring-8 ring-amber-400/40 shadow-lg shadow-amber-400 animate-pulse'
              : 'bg-amber-950/40 opacity-40'
          }`}>
            {activeLight === 'yellow' && '⚠️'}
          </div>
          {/* Green Light */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
            activeLight === 'green'
              ? 'bg-emerald-500 ring-8 ring-emerald-500/40 shadow-lg shadow-emerald-500 animate-pulse'
              : 'bg-emerald-950/40 opacity-40'
          }`}>
            {activeLight === 'green' && '🚶'}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// ── Main Activity Player Component ──────────────────────────────────
// Helper to organize and shuffle activities by topic/lesson clusters
function prepareModuleActivities(targetModule: LearningModuleCategory): LearningActivityItem[] {
  if (!targetModule?.activities || targetModule.activities.length === 0) return [];

  // Strict pedagogical progression for Math: 1-10 counting, 10+1=11, 10+10=20, 20+5=25 up to 100
  if (targetModule.id === 'math') {
    return [...targetModule.activities];
  }

  // All other modules: group activities by their parent lesson/concept unit
  // A lesson card and its subsequent practice questions stay together as an atomic cluster,
  // but the clusters are shuffled so the child gets a fresh, randomized concept start every session!
  const clusters: LearningActivityItem[][] = [];
  let currentCluster: LearningActivityItem[] = [];

  for (const act of targetModule.activities) {
    if (act.lesson && currentCluster.length > 0) {
      clusters.push(currentCluster);
      currentCluster = [act];
    } else {
      currentCluster.push(act);
    }
  }
  if (currentCluster.length > 0) {
    clusters.push(currentCluster);
  }

  // Fisher-Yates shuffle on clusters
  for (let i = clusters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clusters[i], clusters[j]] = [clusters[j], clusters[i]];
  }

  return clusters.flat();
}

export const LearningActivityPlayer: React.FC<LearningActivityPlayerProps> = ({
  module,
  onClose,
  onCompleteActivity,
}) => {
  const { language, addStars } = useGameStore();
  const [activeLang, setActiveLang] = useState<'az' | 'en' | 'ru'>((language as any) || 'az');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Shuffled activities (non-math) or sequenced activities (math)
  const [activeActivities, setActiveActivities] = useState<LearningActivityItem[]>(() =>
    prepareModuleActivities(module)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Re-initialize on module change
  useEffect(() => {
    setActiveActivities(prepareModuleActivities(module));
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setAcknowledgedLessons({});
    setIsReviewingLesson(false);
  }, [module.id]);

  // Lesson view acknowledgement and review state
  const [acknowledgedLessons, setAcknowledgedLessons] = useState<Record<string, boolean>>({});
  const [isReviewingLesson, setIsReviewingLesson] = useState(false);

  // Sequence state
  const [sequenceItems, setSequenceItems] = useState<Array<{ id: string; text: string; order: number; emoji: string }>>([]);

  // Sentence building state
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const currentActivity: LearningActivityItem | undefined = activeActivities[currentIndex];
  const ui = UI_TRANSLATIONS[activeLang] || UI_TRANSLATIONS.az;

  // Active lesson: either on current activity or closest preceding lesson in this module
  const activeLesson: LearningLesson | undefined = (() => {
    if (currentActivity?.lesson) return currentActivity.lesson;
    for (let i = currentIndex; i >= 0; i--) {
      if (activeActivities[i]?.lesson) {
        return activeActivities[i].lesson;
      }
    }
    return undefined;
  })();

  const hasUnacknowledgedLesson = !!(
    currentActivity?.lesson && !acknowledgedLessons[currentActivity.lesson.id]
  );
  const showLessonView = hasUnacknowledgedLesson || (isReviewingLesson && !!activeLesson);

  // Reset states on question switch or unmount
  useEffect(() => {
    parentSpeech.stop();
    setIsSpeaking(false);

    if (!currentActivity) return;
    setSelectedOptionId(null);
    setIsAnswered(false);
    setFeedback(null);
    setIsReviewingLesson(false);

    // If sequence activity
    if (currentActivity.type === 'sequence' && currentActivity.sequenceSteps) {
      const shuffled = [...currentActivity.sequenceSteps].sort(() => Math.random() - 0.5);
      setSequenceItems(shuffled);
    }

    // If sentence activity
    if (currentActivity.type === 'sentence' && currentActivity.sentenceWords) {
      const shuffled = [...currentActivity.sentenceWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
    }

    return () => {
      parentSpeech.stop();
    };
  }, [currentIndex, currentActivity?.id]);

  // Handle language switch
  const handleLanguageChange = (lng: 'az' | 'en' | 'ru') => {
    parentSpeech.stop();
    setIsSpeaking(false);
    setActiveLang(lng);
  };

  // Get localized strings for current activity
  const translation = currentActivity ? ACTIVITY_TRANSLATIONS[currentActivity.id] : undefined;

  const questionText = (() => {
    if (!currentActivity) return '';
    if (activeLang === 'en') {
      return (
        translation?.question.en ||
        currentActivity.questionEn ||
        currentActivity.instructionEn ||
        currentActivity.question ||
        currentActivity.instruction
      );
    }
    if (activeLang === 'ru') {
      return (
        translation?.question.ru ||
        currentActivity.questionRu ||
        currentActivity.instructionRu ||
        currentActivity.question ||
        currentActivity.instruction
      );
    }
    return (
      translation?.question.az ||
      currentActivity.question ||
      currentActivity.instruction
    );
  })();

  const instructionText = (() => {
    if (!currentActivity) return '';
    if (activeLang === 'en') return translation?.instruction?.en || currentActivity.instructionEn || currentActivity.instruction;
    if (activeLang === 'ru') return translation?.instruction?.ru || currentActivity.instructionRu || currentActivity.instruction;
    return translation?.instruction?.az || currentActivity.instruction;
  })();

  const getOptionLabel = (opt: { text: string; textEn?: string; textRu?: string }) => {
    if (activeLang === 'en') {
      return translation?.options?.[opt.text]?.en || opt.textEn || opt.text;
    }
    if (activeLang === 'ru') {
      return translation?.options?.[opt.text]?.ru || opt.textRu || opt.text;
    }
    return opt.text;
  };

  const currentLocalizedExplanation = (() => {
    if (!currentActivity) return '';
    if (activeLang === 'en') return translation?.explanation?.en || currentActivity.explanationEn || currentActivity.explanation;
    if (activeLang === 'ru') return translation?.explanation?.ru || currentActivity.explanationRu || currentActivity.explanation;
    return translation?.explanation?.az || currentActivity.explanation;
  })();

  const moduleTitle =
    activeLang === 'en' ? module.titleEn : activeLang === 'ru' ? module.titleRu : module.titleAz;

  const activityTitle =
    currentActivity
      ? activeLang === 'en'
        ? currentActivity.titleEn || currentActivity.title
        : activeLang === 'ru'
        ? currentActivity.titleRu || currentActivity.title
        : currentActivity.title
      : moduleTitle;

  // On-demand speech for questions
  const handleSpeakQuestion = () => {
    if (isSpeaking) {
      parentSpeech.stop();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = questionText || instructionText;
    if (!textToSpeak) return;

    setIsSpeaking(true);
    parentSpeech.speak(
      textToSpeak,
      activeLang,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  // On-demand speech for lesson
  const handleSpeakLesson = () => {
    if (!activeLesson) return;
    if (isSpeaking) {
      parentSpeech.stop();
      setIsSpeaking(false);
      return;
    }

    const lessonText = (() => {
      if (activeLang === 'en') {
        return activeLesson.audioTextEn || activeLesson.explanationEn || activeLesson.conceptTitleEn || '';
      }
      if (activeLang === 'ru') {
        return activeLesson.audioTextRu || activeLesson.explanationRu || activeLesson.conceptTitleRu || '';
      }
      return activeLesson.audioTextAz || activeLesson.explanationAz || activeLesson.conceptTitleAz || '';
    })();

    if (!lessonText) return;

    setIsSpeaking(true);
    parentSpeech.speak(
      lessonText,
      activeLang,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleAcknowledgeLesson = () => {
    parentSpeech.stop();
    setIsSpeaking(false);
    if (activeLesson) {
      setAcknowledgedLessons((prev) => ({ ...prev, [activeLesson.id]: true }));
    }
    setIsReviewingLesson(false);
  };

  const handleReviewLesson = () => {
    parentSpeech.stop();
    setIsSpeaking(false);
    setIsReviewingLesson(true);
  };

  const handleSelectOption = (opt: { id: string; text: string; isCorrect?: boolean; emoji?: string }) => {
    if (isAnswered) return;
    setSelectedOptionId(opt.id);
    setIsAnswered(true);

    const isCorrect = opt.isCorrect ?? true;
    if (isCorrect) {
      setScore((s) => s + 10);
      setFeedback({
        isCorrect: true,
        text: currentLocalizedExplanation || ui.correctAnswer,
      });
      addStars(1);
    } else {
      setFeedback({
        isCorrect: false,
        text: ui.tryAgain,
      });
    }
  };

  const handleWordClick = (word: string) => {
    if (isAnswered) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w, i) => i !== availableWords.indexOf(word)));
  };

  const handleRemoveWord = (word: string) => {
    if (isAnswered) return;
    setSelectedWords(selectedWords.filter((w, i) => i !== selectedWords.lastIndexOf(word)));
    setAvailableWords([...availableWords, word]);
  };

  const checkSentence = () => {
    if (!currentActivity?.correctSentence) return;
    const userBuilt = selectedWords.join(' ').trim().toLowerCase();
    const correct = currentActivity.correctSentence.trim().toLowerCase();
    setIsAnswered(true);

    if (userBuilt === correct) {
      setScore((s) => s + 10);
      setFeedback({
        isCorrect: true,
        text: currentLocalizedExplanation || ui.correctAnswer,
      });
      addStars(1);
    } else {
      setFeedback({
        isCorrect: false,
        text: `${activeLang === 'ru' ? 'Правильное предложение' : activeLang === 'en' ? 'Correct sentence' : 'Düzgün cümlə'}: "${currentActivity.correctSentence}"`,
      });
    }
  };

  const handleNext = () => {
    parentSpeech.stop();
    setIsSpeaking(false);

    if (currentIndex < activeActivities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (onCompleteActivity) {
        onCompleteActivity(module.id, score + 10);
      }
    }
  };

  const handleRestart = () => {
    parentSpeech.stop();
    setIsSpeaking(false);
    setActiveActivities(prepareModuleActivities(module));
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setAcknowledgedLessons({});
    setIsReviewingLesson(false);
  };

  const handleModalClose = () => {
    parentSpeech.stop();
    setIsSpeaking(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden relative">
        {/* Header Bar */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${module.color} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl filter drop-shadow select-none">{module.emoji}</span>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                {moduleTitle}
              </span>
              <h2 className="text-base sm:text-xl font-black truncate max-w-[200px] sm:max-w-md">
                {activityTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/25 px-2.5 py-1 rounded-xl text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{score}</span>
            </div>
            <button
              onClick={handleModalClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2">
          <div
            className="bg-amber-400 h-2 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / (activeActivities.length || 1)) * 100}%`,
            }}
          />
        </div>

        {/* Body Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          {!isFinished && currentActivity ? (
            <div className="space-y-6">
              {/* ── A. LESSON VIEW: Shown before questions or when reviewing ── */}
              {showLessonView && activeLesson ? (
                <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                  {/* Lesson Header Card */}
                  <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-2 border-amber-300 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left flex-1">
                      <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        <span>🎓</span>
                        <span>{ui.letsLearn}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                        {activeLang === 'en'
                          ? activeLesson.conceptTitleEn || activeLesson.conceptTitleAz
                          : activeLang === 'ru'
                          ? activeLesson.conceptTitleRu || activeLesson.conceptTitleAz
                          : activeLesson.conceptTitleAz}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Trilingual Switcher */}
                      <div className="inline-flex items-center bg-amber-200/80 p-0.5 rounded-lg border border-amber-300/80">
                        {(['az', 'en', 'ru'] as const).map((lng) => (
                          <button
                            key={lng}
                            onClick={() => handleLanguageChange(lng)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase transition-all cursor-pointer ${
                              activeLang === lng
                                ? 'bg-amber-600 text-white shadow-xs'
                                : 'text-amber-950/70 hover:bg-amber-300/60'
                            }`}
                          >
                            {lng}
                          </button>
                        ))}
                      </div>

                      {/* Lesson Audio Playback Button (On-demand only) */}
                      <button
                        onClick={handleSpeakLesson}
                        className={`p-3 rounded-2xl transition-all shadow-sm flex items-center justify-center cursor-pointer flex-shrink-0 ${
                          isSpeaking
                            ? 'bg-amber-500 text-white ring-4 ring-amber-300 animate-pulse'
                            : 'bg-amber-400 hover:bg-amber-500 text-slate-900 hover:scale-105 active:scale-95'
                        }`}
                        title={isSpeaking ? 'Dayandır' : ui.listen}
                      >
                        {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Visual Scene in Lesson (if present) */}
                  {activeLesson.visualScene ? (
                    <VisualSceneCard scene={activeLesson.visualScene} activeLang={activeLang} />
                  ) : (
                    /* Big Emojis Showcase */
                    activeLesson.bigEmojis && activeLesson.bigEmojis.length > 0 && (
                      <div className="bg-gradient-to-b from-amber-50/70 to-orange-50/50 rounded-3xl border-2 border-amber-200/80 p-6 flex items-center justify-center gap-4 sm:gap-6 flex-wrap shadow-inner">
                        {activeLesson.bigEmojis.map((em, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                            className="text-6xl sm:text-7xl md:text-8xl p-3 bg-white/90 rounded-3xl border-2 border-amber-200/80 shadow-md cursor-pointer filter drop-shadow select-none"
                          >
                            {em}
                          </motion.div>
                        ))}
                      </div>
                    )
                  )}

                  {/* Explanation Text */}
                  <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-xs">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                        {activeLang === 'en'
                          ? activeLesson.explanationEn || activeLesson.explanationAz
                          : activeLang === 'ru'
                          ? activeLesson.explanationRu || activeLesson.explanationAz
                          : activeLesson.explanationAz}
                      </p>
                    </div>
                  </div>

                  {/* Understood Action Button */}
                  <button
                    onClick={handleAcknowledgeLesson}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <span>{ui.understoodStartPractice}</span>
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                /* ── B. PRACTICE QUESTION VIEW: After lesson acknowledgement ── */
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Question / Instruction Header */}
                  <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
                        <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide">
                          {ui.task} {currentIndex + 1} / {module.activities.length}
                        </span>

                        {/* Review Lesson Button */}
                        {activeLesson && (
                          <button
                            onClick={handleReviewLesson}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-300/80 transition-all cursor-pointer"
                            title={ui.viewLesson}
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>{ui.viewLesson}</span>
                          </button>
                        )}

                        {/* Trilingual Language Selector */}
                        <div className="inline-flex items-center bg-amber-200/70 p-0.5 rounded-lg border border-amber-300/80">
                          {(['az', 'en', 'ru'] as const).map((lng) => (
                            <button
                              key={lng}
                              onClick={() => handleLanguageChange(lng)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase transition-all cursor-pointer ${
                                activeLang === lng
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'text-amber-950/70 hover:bg-amber-300/60'
                              }`}
                            >
                              {lng}
                            </button>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                        {questionText}
                      </h3>
                    </div>

                    {/* Səs işarəsi: Only speaks when tapped */}
                    <button
                      onClick={handleSpeakQuestion}
                      className={`p-3 rounded-2xl transition-all shadow-sm flex items-center justify-center cursor-pointer flex-shrink-0 self-end sm:self-center ${
                        isSpeaking
                          ? 'bg-amber-500 text-white ring-4 ring-amber-300 animate-pulse'
                          : 'bg-amber-400 hover:bg-amber-500 text-slate-900 hover:scale-105 active:scale-95'
                      }`}
                      title={isSpeaking ? 'Dayandır' : ui.listen}
                    >
                      {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Visual Scene (Spatial Scene or Math Formula Display) */}
                  {currentActivity.visualScene && (
                    <VisualSceneCard scene={currentActivity.visualScene} activeLang={activeLang} />
                  )}

                  {/* 1. Multiple Choice Options (Super-Sized Emojis for Children) */}
                  {currentActivity.options && currentActivity.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {currentActivity.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        const optionLabel = getOptionLabel(opt);
                        return (
                          <button
                            key={opt.id}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(opt)}
                            className={`min-h-[140px] sm:min-h-[160px] p-5 sm:p-6 rounded-3xl border-3 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer text-center group ${
                              isSelected
                                ? opt.isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-lg scale-102 ring-4 ring-emerald-200'
                                  : 'bg-rose-50 border-rose-500 text-rose-900 scale-102 ring-4 ring-rose-200'
                                : 'bg-slate-50/90 border-slate-200 hover:bg-amber-50 hover:border-amber-400 text-slate-800 shadow-sm hover:shadow-md'
                            }`}
                          >
                            {opt.emoji && (
                              <span className="text-6xl sm:text-7xl md:text-8xl select-none filter drop-shadow transform transition-transform group-hover:scale-110">
                                {opt.emoji}
                              </span>
                            )}
                            <span className="font-black text-base sm:text-lg leading-tight">
                              {optionLabel}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 2. Sentence Builder UI */}
                  {currentActivity.type === 'sentence' && (
                    <div className="space-y-4">
                      <div className="min-h-[64px] p-3 rounded-2xl bg-amber-100/50 border-2 border-dashed border-amber-300 flex flex-wrap gap-2 items-center justify-center">
                        {selectedWords.length === 0 ? (
                          <span className="text-xs text-slate-400 font-bold">
                            {ui.sentencePrompt}
                          </span>
                        ) : (
                          selectedWords.map((word, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleRemoveWord(word)}
                              className="px-4 py-2 bg-amber-400 text-slate-900 font-black rounded-xl text-sm sm:text-base shadow-sm hover:bg-amber-500 transition-all cursor-pointer"
                            >
                              {word} ✕
                            </button>
                          ))
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2.5 justify-center">
                        {availableWords.map((word, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleWordClick(word)}
                            disabled={isAnswered}
                            className="px-4 py-2.5 bg-slate-100 hover:bg-amber-200 text-slate-800 font-black rounded-xl text-sm sm:text-base transition-all border border-slate-300 cursor-pointer shadow-xs"
                          >
                            {word}
                          </button>
                        ))}
                      </div>

                      {!isAnswered && selectedWords.length > 0 && (
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={checkSentence}
                            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-md transition-all cursor-pointer"
                          >
                            {ui.checkSentence}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. Sequence Steps UI */}
                  {currentActivity.type === 'sequence' && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 text-center">
                        {ui.sequencePrompt}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentActivity.sequenceSteps?.map((step) => (
                          <div
                            key={step.id}
                            className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3.5 shadow-xs"
                          >
                            <span className="text-4xl select-none filter drop-shadow-xs">{step.emoji}</span>
                            <span className="text-sm sm:text-base font-bold text-slate-800">
                              {activeLang === 'en'
                                ? step.textEn || step.text
                                : activeLang === 'ru'
                                ? step.textRu || step.text
                                : step.text}
                            </span>
                          </div>
                        ))}
                      </div>
                      {!isAnswered && (
                        <div className="flex justify-center pt-3">
                          <button
                            onClick={() => {
                              setIsAnswered(true);
                              setScore((s) => s + 10);
                              setFeedback({
                                isCorrect: true,
                                text: currentLocalizedExplanation || ui.correctAnswer,
                              });
                              addStars(1);
                            }}
                            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-md cursor-pointer"
                          >
                            {ui.sequenceComplete}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Feedback Alert */}
                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-black ${
                          feedback.isCorrect
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {feedback.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-rose-600 flex-shrink-0" />
                          )}
                          <span>{feedback.text}</span>
                        </div>

                        <button
                          onClick={handleNext}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 shadow cursor-pointer flex-shrink-0"
                        >
                          <span>{currentIndex < activeActivities.length - 1 ? ui.next : ui.finish}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ) : (
            /* Finished View */
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-xl shadow-amber-400/30 animate-bounce select-none">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {ui.congratsTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-md mx-auto">
                  "{moduleTitle}" {ui.congratsDesc}{' '}
                  <span className="text-amber-600 font-black">{score} {ui.pointsEarned}</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{ui.playAgain}</span>
                </button>
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-amber-400/20 cursor-pointer"
                >
                  {ui.backToHub}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningActivityPlayer;
