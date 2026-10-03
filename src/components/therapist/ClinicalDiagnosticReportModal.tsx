import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Printer, X, FileText, CheckCircle2,
  Calendar, ShieldCheck, Stethoscope, Sparkles
} from 'lucide-react';
import type { ChildProfile, AssessmentArea, TherapyGoal } from '../../data/therapistData';
import type { AssignedHomework } from '../../services/parentService';

interface ClinicalDiagnosticReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: ChildProfile;
  assessments: AssessmentArea[];
  goals: TherapyGoal[];
  homeworkList?: AssignedHomework[];
  therapistName?: string;
}

export const ClinicalDiagnosticReportModal: React.FC<ClinicalDiagnosticReportModalProps> = ({
  isOpen,
  onClose,
  child,
  assessments,
  goals,
  homeworkList = [],
  therapistName = 'Mütəxəssis Loqoped-Defektoloq',
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const avgRating = (
    assessments.reduce((acc, curr) => acc + curr.rating, 0) / (assessments.length || 1)
  ).toFixed(1);

  const getStatusLabel = (rating: number) => {
    if (rating >= 4.5) return { text: 'Yüksək / Norma', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (rating >= 3.5) return { text: 'Yaxşı / Yaşına Uyğun', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (rating >= 2.5) return { text: 'Orta / Dəstək Tələb Olunur', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { text: 'İntensiv Terapiya Lazımdır', color: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border border-slate-200 flex flex-col max-h-[92vh]"
        >
          {/* Top Control Bar (Hidden when printing) */}
          <div className="print:hidden p-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span className="font-extrabold text-sm sm:text-base">
                Klinik Diaqnostik Hesabat — {child.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Hesabatı Çap Et / PDF İxrac</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Report Document Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-slate-900 print:p-0 print:space-y-4 font-sans">
            {/* Header / Brand */}
            <div className="flex items-start justify-between border-b-2 border-indigo-600 pb-5">
              <div>
                <div className="flex items-center gap-2 text-indigo-700 font-black text-xl tracking-tight">
                  <Stethoscope className="w-6 h-6" />
                  <span>KİDS MOVE &amp; LEARN CLINICAL PROTOCOL</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Loqopedik Müayinə və İnkişaf Xülasəsi Hesabatı
                </h1>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  Rəsmi tibbi-pedaqoji qiymətləndirmə və fərdi reabilitasiya planı
                </p>
              </div>

              <div className="text-right text-xs space-y-1">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Protokol № KML-{new Date().getFullYear()}-0{child.id.replace(/\D/g, '') || '1'}</span>
                </div>
                <p className="text-slate-500 font-medium">Tarix: {todayStr}</p>
              </div>
            </div>

            {/* Child Profile Information Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Uşağın Adı:</span>
                <span className="font-black text-slate-900 text-sm">{child.name}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Yaş / Təvəllüd:</span>
                <span className="font-extrabold text-slate-800 text-sm">{child.age} yaş</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">İlkin Diaqnoz:</span>
                <span className="font-extrabold text-indigo-700 text-xs">{child.diagnosis}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[10px]">Ümumi İndeks:</span>
                <span className="font-black text-emerald-600 text-sm">{avgRating} / 5.0 Bal</span>
              </div>
            </div>

            {/* 10 Assessment Areas Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>10 Klinik Sahə Üzrə Diaqnostik Qiymətləndirmə Cədvəli</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">1 (Zəif) — 5 (Əla)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {assessments.map((area) => {
                  const status = getStatusLabel(area.rating);
                  return (
                    <div
                      key={area.id}
                      className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-slate-900">{area.nameAz}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${status.color}`}>
                            {status.text}
                          </span>
                          <span className="font-black text-xs text-indigo-700">
                            {area.rating}/5
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-600 transition-all"
                          style={{ width: `${(area.rating / 5) * 100}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-600 font-medium">
                        <span className="font-bold text-slate-800">Müşahidə: </span>
                        {area.notes || area.descriptionAz}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Goals & Progress */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Fərdi Terapiya Hədəfləri və İcra Statusu</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800 truncate">{goal.title}</span>
                      <span className="font-extrabold text-emerald-700 text-[10px]">{goal.progress}%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${goal.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold block">{goal.category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Homework & Clinical Recommendation */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
              <span className="font-black text-amber-900 block uppercase text-[10px] tracking-wider">
                Valideyn üçün Ev Təlimatları və Tövsiyələr:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium leading-relaxed">
                <li>Gündəlik 10–15 dəqiqə uşaqla interaktiv güzgü önü artikulyasiya və tənəffüs məşqlərini təkrarlayın.</li>
                <li>Hərəkət komandalarını (tullanmaq, qaçmaq, alqışlamaq) səsli şəkildə sözlə müşayiət edərək icra etdirin.</li>
                <li>Uşağın uğurlu tələffüzlərini ulduz və təriflə mükafatlandırın, səhv tələffüzdə qınamadan düzgün modeli səsləndirin.</li>
              </ul>
            </div>

            {/* Signature & Stamp Section */}
            <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
              <div className="space-y-1">
                <p className="font-extrabold text-slate-800">{therapistName}</p>
                <p className="text-slate-500 text-[11px]">Klinik Loqoped və İnkişaf Mütəxəssisi</p>
                <p className="text-slate-400 text-[10px]">Kids Move &amp; Learn Reabilitasiya Mərkəzi</p>
              </div>

              <div className="text-center space-y-6">
                <div className="w-48 border-b border-dashed border-slate-400 pb-1 text-[11px] text-slate-400 font-medium">
                  İmza və Möhür yeri
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ClinicalDiagnosticReportModal;
