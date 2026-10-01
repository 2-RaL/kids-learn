import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle, Volume2, Sparkles, HelpCircle,
  ChevronRight, ChevronLeft, Lightbulb, Star
} from 'lucide-react';
import { CONVERSATION_PROMPTS, type ConversationPrompt } from '../../data/parentOfflineData';
import { parentSpeech } from '../../utils/parentSpeech';
import { useGameStore } from '../../store/gameStore';

export const ParentConversationPrompts: React.FC = () => {
  const { language, addStars } = useGameStore();
  const currentLang = language || 'az';

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPrompt: ConversationPrompt = CONVERSATION_PROMPTS[currentIndex];

  const handleSpeakQuestion = (text: string) => {
    parentSpeech.speak(text, currentLang);
  };

  const handleNext = () => {
    if (currentIndex < CONVERSATION_PROMPTS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(CONVERSATION_PROMPTS.length - 1);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-400 flex items-center justify-center text-2xl shadow-md shadow-sky-500/20 text-white flex-shrink-0">
            💬
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-black text-sky-700 bg-sky-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <MessageCircle className="w-3 h-3" />
              <span>Dialoq və Nitq İnkişafı</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Danışaq
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Əvvəlki ssenari"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-black text-slate-700 px-2">
            {currentIndex + 1} / {CONVERSATION_PROMPTS.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            title="Növbəti ssenari"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
        Bu şəkillərə övladınızla birlikdə baxın və ardıcıl suallarla onu tam cümlələrlə danışmağa həvəsləndirin.
      </p>

      {/* Main Conversation Card */}
      <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/60 rounded-3xl p-5 sm:p-7 border border-amber-200 space-y-6">
        {/* Scenario Banner / Illustration Frame */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 border border-amber-200 text-center shadow-xs space-y-2">
          <div className="text-6xl sm:text-7xl filter drop-shadow select-none mb-3">
            {currentPrompt.imageEmoji}
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            {currentPrompt.titleAz}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold max-w-md mx-auto">
            {currentPrompt.scenarioDescAz}
          </p>
        </div>

        {/* Guided Questions List */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Övladınıza verə biləcəyiniz suallar:</span>
          </h4>

          <div className="space-y-2.5">
            {currentPrompt.questions.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-2xl bg-white border border-amber-200/80 flex items-center justify-between gap-3 shadow-xs hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-800">
                    {q.textAz}
                  </span>
                </div>

                <button
                  onClick={() => handleSpeakQuestion(q.textAz)}
                  className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors flex-shrink-0 cursor-pointer"
                  title="Sualı səsləndir"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Tip Box */}
        <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300/80 flex items-start gap-2.5 text-xs text-amber-950 font-bold">
          <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-black">Loqoped və valideyn məsləhəti: </span>
            <span>{currentPrompt.parentTipsAz}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentConversationPrompts;
