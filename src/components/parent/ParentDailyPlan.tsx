import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, CheckCircle2, RotateCcw, ArrowRight, Play,
  Sparkles, SkipForward, Award, Star
} from 'lucide-react';
import { DEFAULT_DAILY_PLAN, type DailyPlanItem } from '../../data/parentOfflineData';
import { LEARNING_MODULES, type LearningModuleCategory } from '../../data/learningModulesData';
import LearningActivityPlayer from '../learning/LearningActivityPlayer';
import { parentSpeech } from '../../utils/parentSpeech';
import { useGameStore } from '../../store/gameStore';

export const ParentDailyPlan: React.FC = () => {
  const { language, addStars } = useGameStore();
  const currentLang = language || 'az';

  const [planItems, setPlanItems] = useState<DailyPlanItem[]>(() => {
    try {
      const saved = localStorage.getItem('kml_daily_plan');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_DAILY_PLAN;
  });

  const [activePlayingModule, setActivePlayingModule] = useState<LearningModuleCategory | null>(null);

  const completedCount = planItems.filter((item) => item.isCompleted).length;
  const progressPercent = Math.round((completedCount / planItems.length) * 100);

  const savePlan = (items: DailyPlanItem[]) => {
    setPlanItems(items);
    try {
      localStorage.setItem('kml_daily_plan', JSON.stringify(items));
    } catch {}
  };

  const toggleComplete = (id: string) => {
    const updated = planItems.map((item) => {
      if (item.id === id) {
        const nextState = !item.isCompleted;
        if (nextState) {
          addStars(1);
          parentSpeech.speak('Əla! Bu tapşırıq tamamlandı!', currentLang);
        }
        return { ...item, isCompleted: nextState };
      }
      return item;
    });
    savePlan(updated);
  };

  const skipItem = (id: string) => {
    const updated = planItems.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: true };
      }
      return item;
    });
    savePlan(updated);
  };

  const handleStartActivity = (item: DailyPlanItem) => {
    const target = LEARNING_MODULES.find((m) => m.id === item.targetModuleId);
    if (target) {
      setActivePlayingModule(target);
    }
  };

  const resetTodayPlan = () => {
    const fresh = planItems.map((item) => ({ ...item, isCompleted: false }));
    savePlan(fresh);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-2xl shadow-md shadow-amber-400/20 text-white flex-shrink-0">
            ☀️
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider mb-1">
              <Clock className="w-3 h-3" />
              <span>Gündəlik 15 Dəqiqə</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Bu gün nə edək?
            </h2>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-black text-slate-800">
              {completedCount} / {planItems.length} Tamamlandı
            </span>
            <div className="w-28 sm:w-36 h-2.5 bg-amber-100 rounded-full mt-1 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={resetTodayPlan}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Plan list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {planItems.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
              item.isCompleted
                ? 'bg-emerald-50/70 border-emerald-300/80 text-emerald-950'
                : 'bg-white border-amber-200/70 hover:border-amber-400 text-slate-800 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {item.durationMinutes} dəqiqə
                </span>
              </div>
              <h3 className="font-black text-sm text-slate-900 mb-1">
                {idx + 1}. {item.titleAz}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {item.shortDescAz}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleStartActivity(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Başla</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`p-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                    item.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 hover:bg-emerald-100 text-slate-600'
                  }`}
                  title={item.isCompleted ? 'Tamamlandı' : 'Tamamla'}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => skipItem(item.id)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs transition cursor-pointer"
                  title="Keç"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <h4 className="font-black text-sm">Günün bütün planı uğurla tamamlandı!</h4>
              <p className="text-xs text-emerald-100 font-bold">
                Övladınız bu gün üçün 15 dəqiqəlik faydalı inkişaf vaxtını tamamladı.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-xl font-black text-xs">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>+5 Ulduz</span>
          </div>
        </div>
      )}

      {/* Activity modal if user clicks 'Başla' */}
      {activePlayingModule && (
        <LearningActivityPlayer
          module={activePlayingModule}
          onClose={() => setActivePlayingModule(null)}
          onCompleteActivity={() => {
            setActivePlayingModule(null);
          }}
        />
      )}
    </div>
  );
};

export default ParentDailyPlan;
