import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, HelpCircle, Volume2 } from 'lucide-react';
import { apiUrl } from '../../config/api';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';
import { parentSpeech } from '../../utils/parentSpeech';

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

// Extracts leading emoji/smiley from answer strings so it can be rendered prominently for young children
const extractEmojiAndText = (str: string) => {
  if (!str) return { emoji: '', text: '' };
  const match = str.match(/^([\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{FE0E}\u{FE0F}\s]+)(.*)$/u);
  if (match && match[1] && match[1].trim()) {
    return {
      emoji: match[1].trim(),
      text: match[2]?.trim() || '',
    };
  }
  return { emoji: '', text: str.trim() };
};

export const ParentLogic: React.FC<ParentLogicProps> = ({ selectedAge }) => {
  const { token } = useAuthStore();
  const { language } = useGameStore();
  const currentLang = language || 'az';
  const [questions, setQuestions] = useState<LogicQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const MULTILINGUAL_LOGIC_QUESTIONS: Record<string, LogicQuestion[]> = {
    az: [
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
      {
        id: 4,
        question_text: 'Qış fəslində nə yağır?',
        question_type: 'nature',
        image_url: null,
        min_age: 4,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'Qışda hava soyuq olur və ağ qar yağır.',
        answers: [
          { id: 401, answer_text: '❄️ Qar', image_url: null, is_correct: true },
          { id: 402, answer_text: '🍂 Yarpaq', image_url: null, is_correct: false },
          { id: 403, answer_text: '☀️ Günəş şüası', image_url: null, is_correct: false },
        ],
      },
    ],
    en: [
      {
        id: 1,
        question_text: 'Which item is different from the others?',
        question_type: 'visual',
        image_url: null,
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'A car is a vehicle, not a fruit.',
        answers: [
          { id: 101, answer_text: '🍎 Apple', image_url: null, is_correct: false },
          { id: 102, answer_text: '🍊 Orange', image_url: null, is_correct: false },
          { id: 103, answer_text: '🚗 Car', image_url: null, is_correct: true },
          { id: 104, answer_text: '🍌 Banana', image_url: null, is_correct: false },
        ],
      },
      {
        id: 2,
        question_text: 'Which fruit is red?',
        question_type: 'color',
        image_url: null,
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'Strawberries are bright red.',
        answers: [
          { id: 201, answer_text: '🍓 Strawberry', image_url: null, is_correct: true },
          { id: 202, answer_text: '🍋 Lemon', image_url: null, is_correct: false },
          { id: 203, answer_text: '🫐 Blueberry', image_url: null, is_correct: false },
        ],
      },
      {
        id: 3,
        question_text: 'Which animal can fly?',
        question_type: 'classification',
        image_url: null,
        min_age: 4,
        max_age: 7,
        difficulty: 'easy',
        explanation: 'A bird has wings and can fly in the sky.',
        answers: [
          { id: 301, answer_text: '🐶 Dog', image_url: null, is_correct: false },
          { id: 302, answer_text: '🐦 Bird', image_url: null, is_correct: true },
          { id: 303, answer_text: '🐱 Cat', image_url: null, is_correct: false },
        ],
      },
      {
        id: 4,
        question_text: 'What falls from the sky in winter?',
        question_type: 'nature',
        image_url: null,
        min_age: 4,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'In cold winter weather, white snow falls.',
        answers: [
          { id: 401, answer_text: '❄️ Snow', image_url: null, is_correct: true },
          { id: 402, answer_text: '🍂 Leaves', image_url: null, is_correct: false },
          { id: 403, answer_text: '☀️ Sunlight', image_url: null, is_correct: false },
        ],
      },
    ],
    ru: [
      {
        id: 1,
        question_text: 'Какой предмет лишний среди остальных?',
        question_type: 'visual',
        image_url: null,
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'Машина — это транспортное средство, а не фрукт.',
        answers: [
          { id: 101, answer_text: '🍎 Яблоко', image_url: null, is_correct: false },
          { id: 102, answer_text: '🍊 Апельсин', image_url: null, is_correct: false },
          { id: 103, answer_text: '🚗 Машина', image_url: null, is_correct: true },
          { id: 104, answer_text: '🍌 Банан', image_url: null, is_correct: false },
        ],
      },
      {
        id: 2,
        question_text: 'Какая ягода красного цвета?',
        question_type: 'color',
        image_url: null,
        min_age: 3,
        max_age: 6,
        difficulty: 'easy',
        explanation: 'Клубника имеет ярко-красный цвет.',
        answers: [
          { id: 201, answer_text: '🍓 Клубника', image_url: null, is_correct: true },
          { id: 202, answer_text: '🍋 Лимон', image_url: null, is_correct: false },
          { id: 203, answer_text: '🫐 Черника', image_url: null, is_correct: false },
        ],
      },
      {
        id: 3,
        question_text: 'Кто из животных умеет летать?',
        question_type: 'classification',
        image_url: null,
        min_age: 4,
        max_age: 7,
        difficulty: 'easy',
        explanation: 'У птицы есть крылья, и она летает высоко в небе.',
        answers: [
          { id: 301, answer_text: '🐶 Собака', image_url: null, is_correct: false },
          { id: 302, answer_text: '🐦 Птица', image_url: null, is_correct: true },
          { id: 303, answer_text: '🐱 Кошка', image_url: null, is_correct: false },
        ],
      },
      {
        id: 4,
        question_text: 'Что падает с неба зимой?',
        question_type: 'nature',
        image_url: null,
        min_age: 4,
        max_age: 8,
        difficulty: 'easy',
        explanation: 'Зимой на улице холодно и идёт белый снег.',
        answers: [
          { id: 401, answer_text: '❄️ Снег', image_url: null, is_correct: true },
          { id: 402, answer_text: '🍂 Листья', image_url: null, is_correct: false },
          { id: 403, answer_text: '☀️ Солнечный свет', image_url: null, is_correct: false },
        ],
      },
    ],
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedAge, token, currentLang]);

  const fetchQuestions = async () => {
    setIsLoading(true);
    if (token) {
      try {
        let url = apiUrl('/api/parent/logic-questions');
        if (selectedAge) {
          url += `?age=${selectedAge}`;
        }
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions);
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Logic questions API fetch failed, fallback to multilingual default:', err);
      }
    }
    setQuestions(MULTILINGUAL_LOGIC_QUESTIONS[currentLang] || MULTILINGUAL_LOGIC_QUESTIONS.az);
    setIsLoading(false);
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
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-800">
                  {currentQ.question_text}
                </h3>
                <button
                  onClick={() => parentSpeech.speakQuick(currentQ.question_text, currentLang)}
                  className="p-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer shadow-xs border border-indigo-100"
                  title="Sualı səsli dinlə"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              {currentQ.image_url && (
                <div className="my-4 max-h-48 overflow-hidden rounded-2xl mx-auto flex items-center justify-center">
                  <img src={currentQ.image_url} alt="Sual" className="max-h-48 object-contain" />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {currentQ.answers?.map((ans) => {
                const isSelected = selectedAnswerId === ans.id;
                const { emoji, text } = extractEmojiAndText(ans.answer_text);
                let btnStyle = 'bg-white hover:bg-amber-50/80 text-slate-800 border-amber-200/80 hover:border-amber-400 shadow-sm';

                if (isAnswered) {
                  if (ans.is_correct) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/25';
                  } else if (isSelected && !ans.is_correct) {
                    btnStyle = 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-transparent opacity-50';
                  }
                }

                return (
                  <motion.button
                    key={ans.id}
                    whileHover={!isAnswered ? { scale: 1.03, y: -2 } : {}}
                    whileTap={!isAnswered ? { scale: 0.97 } : {}}
                    onClick={() => handleSelectAnswer(ans)}
                    disabled={isAnswered}
                    className={`min-h-[115px] sm:min-h-[130px] p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer group ${btnStyle}`}
                  >
                    {emoji && (
                      <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-sm mb-2 group-hover:scale-110 transition-transform select-none">
                        {emoji}
                      </span>
                    )}
                    {text && (
                      <span className="text-base sm:text-lg font-black tracking-wide leading-tight">
                        {text}
                      </span>
                    )}
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
