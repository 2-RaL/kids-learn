import React, { useState, useEffect } from 'react';
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
import {
  getRegisteredParents,
  fetchRealParentUsers,
  assignHomeworkToParent,
  getAssignedHomeworkList,
  fetchRealHomeworkList,
  getSessionNotesList,
  fetchRealSessionNotesList,
  saveSessionNote,
  type RegisteredParentUser,
  type AssignedHomework,
  type TherapistSessionNote,
} from '../../services/parentService';
import { useAuthStore } from '../../store/authStore';
import ClinicalDiagnosticReportModal from './ClinicalDiagnosticReportModal';

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

  // Registered Parent Directory & Notification State (Original Users from MySQL & Admin Panel)
  const [parentUsers, setParentUsers] = useState<RegisteredParentUser[]>(getRegisteredParents());
  const [selectedParentIdForHw, setSelectedParentIdForHw] = useState<string>(parentUsers[0]?.id || '');
  const [selectedParentIdForNote, setSelectedParentIdForNote] = useState<string>(parentUsers[0]?.id || '');
  const [notifyParentOnNote, setNotifyParentOnNote] = useState<boolean>(true);
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Homework state backed by parentService & MySQL
  const [homeworkList, setHomeworkList] = useState<AssignedHomework[]>(getAssignedHomeworkList());
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedModuleIdForHw, setSelectedModuleIdForHw] = useState(LEARNING_MODULES[0]?.id || 'colors');
  const [hwInstructions, setHwInstructions] = useState('');
  const [hwDueDate, setHwDueDate] = useState('');
  const [hwParentNote, setHwParentNote] = useState('');

  // Session Notes state backed by parentService & MySQL
  const [sessionNotes, setSessionNotes] = useState<TherapistSessionNote[]>(getSessionNotesList());
  const [newNoteDate, setNewNoteDate] = useState(new Date().toISOString().split('T')[0]);
  const [newNoteActivity, setNewNoteActivity] = useState('');
  const [newNoteObs, setNewNoteObs] = useState('');
  const [newNoteProgress, setNewNoteProgress] = useState('');
  const [newNotePlan, setNewNotePlan] = useState('');
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // Library search state
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryAgeFilter, setLibraryAgeFilter] = useState<number | null>(null);

  // Sync on modal open directly with MySQL & Admin Panel
  useEffect(() => {
    if (isOpen) {
      const cached = getRegisteredParents();
      setParentUsers(cached);
      if (cached.length > 0) {
        setSelectedParentIdForHw((prev) => (prev && cached.some((p) => p.id === prev) ? prev : cached[0].id));
        setSelectedParentIdForNote((prev) => (prev && cached.some((p) => p.id === prev) ? prev : cached[0].id));
      }

      // Fetch live original users from MySQL
      fetchRealParentUsers().then((real) => {
        if (Array.isArray(real)) {
          setParentUsers(real);
          if (real.length > 0) {
            setSelectedParentIdForHw((prev) => (prev && real.some((p) => p.id === prev) ? prev : real[0].id));
            setSelectedParentIdForNote((prev) => (prev && real.some((p) => p.id === prev) ? prev : real[0].id));
          }
        }
      });

      // Fetch live homework and notes from MySQL
      fetchRealHomeworkList().then((hw) => {
        if (Array.isArray(hw)) setHomeworkList(hw);
      });
      fetchRealSessionNotesList().then((notes) => {
        if (Array.isArray(notes)) setSessionNotes(notes);
      });
    }
  }, [isOpen]);

  // Reactive listener for Admin Panel user creation / updates
  useEffect(() => {
    const handleParentsUpdated = (e: any) => {
      const updated = e.detail || getRegisteredParents();
      setParentUsers(updated);
      if (updated.length > 0) {
        setSelectedParentIdForHw((prev) => (prev && updated.some((p: any) => p.id === prev) ? prev : updated[0].id));
        setSelectedParentIdForNote((prev) => (prev && updated.some((p: any) => p.id === prev) ? prev : updated[0].id));
      }
    };
    const handleHwUpdated = () => {
      setHomeworkList(getAssignedHomeworkList());
    };
    window.addEventListener('kml_parents_updated', handleParentsUpdated);
    window.addEventListener('kml_notifications_updated', handleHwUpdated);
    window.addEventListener('storage', handleParentsUpdated);
    return () => {
      window.removeEventListener('kml_parents_updated', handleParentsUpdated);
      window.removeEventListener('kml_notifications_updated', handleHwUpdated);
      window.removeEventListener('storage', handleParentsUpdated);
    };
  }, []);

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
    const targetParent = parentUsers.find((p) => p.id === selectedParentIdForHw) || parentUsers[0];

    const newHw = assignHomeworkToParent({
      targetParentId: targetParent.id,
      childName: targetParent.childName,
      parentName: targetParent.parentName,
      activityId: selectedModuleIdForHw,
      activityTitle: targetMod?.titleAz || 'Təlim Fəaliyyəti',
      category: targetMod?.titleAz || 'Ümumi',
      instructions: hwInstructions.trim() || 'Verilən fəaliyyəti evdə valideynlə birlikdə tamamlayın.',
      dueDate: hwDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      targetSkill: 'Nitq və qavrama inkişafı',
      parentNote: hwParentNote.trim(),
    });

    setHomeworkList([newHw, ...homeworkList]);
    setHwInstructions('');
    setHwDueDate('');
    setHwParentNote('');
    setIsAssignModalOpen(false);
    setSuccessToast(`Ev tapşırığı ${targetParent.childName} üçün təyin edildi və ${targetParent.parentName} hesabına bildiriş göndərildi! ✓`);
    setTimeout(() => setSuccessToast(null), 4500);
  };

  const handleAddSessionNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteActivity.trim() || !newNoteObs.trim()) return;
    const targetParent = parentUsers.find((p) => p.id === selectedParentIdForNote) || parentUsers[0];

    const newNote = saveSessionNote({
      targetParentId: targetParent.id,
      childName: targetParent.childName,
      parentName: targetParent.parentName,
      date: newNoteDate,
      activityPerformed: newNoteActivity.trim(),
      observations: newNoteObs.trim(),
      progress: newNoteProgress.trim() || 'Məşqlər plana uyğun icra edildi.',
      difficulties: '',
      nextSessionPlan: newNotePlan.trim() || 'Növbəti seansda möhkəmləndirmə.',
      therapistName: 'Demo Loqoped',
      notifiedParent: notifyParentOnNote,
    });

    setSessionNotes([newNote, ...sessionNotes]);
    setNewNoteActivity('');
    setNewNoteObs('');
    setNewNoteProgress('');
    setNewNotePlan('');
    setIsAddNoteOpen(false);
    setSuccessToast(
      `Seans qeydi saxlanıldı (${targetParent.childName} üçün. Valideynə bildiriş: ${
        notifyParentOnNote ? 'Göndərildi ✓' : 'Göndərilmədi'
      })`
    );
    setTimeout(() => setSuccessToast(null), 4500);
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
          {/* Notification Toast */}
          {successToast && (
            <div className="mb-4 max-w-4xl mx-auto p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 border border-emerald-400">
              <div className="flex items-center gap-2.5 text-xs font-black">
                <span className="text-lg">🔔</span>
                <span>{successToast}</span>
              </div>
              <button
                onClick={() => setSuccessToast(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    10 Sahə Üzrə Diaqnostik Qiymətləndirmə
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    {selectedChild.name} üçün loqopedik müşahidə və bal göstəriciləri (1–5 şkalası)
                  </p>
                </div>
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer self-start sm:self-auto"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Hesabatı Çap Et / PDF İxrac</span>
                </button>
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
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>📚 Ev Tapşırıqlarının Təyini və Valideyn Əlaqəsi</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    Valideyn portalında qeydiyyatdan keçmiş istənilən ailəyə fərdi tapşırıq göndərin və dərhal bildiriş çatdırın
                  </p>
                </div>
                <button
                  onClick={() => setIsAssignModalOpen(!isAssignModalOpen)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-indigo-200 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Uşağa Yeni Ev Tapşırığı Göndər</span>
                </button>
              </div>

              {/* Registered Parents Overview Section */}
              <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 p-4 rounded-2xl border border-indigo-100 space-y-2">
                <div className="text-[11px] font-black text-indigo-950 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>MySQL & Admin Panel Real İstifadəçilər ({parentUsers.length})</span>
                  </span>
                  <span className="text-[10px] text-indigo-600 bg-white/80 px-2 py-0.5 rounded-full border border-indigo-200 font-bold">
                    Seçilən valideynə bildiriş gedir 🔔
                  </span>
                </div>

                {parentUsers.length === 0 ? (
                  <div className="p-4 rounded-xl bg-white/80 border border-dashed border-indigo-300 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      MySQL bazasında hələ qeydiyyatdan keçmiş valideyn istifadəçisi yoxdur.
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Admin Panelindən ("İstifadəçilər" bölməsi) "Valideyn" və ya "İstifadəçi" rolu ilə yeni hesab yaradın.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {parentUsers.map((pu) => {
                      const isSelected = selectedParentIdForHw === pu.id;
                      return (
                        <button
                          type="button"
                          key={pu.id}
                          onClick={() => {
                            setSelectedParentIdForHw(pu.id);
                            if (!isAssignModalOpen) setIsAssignModalOpen(true);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-200'
                              : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{pu.childEmoji || '👧'}</span>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-black text-slate-900 truncate">
                                {pu.childName}
                              </div>
                              <div className="text-[11px] text-indigo-700 font-bold truncate">
                                {pu.parentName}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium truncate">
                                @{pu.username} • {pu.childAge} yaş
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Assign Form */}
              {isAssignModalOpen && (
                <form
                  onSubmit={handleAssignHomework}
                  className="p-5 sm:p-6 rounded-2xl bg-indigo-50/90 border-2 border-indigo-300 space-y-4 animate-in fade-in shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                    <h3 className="text-sm font-black text-indigo-950 uppercase flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>Uşağa Yeni Ev Tapşırığı Göndər</span>
                    </h3>
                    <span className="text-xs font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-indigo-200">
                      🔔 Valideynə bildiriş getsin
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Parent User Selection */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-black text-indigo-950 block mb-1">
                        Valideyn Portalında Qeydiyyatdakı İstifadəçi (Tapşırıq Alan):
                      </label>
                      {parentUsers.length === 0 ? (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
                          ⚠️ Heç bir orijinal valideyn istifadəçisi tapılmadı. Zəhmət olmasa Admin Paneldən valideyn hesabı yaradın.
                        </div>
                      ) : (
                        <select
                          value={selectedParentIdForHw}
                          onChange={(e) => setSelectedParentIdForHw(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-indigo-300 text-xs font-black text-slate-900 shadow-xs focus:ring-2 focus:ring-indigo-500"
                        >
                          {parentUsers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.childEmoji || '👧'} {p.childName} ({p.childAge} yaş) — Valideyn: {p.parentName} (@{p.username}) {p.email ? `• ${p.email}` : ''}
                            </option>
                          ))}
                        </select>
                      )}
                      {parentUsers.length > 0 && (
                        <p className="mt-1 text-[11px] text-indigo-800 font-semibold flex items-center gap-1">
                          <span>ℹ️</span>
                          <span>
                            Bu tapşırıq <strong>{parentUsers.find((p) => p.id === selectedParentIdForHw)?.childName}</strong> üçün təyin ediləcək və valideyn <strong>{parentUsers.find((p) => p.id === selectedParentIdForHw)?.parentName}</strong> hesabına bildiriş kimi göndəriləcək.
                          </span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Təlim Bölməsi:
                      </label>
                      <select
                        value={selectedModuleIdForHw}
                        onChange={(e) => setSelectedModuleIdForHw(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      >
                        {LEARNING_MODULES.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.emoji} {m.titleAz} ({m.minAge}–{m.maxAge} yaş)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Son Tarix (Due Date):
                      </label>
                      <input
                        type="date"
                        value={hwDueDate}
                        onChange={(e) => setHwDueDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Uşaq üçün Təlimat:
                    </label>
                    <input
                      type="text"
                      value={hwInstructions}
                      onChange={(e) => setHwInstructions(e.target.value)}
                      placeholder="Məsələn: Bu tapşırığı gündə 5 dəqiqə valideynlə birlikdə təkrar edin..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Valideyn üçün Xüsusi Qeyd / Tövsiyə (İstəyə bağlı):
                    </label>
                    <input
                      type="text"
                      value={hwParentNote}
                      onChange={(e) => setHwParentNote(e.target.value)}
                      placeholder="Məsələn: Tələffüz zamanı dilin vəziyyətinə diqqət yetirin və səsi uzadaraq təkrar etdirin..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-indigo-200">
                    <button
                      type="button"
                      onClick={() => setIsAssignModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <span>Tapşırığı Təyin Et & Bildiriş Göndər 🔔</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Homework List */}
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Təyin Edilmiş Tapşırıqlar ({homeworkList.length})
                </div>

                {homeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-indigo-600 text-white flex items-center gap-1">
                          <span>👧</span>
                          <span>{hw.childName}</span>
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                          Valideyn: {hw.parentName}
                        </span>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {hw.category}
                        </span>
                        <span className="text-xs text-slate-400 font-bold ml-auto md:ml-0">
                          📅 Son tarix: {hw.dueDate}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-slate-900">{hw.activityTitle}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {hw.instructions}
                      </p>

                      {hw.parentNote && (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium flex items-start gap-1.5">
                          <span className="text-sm">💡</span>
                          <div>
                            <strong className="font-black text-amber-900">Valideynə Tövsiyə: </strong>
                            {hw.parentNote}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-black flex items-center gap-1">
                        <span>🔔</span>
                        <span>Valideynə bildiriş çatdı</span>
                      </span>

                      {hw.status === 'completed' ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Tamamlandı ({hw.score} bal)</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-black">
                          Gözləyir (Aktiv)
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
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>📝 Seans Qeydləri və Valideyn Bildirişi</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold">
                    İstənilən uşaq üçün nitq inkişafı qeydlərini aparın. "Tik" qoymaqla valideynə bildiriş göndərə bilərsiniz.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddNoteOpen(!isAddNoteOpen)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-indigo-200 cursor-pointer transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Yeni Qeyd Yaz</span>
                </button>
              </div>

              {/* Registered Parents Quick Picker */}
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-4 rounded-2xl border border-indigo-100 space-y-2">
                <div className="text-[11px] font-black text-indigo-950 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-600" />
                    <span>MySQL & Admin Panel Real İstifadəçilər ({parentUsers.length})</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    Seçib dərhal qeyd əlavə edin
                  </span>
                </div>

                {parentUsers.length === 0 ? (
                  <div className="p-4 rounded-xl bg-white/80 border border-dashed border-indigo-300 text-center space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      MySQL bazasında hələ qeydiyyatdan keçmiş valideyn istifadəçisi yoxdur.
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      Admin Panelindən ("İstifadəçilər" bölməsi) "Valideyn" və ya "İstifadəçi" rolu ilə yeni hesab yaradın.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {parentUsers.map((pu) => {
                      const isSelected = selectedParentIdForNote === pu.id;
                      return (
                        <button
                          type="button"
                          key={pu.id}
                          onClick={() => {
                            setSelectedParentIdForNote(pu.id);
                            if (!isAddNoteOpen) setIsAddNoteOpen(true);
                          }}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-indigo-500 shadow-sm ring-2 ring-indigo-200'
                              : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-indigo-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{pu.childEmoji || '👧'}</span>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-black text-slate-900 truncate">
                                {pu.childName}
                              </div>
                              <div className="text-[11px] text-indigo-700 font-bold truncate">
                                {pu.parentName}
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium truncate">
                                @{pu.username} • {pu.childAge} yaş
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Note Form */}
              {isAddNoteOpen && (
                <form
                  onSubmit={handleAddSessionNote}
                  className="p-5 sm:p-6 rounded-2xl bg-indigo-50/90 border-2 border-indigo-300 space-y-4 animate-in fade-in shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-indigo-200 pb-3">
                    <h3 className="text-sm font-black text-indigo-950 uppercase flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Seans Qeydi Əlavə Et</span>
                    </h3>
                    <span className="text-xs font-bold text-indigo-800">
                      Loqopedik Diaqnostika &amp; Təlim Masası
                    </span>
                  </div>

                  {/* Child / Parent Selection */}
                  <div>
                    <label className="text-xs font-black text-indigo-950 block mb-1">
                      Uşaq və Valideyn Seçimi (Portal İstifadəçisi):
                    </label>
                    {parentUsers.length === 0 ? (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800">
                        ⚠️ Heç bir orijinal valideyn istifadəçisi tapılmadı. Zəhmət olmasa Admin Paneldən valideyn hesabı yaradın.
                      </div>
                    ) : (
                      <select
                        value={selectedParentIdForNote}
                        onChange={(e) => setSelectedParentIdForNote(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-indigo-300 text-xs font-black text-slate-900 shadow-xs focus:ring-2 focus:ring-indigo-500"
                      >
                        {parentUsers.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.childEmoji || '👧'} {p.childName} ({p.childAge} yaş) — Valideyn: {p.parentName} (@{p.username}) {p.email ? `• ${p.email}` : ''}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">Tarix:</label>
                      <input
                        type="date"
                        value={newNoteDate}
                        onChange={(e) => setNewNoteDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Keçirilən Fəaliyyət / Mövzu:
                      </label>
                      <input
                        type="text"
                        value={newNoteActivity}
                        onChange={(e) => setNewNoteActivity(e.target.value)}
                        placeholder="Məs. Artikulyasiya gimnastikası, 'R' səsinin qoyuluşu və tənəffüs..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Müşahidələr və Uğurlar / Loqoped Qeydi:
                    </label>
                    <textarea
                      rows={3}
                      value={newNoteObs}
                      onChange={(e) => setNewNoteObs(e.target.value)}
                      placeholder='Məsələn: Ayan "R" hərfini deməkdə çətinlik çəkir, "R" hərfi ilə bağlı sözləri daha çox dedirdin. Dil gimnastikası gündəlik 5 dəqiqə davam etdirilsin...'
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-indigo-200 text-xs font-medium text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Növbəti Seans Planı (İstəyə bağlı):
                    </label>
                    <input
                      type="text"
                      value={newNotePlan}
                      onChange={(e) => setNewNotePlan(e.target.value)}
                      placeholder="Məs. 'R' səsini sözün əvvəlində və ortasında möhkəmləndirmək..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-bold text-slate-800"
                    />
                  </div>

                  {/* CRITICAL FEATURE: Checkbox ("tik") for Parent Notification */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-3 shadow-xs">
                    <input
                      type="checkbox"
                      id="notifyParentCheckbox"
                      checked={notifyParentOnNote}
                      onChange={(e) => setNotifyParentOnNote(e.target.checked)}
                      className="mt-0.5 w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                    />
                    <label htmlFor="notifyParentCheckbox" className="text-xs cursor-pointer select-none">
                      <span className="font-black text-slate-900 flex items-center gap-1.5">
                        <span>🔔</span>
                        <span>Bu qeydi bildiriş kimi valideynə göndər ("Tik" qoyulduqda bildiriş gedir)</span>
                      </span>
                      <span className="text-[11px] text-slate-600 font-medium block mt-1">
                        {notifyParentOnNote ? (
                          <strong className="text-emerald-700 flex items-center gap-1">
                            <span>✓</span>
                            <span>"Tik" qoyulub: Qeyd dərhal valideyn hesabına bildiriş kimi çatacaq və Valideyn Portalında görünəcək.</span>
                          </strong>
                        ) : (
                          <strong className="text-slate-500 flex items-center gap-1">
                            <span>✕</span>
                            <span>"Tik" qoyulmayıb: Bu qeyd yalnız daxili loqoped jurnalında saxlanılacaq, valideynə heç bir bildiriş getməyəcək.</span>
                          </strong>
                        )}
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-indigo-200">
                    <button
                      type="button"
                      onClick={() => setIsAddNoteOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
                    >
                      <span>
                        Qeydi Saxla {notifyParentOnNote ? '& Valideynə Bildiriş Göndər 🔔' : '(Yalnız Daxili Qeyd)'}
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* Notes List */}
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Müşahidə və Seans Qeydləri ({sessionNotes.length})
                </div>

                {sessionNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 shadow-xs space-y-3 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-md bg-indigo-600 text-white flex items-center gap-1">
                          <span>👧</span>
                          <span>{note.childName}</span>
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                          Valideyn: {note.parentName}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{note.date}</span>
                        </div>
                      </div>

                      {/* Notification Status Badge */}
                      <div>
                        {note.notifiedParent ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-black flex items-center gap-1">
                            <span>🔔</span>
                            <span>Valideynə bildiriş göndərildi</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-bold flex items-center gap-1">
                            <span>🔒</span>
                            <span>Daxili qeyd (bildiriş göndərilmədi)</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-sm font-black text-slate-900">{note.activityPerformed}</h4>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <strong className="font-black text-slate-900 block mb-0.5">Müşahidə və Tövsiyə:</strong>
                      {note.observations}
                    </p>

                    {note.nextSessionPlan && (
                      <div className="p-2.5 rounded-xl bg-indigo-50/80 text-xs text-indigo-950 font-bold border border-indigo-100">
                        <span className="text-indigo-600">Növbəti seans planı: </span>
                        <span>{note.nextSessionPlan}</span>
                      </div>
                    )}
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

      <ClinicalDiagnosticReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        child={selectedChild}
        assessments={assessments}
        goals={goals}
        homeworkList={homeworkList}
      />
    </div>
  );
};

export default TherapistWorkspaceModal;
