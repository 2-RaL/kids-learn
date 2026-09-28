import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';

interface LogicAnswer {
  id: number;
  answer_text: string;
  image_url: string | null;
  is_correct: boolean | number;
}

interface LogicQuestion {
  id: number;
  question_text: string;
  question_type: string;
  image_url: string | null;
  min_age: number;
  max_age: number;
  difficulty: string;
  explanation: string | null;
  answers: LogicAnswer[];
}

interface ParentLogicProps {
  selectedAge?: number | null;
}

export const ParentLogic: React.FC<ParentLogicProps> = ({ selectedAge }) => {
  const { token } = useAuthStore();
  const [questions, setQuestions] = useState<LogicQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  useEffect(() => {
    fetchQuestions();
  }, [selectedAge, token]);

  const fetchQuestions = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      let url = apiUrl('/api/parent/logic-questions');
      if (selectedAge) url += `?age=${selectedAge}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.questions?.length > 0) {
        setQuestions(data.questions);
      } else {
        // Fallback default logic questions
        setQuestions([
          {
            id: 1,
            question_text: 'Hansı əşya digərlərindən fərqlidir?',
            question_type: 'visual',
            image_url: null,
            min_age: 3,
            max_age: 6,
            difficulty: 'easy',
            explanation: 'Avtomobil nəqliyyat vasitəsidir, meyvə deyil.',
            answers: [
              { id: 101, answer_text: '🍎 Alma', image_url: null, is_correct: false },
              { id: 102, answer_text: '🍊 Portağal', image_url: null, is_correct: false },
              { id: 103, answer_text: '🚗 Maşın', image_url: null, is_correct: true },
              { id: 104, answer_text: '🍌 Banan', image_url: null, is_correct: false },
            ],
          },
          {
            id: 2,
            question_text: 'Qırmızı rəngdə olan meyvə hansıdır?',
            question_type: 'color',
            image_url: null,
            min_age: 3,
            max_age: 6,
            difficulty: 'easy',
            explanation: 'Çiyələk parlaq qırmızı rəngdə olur.',
            answers: [
              { id: 201, answer_text: '🍓 Çiyələk', image_url: null, is_correct: true },
              { id: 202, answer_text: '🍋 Limon', image_url: null, is_correct: false },
              { id: 203, answer_text: '🫐 Qaragilə', image_url: null, is_correct: false },
            ],
          },
          {
            id: 3,
            question_text: 'Hansı heyvan uça bilir?',
            question_type: 'classification',
            image_url: null,
            min_age: 4,
            max_age: 7,
            difficulty: 'easy',
            explanation: 'Qaranquş qanadları olan və uçan quşdur.',
            answers: [
              { id: 301, answer_text: '🐶 İt', image_url: null, is_correct: false },
              { id: 302, answer_text: '🐦 Quş', image_url: null, is_correct: true },
              { id: 303, answer_text: '🐱 Pişik', image_url: null, is_correct: false },
            ],
          },
        ]);
      }
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const playFeedbackSound = (isCorrect: boolean) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {}
  };

  const handleSelectAnswer = (ans: LogicAnswer) => {
    if (isAnswered) return;
    setSelectedAnswerId(ans.id);
    setIsAnswered(true);

    const isCorrect = !!ans.is_correct;
    playFeedbackSound(isCorrect);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        text: 'Əla! Düzgün cavab! 🎉',
      });
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        text: 'Yaxın idi! Bir daha diqqətlə bax 💭',
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
      // Finished all
      setCurrentIndex(0);
      setSelectedAnswerId(null);
      setIsAnswered(false);
      setFeedback(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setFeedback(null);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
            <span className="text-2xl">🧠</span>
            Məntiq Oyunları
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Müşahidə, fərqləndirmə və məntiqi düşüncə qabiliyyətini inkişaf etdirən suallar
          </p>
        </div>

        {/* Score & Streak Counters */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 px-3.5 py-1.5 rounded-2xl border border-amber-200 flex items-center gap-1.5">
            <span className="text-base">⭐</span>
            <span className="text-xs font-bold text-amber-800">Xal:</span>
            <span className="text-sm font-black text-amber-600">{score}</span>
          </div>

          <div className="bg-purple-50 px-3.5 py-1.5 rounded-2xl border border-purple-200 flex items-center gap-1.5">
            <span className="text-base">🔥</span>
            <span className="text-xs font-bold text-purple-800">Seriya:</span>
            <span className="text-sm font-black text-purple-600">{streak}</span>
          </div>
        </div>
      </div>

      {/* Main Question Arena */}
      {isLoading ? (
        <div className="p-12 text-center text-slate-400 font-bold text-sm">
          Məntiq sualları yüklənir...
        </div>
      ) : !currentQ ? (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">🧩</div>
          <h3 className="text-base font-extrabold text-slate-700">Sual tapılmadı</h3>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 flex flex-col justify-between min-h-[420px]">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Sual {currentIndex + 1} / {questions.length}</span>
              <span className="capitalize">{currentQ.difficulty === 'easy' ? 'Sadə' : currentQ.difficulty}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
                {currentQ.question_text}
              </h3>
              {currentQ.image_url && (
                <div className="my-4 max-h-48 overflow-hidden rounded-2xl mx-auto flex items-center justify-center">
                  <img src={currentQ.image_url} alt="Sual" className="max-h-48 object-contain" />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {currentQ.answers?.map((ans) => {
                const isSelected = selectedAnswerId === ans.id;
                let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';

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
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    onClick={() => handleSelectAnswer(ans)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl font-extrabold text-sm sm:text-base border-2 transition-all flex items-center justify-center text-center cursor-pointer ${btnStyle}`}
                  >
                    <span>{ans.answer_text}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Next Button */}
          <div className="pt-4 border-t border-slate-100">
            {feedback ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className={`flex items-center gap-2 font-extrabold text-sm ${feedback.isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {feedback.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
                  <span>{feedback.text}</span>
                  {currentQ.explanation && (
                    <span className="text-xs font-semibold text-slate-500 hidden md:inline">({currentQ.explanation})</span>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Növbəti Sual' : 'Yenidən Başla'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-center text-slate-400 font-semibold">
                Düzgün cavabı tapmaq üçün variantlardan birinə toxunun 👆
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentLogic;
