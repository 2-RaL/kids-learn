import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, ChevronRight, Calculator, Plus, Minus, Volume2 } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';
import { parentSpeech } from '../../utils/parentSpeech';

interface MathAnswer {
  id: number;
  answer_text: string;
  is_correct: boolean | number;
}

interface MathQuestion {
  id: number;
  question_text: string;
  question_type: string;
  visual_elements: string | null;
  min_age: number;
  max_age: number;
  difficulty: string;
  explanation: string | null;
  answers: MathAnswer[];
}

interface ParentMathProps {
  selectedAge?: number | null;
}

export const ParentMath: React.FC<ParentMathProps> = ({ selectedAge }) => {
  const { token } = useAuthStore();
  const { language } = useGameStore();
  const currentLang = language || 'az';
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const MULTILINGUAL_MATH_QUESTIONS: Record<string, MathQuestion[]> = {
    az: [
      {
        id: 1,
        question_text: 'Şəkildə neçə qırmızı alma var?',
        question_type: 'counting',
        visual_elements: '🍎🍎🍎',
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: '1, 2, 3 alma var.',
        answers: [
          { id: 11, answer_text: '2', is_correct: false },
          { id: 12, answer_text: '3', is_correct: true },
          { id: 13, answer_text: '4', is_correct: false },
        ],
      },
      {
        id: 2,
        question_text: '2 + 1 cəmi neçə edir?',
        question_type: 'addition',
        visual_elements: '⭐ ⭐ + ⭐',
        min_age: 4,
        max_age: 7,
        difficulty: 'easy',
        explanation: '2 ulduza 1 ulduz əlavə etsək 3 olar.',
        answers: [
          { id: 21, answer_text: '3', is_correct: true },
          { id: 22, answer_text: '4', is_correct: false },
          { id: 23, answer_text: '5', is_correct: false },
        ],
      },
      {
        id: 3,
        question_text: 'Hansı ədəd daha böyükdür?',
        question_type: 'comparison',
        visual_elements: '5  və  2',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: '5 ədədi 2-dən böyükdür.',
        answers: [
          { id: 31, answer_text: '5', is_correct: true },
          { id: 32, answer_text: '2', is_correct: false },
        ],
      },
      {
        id: 4,
        question_text: '4 - 1 fərqi neçə edir?',
        question_type: 'subtraction',
        visual_elements: '🎈🎈🎈🎈 - 🎈',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: '4 şardan 1-i uçduqda 3 şar qalır.',
        answers: [
          { id: 41, answer_text: '2', is_correct: false },
          { id: 42, answer_text: '3', is_correct: true },
          { id: 43, answer_text: '5', is_correct: false },
        ],
      },
    ],
    en: [
      {
        id: 1,
        question_text: 'How many red apples are in the picture?',
        question_type: 'counting',
        visual_elements: '🍎🍎🍎',
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'There are 1, 2, 3 apples.',
        answers: [
          { id: 11, answer_text: '2', is_correct: false },
          { id: 12, answer_text: '3', is_correct: true },
          { id: 13, answer_text: '4', is_correct: false },
        ],
      },
      {
        id: 2,
        question_text: 'What is 2 + 1?',
        question_type: 'addition',
        visual_elements: '⭐ ⭐ + ⭐',
        min_age: 4,
        max_age: 7,
        difficulty: 'easy',
        explanation: '2 stars plus 1 star equals 3 stars.',
        answers: [
          { id: 21, answer_text: '3', is_correct: true },
          { id: 22, answer_text: '4', is_correct: false },
          { id: 23, answer_text: '5', is_correct: false },
        ],
      },
      {
        id: 3,
        question_text: 'Which number is greater?',
        question_type: 'comparison',
        visual_elements: '5  and  2',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'Number 5 is greater than 2.',
        answers: [
          { id: 31, answer_text: '5', is_correct: true },
          { id: 32, answer_text: '2', is_correct: false },
        ],
      },
      {
        id: 4,
        question_text: 'What is 4 - 1?',
        question_type: 'subtraction',
        visual_elements: '🎈🎈🎈🎈 - 🎈',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'If 1 balloon flies away from 4, 3 remain.',
        answers: [
          { id: 41, answer_text: '2', is_correct: false },
          { id: 42, answer_text: '3', is_correct: true },
          { id: 43, answer_text: '5', is_correct: false },
        ],
      },
    ],
    ru: [
      {
        id: 1,
        question_text: 'Сколько красных яблок на картинке?',
        question_type: 'counting',
        visual_elements: '🍎🍎🍎',
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'Здесь ровно 1, 2, 3 яблока.',
        answers: [
          { id: 11, answer_text: '2', is_correct: false },
          { id: 12, answer_text: '3', is_correct: true },
          { id: 13, answer_text: '4', is_correct: false },
        ],
      },
      {
        id: 2,
        question_text: 'Сколько будет 2 + 1?',
        question_type: 'addition',
        visual_elements: '⭐ ⭐ + ⭐',
        min_age: 4,
        max_age: 7,
        difficulty: 'easy',
        explanation: 'К двум звёздочкам прибавим одну — получится 3.',
        answers: [
          { id: 21, answer_text: '3', is_correct: true },
          { id: 22, answer_text: '4', is_correct: false },
          { id: 23, answer_text: '5', is_correct: false },
        ],
      },
      {
        id: 3,
        question_text: 'Какое число больше?',
        question_type: 'comparison',
        visual_elements: '5  и  2',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'Число 5 больше, чем 2.',
        answers: [
          { id: 31, answer_text: '5', is_correct: true },
          { id: 32, answer_text: '2', is_correct: false },
        ],
      },
      {
        id: 4,
        question_text: 'Сколько будет 4 - 1?',
        question_type: 'subtraction',
        visual_elements: '🎈🎈🎈🎈 - 🎈',
        min_age: 5,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'Если из четырёх шариков улетит один, останется 3.',
        answers: [
          { id: 41, answer_text: '2', is_correct: false },
          { id: 42, answer_text: '3', is_correct: true },
          { id: 43, answer_text: '5', is_correct: false },
        ],
      },
    ],
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedAge, token, currentLang]);

  const fetchQuestions = async () => {
    setQuestions(MULTILINGUAL_MATH_QUESTIONS[currentLang] || MULTILINGUAL_MATH_QUESTIONS.az);
  };

  const playFeedbackSound = (isCorrect: boolean) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {}
  };

  const handleSelectAnswer = (ans: MathAnswer) => {
    if (isAnswered) return;
    setSelectedAnswerId(ans.id);
    setIsAnswered(true);

    const isCorrect = !!ans.is_correct;
    playFeedbackSound(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback({
        isCorrect: true,
        text: 'Əhsən! Riyazi cavab tamamilə düzdür! 🎯',
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: 'Yenidən say və yoxla! 🧐',
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswerId(null);
      setIsAnswered(false);
      setFeedback(null);
    } else {
      setCurrentIndex(0);
      setSelectedAnswerId(null);
      setIsAnswered(false);
      setFeedback(null);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">🔢</span>
            Riyazi Əməllər və Sayma
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Əyləncəli vizual elementlər, toplama, sayma və rəqəm tanıma tapşırıqları
          </p>
        </div>

        {/* Score Counter */}
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 flex items-center gap-2 shadow-sm">
          <span className="text-xl">🏆</span>
          <span className="text-xs font-bold text-emerald-800">Uğurlu Xal:</span>
          <span className="text-base font-black text-emerald-600">{score}</span>
        </div>
      </div>

      {/* Question Arena */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-bold text-sm">
          Riyaziyyat sualları yüklənir...
        </div>
      ) : !currentQ ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">🧮</div>
          <h3 className="text-base font-extrabold text-slate-700">Sual tapılmadı</h3>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between min-h-[420px]">
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Sual {currentIndex + 1} / {questions.length}</span>
              <span>{currentQ.min_age}-{currentQ.max_age} yaş</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                  {currentQ.question_text}
                </h3>
                <button
                  onClick={() => parentSpeech.speakQuick(currentQ.question_text, currentLang)}
                  className="p-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors cursor-pointer shadow-xs border border-emerald-100"
                  title="Sualı səsli dinlə"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Visual Counting Objects */}
              {currentQ.visual_elements && (
                <div className="p-6 bg-emerald-50/60 rounded-3xl border border-emerald-100 inline-block mx-auto min-w-[200px]">
                  <p className="text-4xl sm:text-5xl tracking-widest animate-bounce">
                    {currentQ.visual_elements}
                  </p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
              {currentQ.answers?.map((ans) => {
                const isSelected = selectedAnswerId === ans.id;
                let btnStyle = 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200';

                if (isAnswered) {
                  if (ans.is_correct) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20';
                  } else if (isSelected && !ans.is_correct) {
                    btnStyle = 'bg-rose-500 text-white border-rose-400';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-transparent opacity-60';
                  }
                }

                return (
                  <motion.button
                    key={ans.id}
                    whileHover={!isAnswered ? { scale: 1.05 } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    onClick={() => handleSelectAnswer(ans)}
                    disabled={isAnswered}
                    className={`py-5 px-4 rounded-2xl font-black text-2xl border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm ${btnStyle}`}
                  >
                    <span>{ans.answer_text}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Next */}
          <div className="pt-4 border-t border-slate-100">
            {feedback ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className={`flex items-center gap-2 font-extrabold text-sm ${feedback.isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{feedback.text}</span>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Növbəti Tapşırıq' : 'Yenidən Başla'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-center text-slate-400 font-semibold">
                Düzgün say və ya nəticəni seçin 👆
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentMath;
