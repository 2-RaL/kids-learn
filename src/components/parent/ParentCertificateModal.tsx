import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, X, Printer, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { triggerConfetti, triggerStarShower, playAchievementSound } from '../../utils/soundEffects';

interface ParentCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  childName: string;
  childAge?: string;
  stars: number;
  level: number;
}

export const ParentCertificateModal: React.FC<ParentCertificateModalProps> = ({
  isOpen,
  onClose,
  childName,
  childAge,
  stars,
  level,
}) => {
  useEffect(() => {
    if (isOpen) {
      triggerStarShower();
      playAchievementSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const todayStr = new Date().toLocaleDateString('az-AZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 border border-amber-300 flex flex-col"
        >
          {/* Top Control Bar (Hidden when printing) */}
          <div className="print:hidden p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-100" />
              <span className="font-black text-sm sm:text-base">
                Fəxri Fərman və Uğur Sertifikatı
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-amber-50 font-black text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-600" />
                <span>Çap Et / PDF Yadda Saxla</span>
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Body (A4 Ratio Frame) */}
          <div className="p-6 sm:p-12 bg-amber-50/40 relative overflow-hidden print:p-8 font-serif text-slate-900 border-8 border-double border-amber-300 m-2 sm:m-4 rounded-2xl">
            {/* Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl">
              🌟
            </div>

            <div className="relative z-10 text-center space-y-4 sm:space-y-6">
              {/* Top Seal / Badge */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl">
                  🏆
                </div>
              </div>

              {/* Title Header */}
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-sans font-black tracking-widest text-amber-700 uppercase">
                  Kids Move &amp; Learn • Nitq və Motor İnkişaf Proqramı
                </span>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  UĞUR SERTİFİKATI
                </h1>
                <p className="text-xs sm:text-sm font-sans font-bold text-amber-800 tracking-wider">
                  CERTIFICATE OF MOTOR &amp; SPEECH EXCELLENCE
                </p>
              </div>

              {/* Body Text */}
              <div className="py-2 sm:py-4 space-y-3">
                <p className="text-xs sm:text-sm font-sans text-slate-600 font-semibold">
                  Bu fəxri sertifikat böyük qürur hissi ilə təqdim olunur:
                </p>
                <div className="text-2xl sm:text-4xl font-sans font-black text-indigo-700 underline decoration-amber-400 decoration-wavy underline-offset-8">
                  {childName}
                </div>
                {childAge && (
                  <p className="text-xs font-sans font-extrabold text-slate-500">
                    {childAge}
                  </p>
                )}
                <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed pt-2">
                  Təlim və seanslar boyunca göstərdiyi yüksək əzmkarlıq, hərəkət və artikulyasiya komandalarını 
                  uğurla mənimsəməsi və əldə etdiyi parlaq nailiyyətlərə görə təltif edilir.
                </p>
              </div>

              {/* Stats Ribbon */}
              <div className="flex items-center justify-center gap-6 font-sans">
                <div className="px-4 py-2 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                  <div className="text-left">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Ulduz Xalı</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">{stars > 0 ? stars : 125}</span>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-white border border-amber-200 shadow-xs flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <div className="text-left">
                    <span className="block text-xs text-slate-400 font-bold uppercase">Səviyyə</span>
                    <span className="font-black text-slate-900 text-sm sm:text-base">Level {level > 1 ? level : 2}</span>
                  </div>
                </div>
              </div>

              {/* Footer / Signatures */}
              <div className="pt-6 sm:pt-8 border-t border-amber-200/80 flex items-end justify-between font-sans text-xs">
                <div className="text-left space-y-1">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Təqdim Edilmə Tarixi:</span>
                  <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{todayStr}</span>
                </div>

                <div className="text-center">
                  <div className="w-36 sm:w-44 border-b border-dashed border-slate-400 pb-1 font-bold text-slate-700 text-xs sm:text-sm">
                    Kids Move &amp; Learn
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                    Rəsmi Təhsil və Loqopediya Möhürü
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ParentCertificateModal;
