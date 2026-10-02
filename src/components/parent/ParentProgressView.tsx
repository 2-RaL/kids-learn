import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award, Star, CheckCircle2, TrendingUp, Calendar,
  BookOpen, Sparkles, Heart, Activity, ShieldCheck
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useGameStore } from '../../store/gameStore';
import { getAssignedHomeworkList, AssignedHomework } from '../../services/parentService';

export const ParentProgressView: React.FC = () => {
  const { parentProfile } = useAuthStore();
  const { stars, level } = useGameStore();

  const childName = parentProfile?.child_name || 'Övladınız';
  const childAge = parentProfile?.child_age ? `${parentProfile.child_age} yaş` : 'Uşaq';

  // Retrieve saved offline & daily plan progress
  const offlineCount = (() => {
    try {
      const saved = localStorage.getItem('kml_offline_completed');
      return saved ? JSON.parse(saved).length : 2;
    } catch {
      return 2;
    }
  })();

  const [homeworkList, setHomeworkList] = useState<AssignedHomework[]>(getAssignedHomeworkList());

  useEffect(() => {
    const handleUpdate = () => {
      setHomeworkList(getAssignedHomeworkList());
    };
    window.addEventListener('kml_notifications_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('kml_notifications_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none">
      {/* Top Welcome / Overall Stat Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner flex-shrink-0">
            {parentProfile?.child_gender === 'girl' ? '👧' : '👦'}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Valideyn Nəzarət və İnkişaf Qeydi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {childName} üçün İnkişaf Xülasəsi
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 font-semibold">
              {childAge} • Fəal öyrənmə və gündəlik nailiyyətlər
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl text-center border border-white/30">
            <span className="text-2xl font-black block">{stars > 0 ? stars : 125}</span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-100">
              Ulduz Xalı
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl text-center border border-white/30">
            <span className="text-2xl font-black block">L{level > 1 ? level : 2}</span>
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-100">
              Səviyyə
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase text-slate-400">Bu Həftə</span>
          </div>
          <span className="text-2xl font-black text-slate-900">18</span>
          <span className="text-xs font-bold text-slate-500">Tamamlanan Fəaliyyət</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase text-slate-400">Ev İşi</span>
          </div>
          <span className="text-2xl font-black text-slate-900">
            {homeworkList.filter((h) => h.status === 'completed').length} / {homeworkList.length}
          </span>
          <span className="text-xs font-bold text-slate-500">Loqoped Tapşırığı</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-500 mb-2">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase text-slate-400">Oflayn</span>
          </div>
          <span className="text-2xl font-black text-slate-900">{offlineCount}</span>
          <span className="text-xs font-bold text-slate-500">Valideyn-Uşaq Oyunu</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase text-slate-400">Davamiyyət</span>
          </div>
          <span className="text-2xl font-black text-slate-900">5 Gün</span>
          <span className="text-xs font-bold text-slate-500">Aktiv İştirak Seriyası</span>
        </div>
      </div>

      {/* Assigned Homework from Therapist */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-black">
              📋
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Loqoped tərəfindən Təyin olunmuş Ev Tapşırıqları
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold">
                Mütəxəssisin tövsiyə etdiyi gündəlik məşqlər
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {homeworkList.map((hw) => (
            <div
              key={hw.id}
              className="p-4 rounded-2xl border border-amber-200/80 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  {hw.childName && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-600 text-white flex items-center gap-1">
                      <span>👧</span>
                      <span>{hw.childName}</span>
                    </span>
                  )}
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-900">
                    {hw.category}
                  </span>
                  <span className="text-xs font-extrabold text-slate-400">
                    Son tarix: {hw.dueDate}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">{hw.activityTitle}</h4>
                <p className="text-xs text-slate-600 font-semibold">{hw.instructions}</p>
                {hw.parentNote && (
                  <p className="text-[11px] text-amber-800 font-bold bg-amber-100/60 px-2.5 py-1 rounded-lg inline-block">
                    💡 Qeyd: {hw.parentNote}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {hw.status === 'completed' ? (
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Tamamlandı ({hw.score} xal)</span>
                  </span>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
                    Davam edir
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Positive Feedback Note */}
      <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3 text-xs text-sky-950 font-bold">
        <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0" />
        <span>
          Bütün göstəricilər uşağın müsbət motivasiyası və öyrənmə sevgisini artırmaq məqsədi daşıyır.
          Tibbi diaqnoz və ya qiymətləndirmə xarakteri daşımır.
        </span>
      </div>
    </div>
  );
};

export default ParentProgressView;
