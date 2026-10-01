import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Volume2, Sparkles, CheckCircle2, RotateCcw,
  ArrowRight, Award, Star, ArrowLeft
} from 'lucide-react';
import type { LearningModuleCategory, LearningActivityItem } from '../../data/learningModulesData';
import { parentSpeech } from '../../utils/parentSpeech';
import { useGameStore } from '../../store/gameStore';

interface LearningActivityPlayerProps {
  module: LearningModuleCategory;
  onClose: () => void;
  onCompleteActivity?: (activityId: string, score: number) => void;
}

export const LearningActivityPlayer: React.FC<LearningActivityPlayerProps> = ({
  module,
  onClose,
  onCompleteActivity,
}) => {
  const { language, addStars } = useGameStore();
  const currentLang = language || 'az';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Sequence state
  const [sequenceItems, setSequenceItems] = useState<Array<{ id: string; text: string; order: number; emoji: string }>>([]);

  // Sentence building state
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const currentActivity: LearningActivityItem | undefined = module.activities[currentIndex];

  useEffect(() => {
    if (!currentActivity) return;
    setSelectedOptionId(null);
    setIsAnswered(false);
    setFeedback(null);

    // If sequence activity
    if (currentActivity.type === 'sequence' && currentActivity.sequenceSteps) {
      // Shuffle sequence steps
      const shuffled = [...currentActivity.sequenceSteps].sort(() => Math.random() - 0.5);
      setSequenceItems(shuffled);
    }

    // If sentence activity
    if (currentActivity.type === 'sentence' && currentActivity.sentenceWords) {
      const shuffled = [...currentActivity.sentenceWords].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setSelectedWords([]);
    }

    // Play target audio
    if (currentActivity.targetAudioText) {
      parentSpeech.speak(currentActivity.targetAudioText, currentLang);
    }
  }, [currentIndex, currentActivity?.id]);

  const handleSpeak = (text?: string) => {
    const textToSpeak = text || currentActivity?.targetAudioText || currentActivity?.instruction;
    if (textToSpeak) {
      parentSpeech.speak(textToSpeak, currentLang);
    }
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
        text: currentActivity?.explanation || 'Afərin! Düzgün cavab! 🌟',
      });
      parentSpeech.speak(currentActivity?.explanation || 'Afərin! Əla nəticə!', currentLang);
      addStars(1);
    } else {
      setFeedback({
        isCorrect: false,
        text: 'Bir daha cəhd et, sən bacaracaqsan! 💡',
      });
      parentSpeech.speak('Bir daha cəhd et!', currentLang);
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
        text: currentActivity.explanation || 'Möhtəşəm! Düzgün cümlə qurdun!',
      });
      parentSpeech.speak(currentActivity.explanation || 'Afərin! Cümlə hazırdır!', currentLang);
      addStars(1);
    } else {
      setFeedback({
        isCorrect: false,
        text: `Düzgün cümlə belə olmalıdır: "${currentActivity.correctSentence}"`,
      });
      parentSpeech.speak('Sözlərin sırasına bir də baxaq.', currentLang);
    }
  };

  const handleNext = () => {
    if (currentIndex < module.activities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (onCompleteActivity) {
        onCompleteActivity(module.id, score + 10);
      }
      parentSpeech.speak('Təbriklər! Bütün tapşırıqları uğurla tamamladın!', currentLang);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden relative">
        {/* Header Bar */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${module.color} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl filter drop-shadow">{module.emoji}</span>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                {module.titleAz}
              </span>
              <h2 className="text-base sm:text-xl font-black truncate max-w-[200px] sm:max-w-md">
                {currentActivity?.title || module.titleAz}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/25 px-2.5 py-1 rounded-xl text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{score}</span>
            </div>
            <button
              onClick={onClose}
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
              width: `${((currentIndex + 1) / module.activities.length) * 100}%`,
            }}
          />
        </div>

        {/* Body Content */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto flex flex-col justify-between">
          {!isFinished && currentActivity ? (
            <div className="space-y-6">
              {/* Question / Instruction Header */}
              <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide">
                    Tapşırıq {currentIndex + 1} / {module.activities.length}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                    {currentActivity.question || currentActivity.instruction}
                  </h3>
                </div>

                <button
                  onClick={() => handleSpeak()}
                  className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors shadow-sm flex-shrink-0 cursor-pointer"
                  title="Səsləndir"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* 1. Multiple Choice Options */}
              {currentActivity.options && currentActivity.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {currentActivity.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md scale-102'
                              : 'bg-rose-50 border-rose-500 text-rose-900 scale-102'
                            : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-800'
                        }`}
                      >
                        {opt.emoji && <span className="text-4xl sm:text-5xl">{opt.emoji}</span>}
                        <span className="font-extrabold text-sm sm:text-base">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. Sentence Builder UI */}
              {currentActivity.type === 'sentence' && (
                <div className="space-y-4">
                  <div className="min-h-[60px] p-3 rounded-2xl bg-amber-100/50 border-2 border-dashed border-amber-300 flex flex-wrap gap-2 items-center justify-center">
                    {selectedWords.length === 0 ? (
                      <span className="text-xs text-slate-400 font-bold">
                        Aşağıdakı sözlərə toxunaraq cümlə qur...
                      </span>
                    ) : (
                      selectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveWord(word)}
                          className="px-3.5 py-1.5 bg-amber-400 text-slate-900 font-black rounded-xl text-sm shadow-sm hover:bg-amber-500 transition-all cursor-pointer"
                        >
                          {word} ✕
                        </button>
                      ))
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {availableWords.map((word, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleWordClick(word)}
                        disabled={isAnswered}
                        className="px-4 py-2 bg-slate-100 hover:bg-amber-200 text-slate-800 font-bold rounded-xl text-sm transition-all border border-slate-300 cursor-pointer"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {!isAnswered && selectedWords.length > 0 && (
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={checkSentence}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer"
                      >
                        Cümləni Yoxla ✓
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Sequence Steps UI */}
              {currentActivity.type === 'sequence' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 text-center">
                    Düzgün ardıcıllıqla addımları təkrarlayaq:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentActivity.sequenceSteps?.map((step) => (
                      <div
                        key={step.id}
                        className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3"
                      >
                        <span className="text-2xl">{step.emoji}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">{step.text}</span>
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
                            text: currentActivity.explanation || 'Əla ardıcıllıqdır!',
                          });
                          parentSpeech.speak('Afərin! Bütün addımları düzgün anladın!', currentLang);
                          addStars(1);
                        }}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer"
                      >
                        Anladım və Tamamladım! ✓
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
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1 shadow cursor-pointer flex-shrink-0"
                    >
                      <span>{currentIndex < module.activities.length - 1 ? 'Növbəti' : 'Bitir'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Finished View */
            <div className="text-center py-8 space-y-5">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-xl shadow-amber-400/30 animate-bounce">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Təbriklər, Balaca Qəhrəman!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-md mx-auto">
                  "{module.titleAz}" bölməsindəki bütün tapşırıqları uğurla tamamladın və{' '}
                  <span className="text-amber-600 font-black">{score} xal</span> qazandın!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Yenidən Oyna</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 cursor-pointer"
                >
                  Təlim Bölmələrinə Qayıt
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
