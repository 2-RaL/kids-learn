// src/components/parent/ParentChess.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Award,
  BookOpen,
  HelpCircle,
  Shield,
  Layers,
  Info
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { parentSpeech } from '../../utils/parentSpeech';
import {
  CHESS_LEVELS,
  CHESS_LESSONS,
  PIECE_INFO,
  ChessLesson
} from '../../data/parentChessData';

// Visual piece map (Unicode chess pieces styled with SVG-like fidelity)
const PIECE_SYMBOLS: Record<string, { symbol: string; isWhite: boolean }> = {
  wK: { symbol: '♔', isWhite: true },
  wQ: { symbol: '♕', isWhite: true },
  wR: { symbol: '♖', isWhite: true },
  wB: { symbol: '♗', isWhite: true },
  wN: { symbol: '♘', isWhite: true },
  wP: { symbol: '♙', isWhite: true },
  bK: { symbol: '♚', isWhite: false },
  bQ: { symbol: '♛', isWhite: false },
  bR: { symbol: '♜', isWhite: false },
  bB: { symbol: '♝', isWhite: false },
  bN: { symbol: '♞', isWhite: false },
  bP: { symbol: '♟', isWhite: false }
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

export const ParentChess: React.FC = () => {
  const { language } = useGameStore(); // 'az' | 'en' | 'ru'
  const currentLang = language || 'az';

  // Navigation state
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [tabMode, setTabMode] = useState<'learn' | 'practice'>('learn');

  // Interactive board state for exercise
  const [boardState, setBoardState] = useState<Record<string, string>>({});
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [exerciseStatus, setExerciseStatus] = useState<'idle' | 'success' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showPieceGuide, setShowPieceGuide] = useState<boolean>(false);

  // Audio narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Filter lessons for selected level
  const levelLessons = CHESS_LESSONS.filter(l => l.level === selectedLevel);
  const currentLesson: ChessLesson = levelLessons[activeLessonIdx] || CHESS_LESSONS[0];

  // Reset exercise board whenever lesson changes or tab changes
  useEffect(() => {
    resetBoard();
    setIsPlayingAudio(false);
    parentSpeech.stop();
  }, [currentLesson.id, tabMode]);

  const resetBoard = () => {
    if (tabMode === 'practice') {
      setBoardState({ ...currentLesson.exercise.initialBoard });
    } else {
      setBoardState({ ...currentLesson.demonstrationBoard.pieces });
    }
    setSelectedSquare(null);
    setExerciseStatus('idle');
    setShowHint(false);
  };

  // Play narration for the current view
  const handleToggleVoice = () => {
    if (isPlayingAudio) {
      parentSpeech.stop();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak =
      tabMode === 'learn'
        ? currentLesson.theoryVoice[currentLang]
        : currentLesson.exercise.speechPrompt[currentLang];

    setIsPlayingAudio(true);
    parentSpeech.speakQuick(
      textToSpeak,
      currentLang,
      () => {
        setIsPlayingAudio(false);
      },
      () => {
        setIsPlayingAudio(false);
      }
    );
  };

  // Handle board square clicks in exercise mode
  const handleSquareClick = (square: string) => {
    if (tabMode !== 'practice') return;
    if (exerciseStatus === 'success') return;

    const pieceOnSquare = boardState[square];
    const exercise = currentLesson.exercise;

    // Type 1: select-square or place-piece
    if (exercise.type === 'select-square' || exercise.type === 'place-piece') {
      if (exercise.targetSquares?.includes(square)) {
        if (exercise.type === 'place-piece') {
          setBoardState({ ...boardState, [square]: 'wQ' });
        }
        setExerciseStatus('success');
        playSuccessAudio();
      } else {
        setExerciseStatus('incorrect');
      }
      return;
    }

    // Type 2: move-piece or capture or checkmate
    if (!selectedSquare) {
      // Must select a piece first
      if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
        setSelectedSquare(square);
        setExerciseStatus('idle');
      }
      return;
    }

    // A piece is already selected, now clicking destination square
    if (selectedSquare === square) {
      // Deselect
      setSelectedSquare(null);
      return;
    }

    // Check if the move is valid
    const isMatchingMove = exercise.validMove?.some(
      m => m.from === selectedSquare && m.to === square
    );

    if (isMatchingMove || exercise.targetSquares?.includes(square)) {
      // Valid move!
      const movingPiece = boardState[selectedSquare];
      const newBoard = { ...boardState };
      delete newBoard[selectedSquare];

      // Promotion check for lesson 7
      if (exercise.id === 'ex-7-1' && square === 'e8') {
        newBoard[square] = 'wQ'; // Promoted to Queen!
      } else {
        newBoard[square] = movingPiece;
      }

      setBoardState(newBoard);
      setSelectedSquare(null);
      setExerciseStatus('success');
      playSuccessAudio();
    } else {
      setExerciseStatus('incorrect');
      // If clicking another friendly piece, re-select
      if (pieceOnSquare && pieceOnSquare.startsWith('w')) {
        setSelectedSquare(square);
      } else {
        setSelectedSquare(null);
      }
    }
  };

  const playSuccessAudio = () => {
    const praiseTexts = {
      az: 'Əhsən! Doğru gediş!',
      en: 'Bravo! Correct move!',
      ru: 'Браво! Верный ход!'
    };
    parentSpeech.speakQuick(praiseTexts[currentLang], currentLang);
  };

  const handleNextLesson = () => {
    parentSpeech.stop();
    setIsPlayingAudio(false);
    if (activeLessonIdx < levelLessons.length - 1) {
      setActiveLessonIdx(activeLessonIdx + 1);
    } else if (selectedLevel < 9) {
      setSelectedLevel(selectedLevel + 1);
      setActiveLessonIdx(0);
    }
  };

  const handlePrevLesson = () => {
    parentSpeech.stop();
    setIsPlayingAudio(false);
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(activeLessonIdx - 1);
    } else if (selectedLevel > 1) {
      setSelectedLevel(selectedLevel - 1);
      setActiveLessonIdx(0);
    }
  };

  // Multilingual UI strings
  const UI_TEXT = {
    az: {
      heading: 'Uşaqlar üçün Şahmat Məktəbi',
      subheading: '64 xana, sehrli fiqurlar, maraqlı qaydalar və interaktiv tapşırıqlar',
      listenTheory: 'Dərsi Dinlə',
      listenExercise: 'Tapşırığı Dinlə',
      stopAudio: 'Səsi Dayandır',
      learnTab: '📖 Dərs və Qaydalar',
      practiceTab: '🎯 İnteraktiv Məşq',
      keyFacts: 'Yadda Saxla',
      nextLesson: 'Növbəti Dərs',
      prevLesson: 'Əvvəlki Dərs',
      tryAgain: 'Yenidən Cəhd Et',
      hint: 'İpucu göstər',
      correct: 'Təbriklər! Mükəmməl gediş!',
      tryAgainMsg: 'Yanlış xana! Diqqətlə bax və yenidən yoxla.',
      pieceGuide: 'Fiqur Bələdçisi (Xallar və Güclər)',
      close: 'Bağla'
    },
    en: {
      heading: 'Kids Chess Academy',
      subheading: '64 squares, magical pieces, fun rules, and interactive challenges',
      listenTheory: 'Listen to Lesson',
      listenExercise: 'Listen to Task',
      stopAudio: 'Stop Audio',
      learnTab: '📖 Lesson & Rules',
      practiceTab: '🎯 Interactive Practice',
      keyFacts: 'Key Rules',
      nextLesson: 'Next Lesson',
      prevLesson: 'Previous Lesson',
      tryAgain: 'Try Again',
      hint: 'Show Hint',
      correct: 'Congratulations! Excellent move!',
      tryAgainMsg: 'Not quite! Look carefully and try again.',
      pieceGuide: 'Piece Guide (Points & Powers)',
      close: 'Close'
    },
    ru: {
      heading: 'Детская Шахматная Школа',
      subheading: '64 клетки, волшебные фигуры, правила и интерактивные упражнения',
      listenTheory: 'Слушать урок',
      listenExercise: 'Слушать задание',
      stopAudio: 'Остановить аудио',
      learnTab: '📖 Урок и Правила',
      practiceTab: '🎯 Интерактивная Практика',
      keyFacts: 'Запомни',
      nextLesson: 'Следующий Урок',
      prevLesson: 'Предыдущий Урок',
      tryAgain: 'Попробовать снова',
      hint: 'Показать подсказку',
      correct: 'Поздравляем! Отличный ход!',
      tryAgainMsg: 'Не совсем верно! Посмотри внимательно и попробуй снова.',
      pieceGuide: 'Справочник Фигур (Очки и Сила)',
      close: 'Закрыть'
    }
  }[currentLang];

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-indigo-50/50 p-4 sm:p-6 rounded-3xl shadow-sm border border-amber-200/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">♟️</span>
            <span className="text-xs font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
              CHESS ACADEMY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {UI_TEXT.heading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            {UI_TEXT.subheading}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Piece Guide Button */}
          <button
            onClick={() => setShowPieceGuide(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl text-xs font-bold transition-all shadow-sm border border-slate-200 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">{UI_TEXT.pieceGuide}</span>
            <span className="sm:hidden">Fiqurlar</span>
          </button>

          {/* Voice Narration Button */}
          <button
            onClick={handleToggleVoice}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-sm cursor-pointer border ${
              isPlayingAudio
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700 shadow-indigo-200'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{UI_TEXT.stopAudio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{tabMode === 'learn' ? UI_TEXT.listenTheory : UI_TEXT.listenExercise}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Level Selection Ribbon (Levels 1 to 9) */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {CHESS_LEVELS.map(lvl => {
            const isSelected = lvl.level === selectedLevel;
            return (
              <button
                key={lvl.level}
                onClick={() => {
                  setSelectedLevel(lvl.level);
                  setActiveLessonIdx(0);
                  parentSpeech.stop();
                  setIsPlayingAudio(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-400'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                }`}
              >
                <span>{lvl.icon}</span>
                <span>{lvl.name[currentLang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace: Left Column (Board) & Right Column (Lesson / Practice Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN: CHESSBOARD ================= */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-100 flex flex-col items-center">
          {/* Mode Switcher Tabs */}
          <div className="w-full grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl mb-4">
            <button
              onClick={() => setTabMode('learn')}
              className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                tabMode === 'learn'
                  ? 'bg-white text-indigo-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{UI_TEXT.learnTab}</span>
            </button>
            <button
              onClick={() => setTabMode('practice')}
              className={`py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                tabMode === 'practice'
                  ? 'bg-white text-emerald-700 shadow-sm font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{UI_TEXT.practiceTab}</span>
              {exerciseStatus === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
            </button>
          </div>

          {/* Interactive Responsive 8x8 Chessboard */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square select-none">
            {/* Rank Coordinates on Left (8 down to 1) */}
            <div className="absolute -left-5 top-0 bottom-0 flex flex-col justify-around text-[10px] sm:text-xs font-black text-slate-400 select-none">
              {RANKS.map(r => (
                <span key={r} className="h-6 flex items-center justify-center">
                  {r}
                </span>
              ))}
            </div>

            {/* Board Container with Border & Shadow */}
            <div className="w-full h-full border-4 border-amber-950/80 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-8 grid-rows-8 bg-amber-50">
              {RANKS.map((rank, rIdx) =>
                FILES.map((file, fIdx) => {
                  const square = `${file}${rank}`;
                  const isDark = (rIdx + fIdx) % 2 === 1;
                  const pieceCode = boardState[square];
                  const pieceObj = pieceCode ? PIECE_SYMBOLS[pieceCode] : null;

                  // Highlighting logic
                  const isSelected = selectedSquare === square;
                  const isDemoHighlight =
                    tabMode === 'learn' &&
                    currentLesson.demonstrationBoard.highlightSquares?.includes(square);
                  const isTargetSquare =
                    tabMode === 'practice' &&
                    selectedSquare &&
                    currentLesson.exercise.targetSquares?.includes(square);

                  return (
                    <div
                      key={square}
                      onClick={() => handleSquareClick(square)}
                      className={`relative flex items-center justify-center transition-all cursor-pointer ${
                        isDark ? 'bg-[#b58863]' : 'bg-[#f0d9b5]'
                      } ${isSelected ? 'ring-4 ring-indigo-500 ring-inset z-10' : ''}`}
                    >
                      {/* Demo highlight square marker (glow or dot) */}
                      {isDemoHighlight && (
                        <div className="absolute inset-1 rounded-lg bg-emerald-400/40 ring-2 ring-emerald-500/80 animate-pulse pointer-events-none" />
                      )}

                      {/* Interactive target helper pulse in practice mode */}
                      {isTargetSquare && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 ring-4 ring-emerald-300 shadow-md animate-ping pointer-events-none" />
                      )}

                      {/* Piece Icon */}
                      {pieceObj && (
                        <motion.div
                          animate={isSelected ? { scale: [1, 1.15, 1], y: -4 } : { scale: 1, y: 0 }}
                          transition={{ duration: 0.5, repeat: isSelected ? Infinity : 0 }}
                          className={`text-3xl sm:text-4xl md:text-5xl font-black select-none leading-none ${
                            pieceObj.isWhite
                              ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]'
                              : 'text-slate-950 drop-shadow-[0_2px_3px_rgba(255,255,255,0.4)]'
                          }`}
                        >
                          {pieceObj.symbol}
                        </motion.div>
                      )}

                      {/* Small coordinate indicator in corners */}
                      {rank === 1 && (
                        <span
                          className={`absolute bottom-0.5 right-1 text-[8px] font-bold ${
                            isDark ? 'text-[#f0d9b5]/60' : 'text-[#b58863]/80'
                          }`}
                        >
                          {file}
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* File Coordinates on Bottom (a through h) */}
            <div className="absolute -bottom-5 left-0 right-0 flex justify-around text-[10px] sm:text-xs font-black text-slate-400 select-none">
              {FILES.map(f => (
                <span key={f} className="w-6 text-center">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Board Footer status & Reset Button */}
          <div className="w-full flex items-center justify-between mt-8 pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400">
              {tabMode === 'learn'
                ? '🟢 Yaşıl xanalar nümunə hərəkətlərdir'
                : '👆 Fiqura toxunun, sonra hədəf xananı seçin'}
            </span>
            <button
              onClick={resetBoard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{UI_TEXT.tryAgain}</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: LESSON THEORY OR EXERCISE ================= */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <AnimatePresence mode="wait">
            {tabMode === 'learn' ? (
              // ================= LEARN TAB CONTENT =================
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-100 space-y-5"
              >
                {/* Lesson Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-2xl shadow-inner">
                    {currentLesson.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800">
                      {currentLesson.title[currentLang]}
                    </h3>
                    <p className="text-xs text-amber-700 font-bold">
                      {currentLesson.subtitle[currentLang]}
                    </p>
                  </div>
                </div>

                {/* Lesson Summary Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
                    {currentLesson.summary[currentLang]}
                  </p>
                </div>

                {/* Detailed Theory Steps */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Dərs İzahı</span>
                  </h4>
                  <div className="space-y-2">
                    {currentLesson.theoryText[currentLang].map((paragraph, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-indigo-50/40 border border-indigo-100/60 text-xs sm:text-sm text-slate-800 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{paragraph}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Facts Capsule */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{UI_TEXT.keyFacts}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {currentLesson.keyFacts[currentLang].map((fact, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs font-bold text-amber-950"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Switch to Practice CTA */}
                <button
                  onClick={() => setTabMode('practice')}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{UI_TEXT.practiceTab}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              // ================= PRACTICE TAB CONTENT =================
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-100 space-y-5"
              >
                {/* Practice Challenge Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-200/70 px-2.5 py-0.5 rounded-full">
                    {currentLang === 'az'
                      ? 'İnteraktiv Tapşırıq'
                      : currentLang === 'en'
                      ? 'Interactive Challenge'
                      : 'Интерактивное Задание'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-800 mt-2">
                    {currentLesson.exercise.prompt[currentLang]}
                  </h3>
                </div>

                {/* Status Banners */}
                {exerciseStatus === 'success' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-start gap-3 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-xl font-bold shadow-sm">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-black text-sm sm:text-base text-emerald-950">
                        {UI_TEXT.correct}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-0.5">
                        {currentLesson.exercise.explanation[currentLang]}
                      </p>
                    </div>
                  </motion.div>
                )}

                {exerciseStatus === 'incorrect' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2"
                  >
                    <span>⚠️</span>
                    <span>{UI_TEXT.tryAgainMsg}</span>
                  </motion.div>
                )}

                {/* Hint Toggle */}
                <div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'İpucunu gizlət' : UI_TEXT.hint}</span>
                  </button>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900"
                    >
                      {currentLesson.exercise.hint[currentLang]}
                    </motion.div>
                  )}
                </div>

                {/* Lesson Pagination Nav */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={handlePrevLesson}
                    disabled={selectedLevel === 1 && activeLessonIdx === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{UI_TEXT.prevLesson}</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition-all shadow-md cursor-pointer"
                  >
                    <span>{UI_TEXT.nextLesson}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Piece Guide Modal / Drawer */}
      <AnimatePresence>
        {showPieceGuide && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-black text-slate-800">
                    {UI_TEXT.pieceGuide}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPieceGuide(false)}
                  className="px-3 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 cursor-pointer"
                >
                  {UI_TEXT.close}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(PIECE_INFO).map(([key, info]) => (
                  <div
                    key={key}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-3xl text-slate-900">{info.symbol}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                        {currentLang === 'az'
                          ? `${info.value} Xal`
                          : currentLang === 'en'
                          ? `${info.value} Pts`
                          : `${info.value} Оч.`}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-800 text-sm">
                      {info.name[currentLang]}
                    </h4>
                    <p className="text-xs text-slate-600 leading-snug">
                      {info.desc[currentLang]}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentChess;
