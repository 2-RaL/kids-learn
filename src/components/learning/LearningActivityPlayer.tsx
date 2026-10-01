import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Volume2, VolumeX, Sparkles, CheckCircle2, RotateCcw,
  ArrowRight, Award, Star, ArrowLeft
} from 'lucide-react';
import type { LearningModuleCategory, LearningActivityItem } from '../../data/learningModulesData';
import { ACTIVITY_TRANSLATIONS, UI_TRANSLATIONS } from '../../data/learningTranslations';
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
  const [activeLang, setActiveLang] = useState<'az' | 'en' | 'ru'>((language as any) || 'az');
  const [isSpeaking, setIsSpeaking] = useState(false);

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
  const ui = UI_TRANSLATIONS[activeLang] || UI_TRANSLATIONS.az;

  // Stop all background audio and speech on mount, unmount, or question switch
  useEffect(() => {
    parentSpeech.stop();
    setIsSpeaking(false);

    if (!currentActivity) return;
    setSelectedOptionId(null);
    setIsAnswered(false);
    setFeedback(null);

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

  // On-demand speech strictly when child clicks the sound icon
  const handleSpeak = () => {
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

    if (currentIndex < module.activities.length - 1) {
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
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
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
            <span className="text-3xl sm:text-4xl filter drop-shadow">{module.emoji}</span>
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
              width: `${((currentIndex + 1) / module.activities.length) * 100}%`,
            }}
          />
        </div>

        {/* Body Content */}
        <div className="flex-1 p-5 sm:p-8 overflow-y-auto flex flex-col justify-between">
          {!isFinished && currentActivity ? (
            <div className="space-y-6">
              {/* Question / Instruction Header */}
              <div className="bg-amber-50/90 rounded-2xl p-4 sm:p-5 border border-amber-200/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
                    <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wide">
                      {ui.task} {currentIndex + 1} / {module.activities.length}
                    </span>

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
                  onClick={handleSpeak}
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

              {/* 1. Multiple Choice Options */}
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
                        className={`p-4 sm:p-5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer text-center ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-md scale-102'
                              : 'bg-rose-50 border-rose-500 text-rose-900 scale-102'
                            : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-800'
                        }`}
                      >
                        {opt.emoji && <span className="text-4xl sm:text-5xl">{opt.emoji}</span>}
                        <span className="font-extrabold text-sm sm:text-base">{optionLabel}</span>
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
                        {ui.sentencePrompt}
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
                        {ui.checkSentence}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 3. Sequence Steps UI */}
              {currentActivity.type === 'sequence' && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 text-center">
                    {ui.sequencePrompt}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentActivity.sequenceSteps?.map((step) => (
                      <div
                        key={step.id}
                        className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center gap-3"
                      >
                        <span className="text-2xl">{step.emoji}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {activeLang === 'en' ? step.textEn || step.text : activeLang === 'ru' ? step.textRu || step.text : step.text}
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
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md cursor-pointer"
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
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1 shadow cursor-pointer flex-shrink-0"
                    >
                      <span>{currentIndex < module.activities.length - 1 ? ui.next : ui.finish}</span>
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
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{ui.playAgain}</span>
                </button>
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 cursor-pointer"
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
