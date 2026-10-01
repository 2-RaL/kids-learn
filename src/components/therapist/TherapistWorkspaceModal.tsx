import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Users, ClipboardCheck, Target, BookOpen,
  Calendar, Award, Plus, Edit2, CheckCircle2,
  Trash2, Filter, Search, ChevronRight, Star,
  Shield, AlertCircle, FileText, ArrowRight, UserCheck
} from 'lucide-react';
import {
  DEFAULT_CHILDREN,
  DEFAULT_ASSESSMENT_TEMPLATE,
  DEFAULT_GOALS,
  DEFAULT_HOMEWORK,
  DEFAULT_SESSION_NOTES,
  type ChildProfile,
  type AssessmentArea,
  type TherapyGoal,
  type HomeworkAssignment,
  type SessionNote,
} from '../../data/therapistData';
import { LEARNING_MODULES } from '../../data/learningModulesData';

interface TherapistWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TherapistTab = 'children' | 'assessment' | 'goals' | 'homework' | 'notes' | 'library' | 'stats';

export const TherapistWorkspaceModal: React.FC<TherapistWorkspaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TherapistTab>('children');

  // Children state
  const [children, setChildren] = useState<ChildProfile[]>(DEFAULT_CHILDREN);
  const [selectedChildId, setSelectedChildId] = useState<string>(DEFAULT_CHILDREN[0]?.id || 'ch-1');

  // Assessment state
  const [assessments, setAssessments] = useState<AssessmentArea[]>(DEFAULT_ASSESSMENT_TEMPLATE);

  // Therapy Goals state
  const [goals, setGoals] = useState<TherapyGoal[]>(DEFAULT_GOALS);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalCategory, setNewGoalCategory] = useState('Artikulyasiya');
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Homework state
  const [homeworkList, setHomeworkList] = useState<HomeworkAssignment[]>(DEFAULT_HOMEWORK);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedModuleIdForHw, setSelectedModuleIdForHw] = useState(LEARNING_MODULES[0]?.id || 'colors');
  const [hwInstructions, setHwInstructions] = useState('');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwParentNote, setHwParentNote] = useState('');

  // Session Notes state
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>(DEFAULT_SESSION_NOTES);
  const [newNoteDate, setNewNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNoteActivity, setNewNoteActivity] = useState('');
  const [newNoteObs, setNewNoteObs] = useState('');
  const [newNoteProgress, setNewNoteProgress] = useState('');
  const [newNotePlan, setNewNotePlan] = useState('');
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Library search state
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryAgeFilter, setLibraryAgeFilter] = useState<number | null>(null);

  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0];

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal: TherapyGoal = {
      id: `g-${Date.now()}`,
      childId: selectedChildId,
      titleAz: newGoalTitle.trim(),
      descriptionAz: 'Loqoped tərəfindən təyin olunan fərdi inkişaf hədəfi.',
      category: newGoalCategory,
      targetPercent: 100,
      currentPercent: 10,
      status: 'active',
      notes: 'Yeni məqsəd əlavə edildi.',
      createdAt: new Date().toISOString().split('T')[0],
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setGoals([newGoal, ...goals]);
    setNewGoalTitle('');
    setIsAddGoalOpen(false);
  };

  const handleAssignHomework = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMod = LEARNING_MODULES.find((m) => m.id === selectedModuleIdForHw);

    const newHw: HomeworkAssignment = {
      id: `hw-${Date.now()}`,
      childId: selectedChildId,
      activityId: selectedModuleIdForHw,
      activityTitle: targetMod?.titleAz || 'Təlim Fəaliyyəti',
      category: targetMod?.titleAz || 'Ümumi',
      instructions: hwInstructions.trim() || 'Verilən fəaliyyəti evdə valideynlə birlikdə tamamlayın.',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: hwDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      targetSkill: 'Nitq və qavrama inkişafı',
      parentNote: hwParentNote.trim(),
      status: 'assigned',
      score: 0,
      attemptsCount: 0,
    };

    setHomeworkList([newHw, ...homeworkList]);
    setHwInstructions('');
    setHwDueDate('');
    setHwParentNote('');
    setIsAssignModalOpen(false);
  };

  const handleAddSessionNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteActivity.trim()) return;

    const newNote: SessionNote = {
      id: `sn-${Date.now()}`,
      childId: selectedChildId,
      date: newNoteDate,
      activityPerformed: newNoteActivity.trim(),
      observations: newNoteObs.trim() || 'Müşahidə qeyd olunmayıb.',
      progress: newNoteProgress.trim() || 'Uğurlu iştirak.',
      difficulties: 'Yoxdur.',
      nextSessionPlan: newNotePlan.trim() || 'Məşqlərin davam etdirilməsi.',
      therapistName: 'Demo Loqoped',
    };

    setSessionNotes([newNote, ...sessionNotes]);
    setNewNoteActivity('');
    setNewNoteObs('');
    setNewNoteProgress('');
    setNewNotePlan('');
    setIsAddNoteOpen(false);
  };

  const updateAssessmentRating = (id: string, delta: number) => {
    setAssessments(
      assessments.map((a) => {
        if (a.id === id) {
          const next = Math.max(1, Math.min(5, a.rating + delta));
          return { ...a, rating: next, lastUpdated: new Date().toISOString().split('T')[0] };
        }
        return a;
      })
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[94vh] max-h-[94vh] flex flex-col shadow-2xl border-4 border-indigo-300 overflow-hidden relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-sky-600 text-white p-4 sm:p-5 flex-shrink-0 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🩺
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1">
                <Shield className="w-3 h-3 text-sky-200" />
                <span>Loqopedik Diaqnostika &amp; Təlim İşçi Masası</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight leading-tight">
                Mütəxəssis İdarəetmə Paneli
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active Child Selector */}
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-2xl border border-white/20">
              <span className="text-lg">{selectedChild?.avatarEmoji}</span>
              <select
                value={selectedChildId}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="bg-transparent text-white text-xs font-black focus:outline-none cursor-pointer"
              >
                {children.map((ch) => (
                  <option key={ch.id} value={ch.id} className="text-slate-900 font-bold">
                    {ch.name} ({ch.age} yaş)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 p-2 sm:px-6 border-b border-slate-200 flex items-center gap-1 overflow-x-auto no-scrollbar flex-shrink-0">
          {[
            { id: 'children' as TherapistTab, label: 'Uşaq Profili', icon: Users },
            { id: 'assessment' as TherapistTab, label: '10 Sahə Qiymətləndirmə', icon: ClipboardCheck },
            { id: 'goals' as TherapistTab, label: 'Terapiya Hədəfləri', icon: Target },
            { id: 'homework' as TherapistTab, label: 'Ev Tapşırıqları', icon: BookOpen },
            { id: 'notes' as TherapistTab, label: 'Seans Qeydləri', icon: FileText },
            { id: 'library' as TherapistTab, label: 'Resurs Kitabxanası', icon: Award },
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto">
          {/* TAB 1: CHILD PROFILE */}
          {activeTab === 'children' && selectedChild && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-3xl p-6 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl bg-indigo-200/80 flex items-center justify-center text-5xl shadow-inner">
                    {selectedChild.avatarEmoji}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-200 text-indigo-900">
                      Səviyyə: {selectedChild.learningLevel}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                      {selectedChild.name}
                    </h2>
                    <p className="text-xs text-slate-500 font-bold">
                      {selectedChild.age} yaş • Qeydiyyat: {selectedChild.enrolledDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center p-3 rounded-2xl bg-white border border-indigo-100 shadow-xs">
                    <span className="text-xl font-black text-indigo-600 block">
                      {selectedChild.completedActivitiesCount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Fəaliyyət
                    </span>
                  </div>
                  <div className="text-center p-3 rounded-2xl bg-white border border-indigo-100 shadow-xs">
                    <span className="text-xl font-black text-emerald-600 block">
                      {selectedChild.activeGoalsCount}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Hədəf
                    </span>
                  </div>
                </div>
              </div>

              {/* Detail Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <span>Valideyn və Əlaqə</span>
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Valideyn adı:</span>
                      <span className="font-extrabold text-slate-800">{selectedChild.parentName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Əlaqə telefonu:</span>
                      <span className="font-extrabold text-slate-800">{selectedChild.parentPhone}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-semibold">Təhkim olunan loqoped:</span>
                      <span className="font-extrabold text-slate-800">{selectedChild.assignedTherapist}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Təlim və Dil Tercihi</span>
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Əsas ünsiyyət dili:</span>
                      <span className="font-extrabold text-slate-800">
                        {selectedChild.preferredLanguage === 'az' ? 'Azərbaycan dili' : selectedChild.preferredLanguage}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">Status:</span>
                      <span className="font-extrabold text-emerald-600">Aktiv Terapiyada</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500 font-semibold">Növbəti seans:</span>
                      <span className="font-extrabold text-indigo-600">3 gün sonra</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASSESSMENT AREA (10 CLINICAL AREAS) */}
          {activeTab === 'assessment' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    10 Sahə Üzrə Diaqnostik Qiymətləndirmə
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    {selectedChild.name} üçün loqopedik müşahidə və bal göstəriciləri (1–5 şkalası)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {assessments.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">{item.nameAz}</h4>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateAssessmentRating(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800">
                          {item.rating} / 5
                        </span>
                        <button
                          onClick={() => updateAssessmentRating(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {item.descriptionAz}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700 font-medium">
                      <span className="font-bold text-slate-900">Klinik qeyd: </span>
                      {item.notes}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: THERAPY GOALS */}
          {activeTab === 'goals' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Fərdi Terapiya Məqsədləri və Hədəflər
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    {selectedChild.name} üçün təyin edilmiş dinamik inkişaf məqsədləri
                  </p>
                </div>
                <button
                  onClick={() => setIsAddGoalOpen(!isAddGoalOpen)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Məqsəd</span>
                </button>
              </div>

              {/* Add Goal Form Modal / Accordion */}
              {isAddGoalOpen && (
                <form
                  onSubmit={handleAddGoal}
                  className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3 animate-in fade-in"
                >
                  <h3 className="text-xs font-black text-indigo-900 uppercase">Yeni Hədəf Təyin Et</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        placeholder="Məqsədin adı (məs. 'R' səsinin cümlədə tələffüzü)..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                        required
                      />
                    </div>
                    <div>
                      <select
                        value={newGoalCategory}
                        onChange={(e) => setNewGoalCategory(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      >
                        <option value="Artikulyasiya">Artikulyasiya</option>
                        <option value="Nitq və Qavrama">Nitq və Qavrama</option>
                        <option value="Koqnitiv">Koqnitiv</option>
                        <option value="Sosial Ünsiyyət">Sosial Ünsiyyət</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddGoalOpen(false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black"
                    >
                      Yadda Saxla
                    </button>
                  </div>
                </form>
              )}

              {/* Goals List */}
              <div className="space-y-3">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900">
                          {g.category}
                        </span>
                        <h4 className="text-sm font-black text-slate-900">{g.titleAz}</h4>
                      </div>
                      <span className="text-xs font-black text-indigo-600">
                        {g.currentPercent}% Nailiyyət
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${g.currentPercent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-semibold">{g.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: HOMEWORK ASSIGNMENT */}
          {activeTab === 'homework' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Ev Tapşırıqlarının Təyini və İzlənməsi
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Təyin edilmiş tapşırıqlar birbaşa Valideyn Portalında görünür
                  </p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(!isAssignModalOpen)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tapşırıq Təyin Et</span>
                </button>
              </div>

              {/* Assign Form */}
              {isAssignModalOpen && (
                <form
                  onSubmit={handleAssignHomework}
                  className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3 animate-in fade-in"
                >
                  <h3 className="text-xs font-black text-indigo-900 uppercase">
                    Uşağa Yeni Ev Tapşırığı Göndər
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Təlim Bölməsi:
                      </label>
                      <select
                        value={selectedModuleIdForHw}
                        onChange={(e) => setSelectedModuleIdForHw(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      >
                        {LEARNING_MODULES.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.emoji} {m.titleAz} ({m.minAge}–{m.maxAge} yaş)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Son Tarix (Due Date):
                      </label>
                      <input
                        type="date"
                        value={hwDueDate}
                        onChange={(e) => setHwDueDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Uşaq üçün Təlimat:
                    </label>
                    <input
                      type="text"
                      value={hwInstructions}
                      onChange={(e) => setHwInstructions(e.target.value)}
                      placeholder="Məsələn: Bu tapşırığı gündə 5 dəqiqə valideynlə birlikdə təkrar edin..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Valideyn üçün Xüsusi Qeyd (İstəyə bağlı):
                    </label>
                    <input
                      type="text"
                      value={hwParentNote}
                      onChange={(e) => setHwParentNote(e.target.value)}
                      placeholder="Məsələn: Səs çıxararkən dilinin vəziyyətinə diqqət yetirin..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAssignModalOpen(false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black"
                    >
                      Valideyn Portalına Göndər ✓
                    </button>
                  </div>
                </form>
              )}

              {/* Homework List */}
              <div className="space-y-3">
                {homeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900">
                          {hw.category}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          Son tarix: {hw.dueDate}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{hw.activityTitle}</h4>
                      <p className="text-xs text-slate-500 font-medium">{hw.instructions}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {hw.status === 'completed' ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Tamamlandı ({hw.score} bal)</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
                          Gözləyir (Təyin edilib)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SESSION NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-5 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Seans Qeydləri və Müşahidə Jurnalı
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Hər seansın nəticələrini və növbəti mərhələ planını qeyd edin
                  </p>
                </div>
                <button
                  onClick={() => setIsAddNoteOpen(!isAddNoteOpen)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Qeyd Yaz</span>
                </button>
              </div>

              {isAddNoteOpen && (
                <form
                  onSubmit={handleAddSessionNote}
                  className="p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200 space-y-3 animate-in fade-in"
                >
                  <h3 className="text-xs font-black text-indigo-900 uppercase">Seans Qeydi Əlavə Et</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Tarix:</label>
                      <input
                        type="date"
                        value={newNoteDate}
                        onChange={(e) => setNewNoteDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">
                        Keçirilən Fəaliyyət:
                      </label>
                      <input
                        type="text"
                        value={newNoteActivity}
                        onChange={(e) => setNewNoteActivity(e.target.value)}
                        placeholder="Məs. Səslər və tənəffüs gimnastikası..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Müşahidələr və Uğurlar:
                    </label>
                    <textarea
                      rows={2}
                      value={newNoteObs}
                      onChange={(e) => setNewNoteObs(e.target.value)}
                      placeholder="Uşağın reaksiyası, nailiyyətləri..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-medium text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Növbəti Seans Planı:
                    </label>
                    <input
                      type="text"
                      value={newNotePlan}
                      onChange={(e) => setNewNotePlan(e.target.value)}
                      placeholder="Növbəti seans üçün hədəf..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAddNoteOpen(false)}
                      className="px-4 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-black"
                    >
                      Qeydi Saxla
                    </button>
                  </div>
                </form>
              )}

              {/* Notes List */}
              <div className="space-y-3">
                {sessionNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-black text-slate-800">{note.date}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-400">{note.therapistName}</span>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{note.activityPerformed}</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      <span className="font-bold text-slate-800">Müşahidə: </span>
                      {note.observations}
                    </p>

                    <div className="p-2.5 rounded-xl bg-indigo-50/70 text-xs text-indigo-950 font-bold">
                      <span>Növbəti plan: </span>
                      {note.nextSessionPlan}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SHARED ACTIVITY LIBRARY */}
          {activeTab === 'library' && (
            <div className="space-y-5 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    Bütün Təlim Resursları Kitabxanası
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Cəmi {LEARNING_MODULES.length} zəngin təlim kateqoriyası
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      placeholder="Kitabxanada axtar..."
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 w-48"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {LEARNING_MODULES.filter((m) =>
                  librarySearch ? m.titleAz.toLowerCase().includes(librarySearch.toLowerCase()) : true
                ).map((mod) => (
                  <div
                    key={mod.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{mod.emoji}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {mod.minAge}–{mod.maxAge} yaş
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 mb-1">{mod.titleAz}</h4>
                      <p className="text-xs text-slate-500 font-medium line-clamp-2">
                        {mod.descriptionAz}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-indigo-600">
                        {mod.activities.length} fəaliyyət
                      </span>
                      <button
                        onClick={() => {
                          setSelectedModuleIdForHw(mod.id);
                          setActiveTab('homework');
                          setIsAssignModalOpen(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[11px] font-black cursor-pointer"
                      >
                        Evə Təyin Et +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TherapistWorkspaceModal;
