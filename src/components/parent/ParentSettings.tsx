import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Check, Save, Heart, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const ParentSettings: React.FC = () => {
  const { parentProfile, updateParentProfile } = useAuthStore();

  const [childName, setChildName] = useState(parentProfile?.child_name || '');
  const [childAge, setChildAge] = useState<number | string>(parentProfile?.child_age || '');
  const [childGender, setChildGender] = useState<'boy' | 'girl' | 'other'>(
    parentProfile?.child_gender || 'boy'
  );
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const success = await updateParentProfile({
      child_name: childName.trim(),
      child_age: childAge ? parseInt(String(childAge), 10) : null,
      child_gender: childGender,
    });
    setIsSaving(false);
    if (success) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2.5">
          <span className="text-2xl">⚙️</span>
          Övladınızın Profili və Parametrlər
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Təqdim olunan məzmunu övladınızın yaşına və maraqlarına uyğunlaşdırın
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Övladınızın Adı
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={childName}
                onChange={e => setChildName(e.target.value)}
                placeholder="Məsələn: Əli, Ayan..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Övladınızın Yaşı (3 - 12 yaş)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                min="3"
                max="12"
                value={childAge}
                onChange={e => setChildAge(e.target.value)}
                placeholder="Yaş daxil edin (məs: 5)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Cins / Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'boy', label: '👦 Oğlan' },
                { id: 'girl', label: '👧 Qız' },
                { id: 'other', label: '✨ Ümumi' },
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setChildGender(item.id as any)}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                    childGender === item.id
                      ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                <Check className="w-4 h-4" />
                Məlumatlar uğurla saxlanıldı!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">
                Məlumatlar brauzer və serverdə təhlükəsiz saxlanılır.
              </span>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saxlanılır...' : 'Yadda saxla'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParentSettings;
