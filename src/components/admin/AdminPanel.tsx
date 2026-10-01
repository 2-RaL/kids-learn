import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, UserPlus, Shield, Trash2, Key, CheckCircle2,
  AlertCircle, RefreshCw, Search, Check, Ban, ArrowLeft,
  LayoutDashboard, BookOpen, Video, Brain, Calculator, Award,
  Plus, Edit2, X, Filter, LogOut, Pencil, History, RotateCcw, Bell, ShieldAlert
} from 'lucide-react';
import { useAuthStore, type AuthUser, type UserRole } from '../../store/authStore';
import { apiUrl } from '../../config/api';
import { MULTILINGUAL_STORIES } from '../../data/parentStoriesData';

type AdminTab = 'dashboard' | 'users' | 'stories' | 'videos' | 'logic' | 'math' | 'chess' | 'audit';
type UserRoleFilter = 'all' | 'admin' | 'editor' | 'therapist' | 'parent' | 'user';

export const AdminPanel: React.FC = () => {
  const { token, user: currentAdmin, logout, setActivePortal } = useAuthStore();
  const isSuperAdmin = currentAdmin?.role === 'admin';

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Users State
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [userRoleFilter, setUserRoleFilter] = useState<UserRoleFilter>('all');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Create User Modal State
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('user');
  const [newPortalAccess, setNewPortalAccess] = useState<'both' | 'therapist' | 'parent'>('both');

  // Edit User Modal State
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | number | null>(null);
  const [editUsername, setEditUsername] = useState('');
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('user');
  const [editPortalAccess, setEditPortalAccess] = useState<'both' | 'therapist' | 'parent'>('both');
  const [editPasswordInput, setEditPasswordInput] = useState('');
  const [editIsActive, setEditIsActive] = useState(true);

  // Redaktor Audit Logs & Rollback State
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [unrevertedAuditCount, setUnrevertedAuditCount] = useState(0);
  const [isRevertingId, setIsRevertingId] = useState<number | null>(null);

  // Stories State
  const [stories, setStories] = useState<any[]>([]);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [storyForm, setStoryForm] = useState({
    id: null as number | null,
    title: '',
    shortDescription: '',
    fullStory: '',
    categoryId: 1,
    minAge: 3,
    maxAge: 10,
    readingDurationMinutes: 5,
    isBedtime: false,
    isPublished: true,
  });

  // Videos State
  const [videos, setVideos] = useState<any[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({
    id: null as number | null,
    title: '',
    description: '',
    videoUrl: '',
    categoryId: 1,
    minAge: 3,
    maxAge: 12,
    difficulty: 'easy',
  });

  // Logic Questions State
  const [logicQuestions, setLogicQuestions] = useState<any[]>([]);
  const [isLogicModalOpen, setIsLogicModalOpen] = useState(false);
  const [logicForm, setLogicForm] = useState({
    id: null as number | null,
    questionText: '',
    minAge: 3,
    maxAge: 8,
    difficulty: 'easy',
    ans1: '',
    ans2: '',
    ans3: '',
    correctAns: 1,
  });

  // Math Questions State
  const [mathQuestions, setMathQuestions] = useState<any[]>([]);
  const [isMathModalOpen, setIsMathModalOpen] = useState(false);
  const [mathForm, setMathForm] = useState({
    id: null as number | null,
    questionText: '',
    visualElements: '',
    minAge: 3,
    maxAge: 8,
    ans1: '',
    ans2: '',
    ans3: '',
    correctAns: 1,
  });

  // Chess Lessons State
  const [chessLessons, setChessLessons] = useState<any[]>([]);
  const [isChessModalOpen, setIsChessModalOpen] = useState(false);
  const [chessForm, setChessForm] = useState({
    id: null as number | null,
    title: '',
    description: '',
    minAge: 5,
    maxAge: 12,
  });

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const fetchStats = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/stats'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setStats(data.stats);
    } catch {}
  };

  const fetchUsers = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(apiUrl('/api/admin/users'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      setError(err.message);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStories = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/stories'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.stories)) {
        let list = [...data.stories];
        try {
          const stored = JSON.parse(localStorage.getItem('custom_admin_stories') || '[]');
          if (Array.isArray(stored)) {
            stored.forEach((ls: any) => {
              if (!list.some((s: any) => s.id === ls.id)) {
                list.unshift({
                  id: ls.id,
                  title: ls.translations?.az?.title || 'Adsız hekayə',
                  short_description: ls.translations?.az?.short_description || '',
                  full_story: ls.translations?.az?.paragraphs?.join('\n\n') || '',
                  min_age: ls.min_age || 3,
                  max_age: ls.max_age || 10,
                  reading_duration_minutes: ls.reading_duration_minutes || 5,
                  is_bedtime: ls.is_bedtime ? 1 : 0,
                  is_published: 1,
                });
              }
            });
          }
        } catch {}
        setStories(list);
      }
    } catch {
      try {
        const stored = JSON.parse(localStorage.getItem('custom_admin_stories') || '[]');
        const defaults = MULTILINGUAL_STORIES.map(s => ({
          id: s.id,
          title: s.translations.az.title,
          short_description: s.translations.az.short_description,
          full_story: s.translations.az.paragraphs.join('\n\n'),
          min_age: s.min_age,
          max_age: s.max_age,
          reading_duration_minutes: s.reading_duration_minutes,
          is_bedtime: s.is_bedtime ? 1 : 0,
          is_published: 1,
        }));
        const combined = [
          ...stored.map((ls: any) => ({
            id: ls.id,
            title: ls.translations?.az?.title || 'Adsız hekayə',
            short_description: ls.translations?.az?.short_description || '',
            full_story: ls.translations?.az?.paragraphs?.join('\n\n') || '',
            min_age: ls.min_age || 3,
            max_age: ls.max_age || 10,
            reading_duration_minutes: ls.reading_duration_minutes || 5,
            is_bedtime: ls.is_bedtime ? 1 : 0,
            is_published: 1,
          })),
          ...defaults.filter(d => !stored.some((s: any) => s.id === d.id)),
        ];
        setStories(combined);
      } catch {}
    }
  };

  const fetchVideos = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/videos'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch {}
  };

  const fetchLogic = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/logic-questions'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setLogicQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch {}
  };

  const fetchMath = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/math-questions'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMathQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch {}
  };

  const fetchChess = async () => {
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/chess-lessons'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setChessLessons(Array.isArray(data.lessons) ? data.lessons : []);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
    fetchStories();
    fetchVideos();
    fetchLogic();
    fetchMath();
    fetchChess();
    if (isSuperAdmin) {
      fetchUsers();
      fetchAuditLogs();
    }
  }, [token, isSuperAdmin]);

  useEffect(() => {
    if (!isSuperAdmin && (activeTab === 'users' || activeTab === 'audit')) {
      setActiveTab('dashboard');
    }
  }, [isSuperAdmin, activeTab]);

  // Handle User Create
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/users'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          username: newUsername.trim(),
          displayName: (newDisplayName || newUsername).trim(),
          password: newPassword,
          role: newRole,
          portalAccess: newPortalAccess,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'İstifadəçi yaradıla bilmədi');
      const addedName = data.user?.displayName || (data.user as any)?.display_name || data.user?.username || newDisplayName || newUsername;
      showNotification(`"${addedName}" uğurla əlavə edildi!`);
      setNewUsername('');
      setNewDisplayName('');
      setNewPassword('');
      setNewPortalAccess('both');
      setIsCreateUserOpen(false);
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Open Edit User Modal
  const handleOpenEditUser = (targetUser: AuthUser) => {
    setEditUserId(targetUser.id);
    setEditUsername(targetUser.username);
    setEditDisplayName(targetUser.displayName || (targetUser as any).display_name || targetUser.username);
    setEditEmail((targetUser as any).email || '');
    setEditRole(targetUser.role || 'user');
    setEditPortalAccess((targetUser as any).portalAccess || (targetUser as any).portal_access || 'both');
    setEditPasswordInput('');
    setEditIsActive(targetUser.isActive !== undefined ? targetUser.isActive : !!(targetUser as any).is_active);
    setIsEditUserOpen(true);
  };

  // Submit Edit User
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !editUserId) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/users/${editUserId}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          username: editUsername.trim(),
          displayName: editDisplayName.trim(),
          email: editEmail.trim() || null,
          role: editRole,
          portalAccess: editPortalAccess,
          isActive: editIsActive,
          password: editPasswordInput.trim() ? editPasswordInput : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'İstifadəçi yenilənə bilmədi');
      showNotification(`"${editDisplayName || editUsername}" məlumatları uğurla yeniləndi!`);
      setIsEditUserOpen(false);
      fetchUsers();
      fetchStats();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch Redaktor Audit Logs (Super Admin only)
  const fetchAuditLogs = async () => {
    if (!token || currentAdmin?.role !== 'admin') return;
    try {
      const res = await fetch(apiUrl('/api/admin/audit-logs'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.logs)) {
        setAuditLogs(data.logs);
        setUnrevertedAuditCount(data.unrevertedCount || 0);
      }
    } catch {}
  };

  // Revert Action (Rollback / Undo)
  const handleRevertAction = async (logId: number, entityTitle: string) => {
    if (!token) return;
    if (!confirm(`"${entityTitle || 'Bu fəaliyyət'}" üçün edilmiş dəyişikliyi ləğv edib əvvəlki vəziyyətinə qaytarmaq (Undo) istədiyinizə əminsiniz?`)) {
      return;
    }
    setIsRevertingId(logId);
    try {
      const res = await fetch(apiUrl(`/api/admin/audit-logs/${logId}/revert`), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fəaliyyəti ləğv etmək mümkün olmadı');
      showNotification(data.message || 'Fəaliyyət ləğv edildi və məlumat bərpa olundu!');
      fetchAuditLogs();
      fetchStats();
      fetchLogic();
      fetchStories();
      fetchVideos();
      fetchMath();
      fetchChess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsRevertingId(null);
    }
  };

  // Toggle User Active
  const handleToggleUserActive = async (targetUser: AuthUser) => {
    if (!token) return;
    try {
      const isCurrentlyActive = targetUser.isActive !== undefined ? targetUser.isActive : !!(targetUser as any).is_active;
      const res = await fetch(apiUrl(`/api/admin/users/${targetUser.id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ isActive: !isCurrentlyActive }),
      });
      if (res.ok) {
        showNotification('İstifadəçi statusu dəyişdirildi');
        fetchUsers();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete User
  const handleDeleteUser = async (targetUser: AuthUser) => {
    if (!token) return;
    if (!confirm(`"${targetUser.displayName || targetUser.username}" istifadəçisini silməyə əminsiniz?`)) return;
    try {
      const res = await fetch(apiUrl(`/api/admin/users/${targetUser.id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showNotification('İstifadəçi silindi');
        fetchUsers();
        fetchStats();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Save Story
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const isEdit = !!storyForm.id;
      const url = isEdit ? apiUrl(`/api/admin/stories/${storyForm.id}`) : apiUrl('/api/admin/stories');
      const method = isEdit ? 'PUT' : 'POST';

      const payload = {
        ...storyForm,
        isPublished: storyForm.isPublished !== false,
      };

      const customId = storyForm.id || Date.now();
      const rawParas = storyForm.fullStory
        ? storyForm.fullStory.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
        : [storyForm.shortDescription || storyForm.title];

      const localStoryObj = {
        id: customId,
        min_age: storyForm.minAge || 3,
        max_age: storyForm.maxAge || 10,
        is_bedtime: Boolean(storyForm.isBedtime),
        category: (storyForm.isBedtime ? 'bedtime' : 'daytime') as 'bedtime' | 'daytime',
        reading_duration_minutes: storyForm.readingDurationMinutes || 5,
        cover_emoji: storyForm.isBedtime ? '🌙' : '📖',
        translations: {
          az: {
            title: storyForm.title,
            short_description: storyForm.shortDescription || '',
            paragraphs: rawParas,
          },
          en: {
            title: storyForm.title,
            short_description: storyForm.shortDescription || '',
            paragraphs: rawParas,
          },
          ru: {
            title: storyForm.title,
            short_description: storyForm.shortDescription || '',
            paragraphs: rawParas,
          },
        },
      };

      try {
        const stored = JSON.parse(localStorage.getItem('custom_admin_stories') || '[]');
        const updated = isEdit
          ? stored.map((s: any) => s.id === storyForm.id ? localStoryObj : s)
          : [localStoryObj, ...stored.filter((s: any) => s.id !== customId)];
        localStorage.setItem('custom_admin_stories', JSON.stringify(updated));
      } catch {}

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showNotification(isEdit ? 'Hekayə yeniləndi' : 'Yeni hekayə əlavə edildi');
        setIsStoryModalOpen(false);
        fetchStories();
        fetchStats();
      } else {
        showNotification(isEdit ? 'Hekayə yeniləndi' : 'Yeni hekayə əlavə edildi');
        setIsStoryModalOpen(false);
        fetchStories();
      }
    } catch (err: any) {
      showNotification('Hekayə yadda saxlanıldı');
      setIsStoryModalOpen(false);
      fetchStories();
    }
  };

  // Delete Story
  const handleDeleteStory = async (id: number) => {
    if (!confirm('Bu hekayəni silmək istəyirsiniz?')) return;
    try {
      try {
        const stored = JSON.parse(localStorage.getItem('custom_admin_stories') || '[]');
        const updated = stored.filter((s: any) => s.id !== id);
        localStorage.setItem('custom_admin_stories', JSON.stringify(updated));
      } catch {}

      await fetch(apiUrl(`/api/admin/stories/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStories();
      fetchStats();
    } catch {}
  };

  // Save Video
  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const isEdit = !!videoForm.id;
      const url = isEdit ? apiUrl(`/api/admin/videos/${videoForm.id}`) : apiUrl('/api/admin/videos');
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(videoForm),
      });
      if (res.ok) {
        showNotification('Video saxlanıldı');
        setIsVideoModalOpen(false);
        fetchVideos();
        fetchStats();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete Video
  const handleDeleteVideo = async (id: number) => {
    if (!confirm('Bu videonu silmək istəyirsiniz?')) return;
    try {
      await fetch(apiUrl(`/api/admin/videos/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVideos();
      fetchStats();
    } catch {}
  };

  // Save Logic Question
  const handleSaveLogic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const answers = [
        { answerText: logicForm.ans1, isCorrect: logicForm.correctAns === 1 },
        { answerText: logicForm.ans2, isCorrect: logicForm.correctAns === 2 },
        { answerText: logicForm.ans3, isCorrect: logicForm.correctAns === 3 },
      ];
      const res = await fetch(apiUrl('/api/admin/logic-questions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          questionText: logicForm.questionText,
          minAge: logicForm.minAge,
          maxAge: logicForm.maxAge,
          difficulty: logicForm.difficulty,
          answers,
        }),
      });
      if (res.ok) {
        showNotification('Məntiq sualı əlavə edildi');
        setIsLogicModalOpen(false);
        fetchLogic();
        fetchStats();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Save Math Question
  const handleSaveMath = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const answers = [
        { answerText: mathForm.ans1, isCorrect: mathForm.correctAns === 1 },
        { answerText: mathForm.ans2, isCorrect: mathForm.correctAns === 2 },
        { answerText: mathForm.ans3, isCorrect: mathForm.correctAns === 3 },
      ];
      const res = await fetch(apiUrl('/api/admin/math-questions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          questionText: mathForm.questionText,
          visualElements: mathForm.visualElements,
          minAge: mathForm.minAge,
          maxAge: mathForm.maxAge,
          answers,
        }),
      });
      if (res.ok) {
        showNotification('Riyaziyyat sualı əlavə edildi');
        setIsMathModalOpen(false);
        fetchMath();
        fetchStats();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Save Chess Lesson
  const handleSaveChess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(apiUrl('/api/admin/chess-lessons'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(chessForm),
      });
      if (res.ok) {
        showNotification('Şahmat dərsi əlavə edildi');
        setIsChessModalOpen(false);
        fetchChess();
        fetchStats();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Delete Logic Question
  const handleDeleteLogic = async (id: number) => {
    if (!confirm('Bu məntiq sualını silmək istəyirsiniz?')) return;
    try {
      await fetch(apiUrl(`/api/admin/logic-questions/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLogic();
      fetchStats();
      showNotification('Məntiq sualı silindi');
    } catch {}
  };

  // Delete Math Question
  const handleDeleteMath = async (id: number) => {
    if (!confirm('Bu riyaziyyat sualını silmək istəyirsiniz?')) return;
    try {
      await fetch(apiUrl(`/api/admin/math-questions/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMath();
      fetchStats();
      showNotification('Riyaziyyat sualı silindi');
    } catch {}
  };

  // Delete Chess Lesson
  const handleDeleteChess = async (id: number) => {
    if (!confirm('Bu şahmat dərsini silmək istəyirsiniz?')) return;
    try {
      await fetch(apiUrl(`/api/admin/chess-lessons/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchChess();
      fetchStats();
      showNotification('Şahmat dərsi silindi');
    } catch {}
  };

  const userList = Array.isArray(users) ? users : [];
  const filteredUsers = userList.filter(u => {
    if (!u) return false;
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userSearchTerm.trim()) {
      const q = userSearchTerm.toLowerCase();
      const uname = (u.username || '').toLowerCase();
      const dname = ((u.displayName || (u as any).display_name) || '').toLowerCase();
      return uname.includes(q) || dname.includes(q);
    }
    return true;
  });

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Statistika', icon: LayoutDashboard, emoji: '📊' },
    ...(isSuperAdmin
      ? [
          { id: 'users' as AdminTab, label: 'İstifadəçilər', icon: Users, emoji: '👥' },
          {
            id: 'audit' as AdminTab,
            label: 'Redaktor Tarixçəsi',
            icon: History,
            emoji: '📜',
            badge: unrevertedAuditCount > 0 ? unrevertedAuditCount : undefined,
          },
        ]
      : []),
    { id: 'stories' as AdminTab, label: 'Hekayələr', icon: BookOpen, emoji: '📖' },
    { id: 'videos' as AdminTab, label: 'Videolar', icon: Video, emoji: '🎬' },
    { id: 'logic' as AdminTab, label: 'Məntiq Sualları', icon: Brain, emoji: '🧠' },
    { id: 'math' as AdminTab, label: 'Riyaziyyat', icon: Calculator, emoji: '🔢' },
    { id: 'chess' as AdminTab, label: 'Şahmat', icon: Award, emoji: '♟️' },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row select-none bg-slate-900 text-slate-100"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Top Brand */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20">
              🛡️
            </div>
            <div>
              <h1 className="text-base font-black text-white">İdarəetmə Paneli</h1>
              <p className="text-[11px] text-slate-400 font-semibold">Kids Move & Learn Admin</p>
            </div>
          </div>

          {/* Admin user info */}
          <div className="my-4 p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              isSuperAdmin ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {isSuperAdmin ? '👑' : '✍️'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{currentAdmin?.displayName || currentAdmin?.username}</p>
              <p className={`text-[10px] font-extrabold uppercase tracking-wider ${
                isSuperAdmin ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {isSuperAdmin ? 'Super Administrator' : 'Məzmun Redaktoru'}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5 mt-2">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs lg:text-sm transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{item.emoji}</span>
                    <span>{item.label}</span>
                  </div>
                  {(item as any).badge ? (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-rose-500 text-white animate-pulse">
                      {(item as any).badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => setActivePortal('select')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-colors cursor-pointer border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Portallara Qayıt</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/50 hover:bg-red-900/50 text-red-400 text-xs font-bold transition-colors cursor-pointer border border-red-900/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıxış</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar alerts */}
        <div className="p-4 sm:p-6 pb-0">
          <AnimatePresence>
            {isSuperAdmin && unrevertedAuditCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400 shrink-0 animate-bounce" />
                  <span>
                    Diqqət: Redaktorlar tərəfindən <span className="text-amber-300 font-black underline">{unrevertedAuditCount} ədəd</span> yeni əməliyyat həyata keçirilib! Səhvən edilən hərəkəti buradan ləğv edə bilərsiniz.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all cursor-pointer whitespace-nowrap self-end sm:self-auto"
                >
                  Tarixçəyə bax və Ləğv et
                </button>
              </motion.div>
            )}
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{successMsg}</span>
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>{error}</span>
                </div>
                <button onClick={() => setError(null)} className="text-rose-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tab 1: Dashboard Stats */}
        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div>
              <h2 className="text-2xl font-black text-white">Sistem Statistikası</h2>
              <p className="text-xs text-slate-400 mt-1">Platformada mövcud istifadəçilər və tədris resursları</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { title: 'Ümumi İstifadəçi', value: stats?.totalUsers || 0, icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-950/40 border-indigo-800/40' },
                ...(isSuperAdmin ? [
                  { title: 'Redaktorlar', value: stats?.editors || 0, icon: Edit2, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/40' },
                ] : []),
                { title: 'Loqopedlər', value: stats?.therapists || 0, icon: Shield, color: 'text-sky-400', bg: 'bg-sky-950/40 border-sky-800/40' },
                { title: 'Valideynlər', value: stats?.parents || 0, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/40' },
                { title: 'Hekayələr', value: stats?.stories || 0, icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/40' },
                { title: 'Videolar', value: stats?.videos || 0, icon: Video, color: 'text-cyan-400', bg: 'bg-cyan-950/40 border-cyan-800/40' },
                { title: 'Məntiq Sualları', value: stats?.logicQuestions || 0, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800/40' },
                { title: 'Riyaziyyat', value: stats?.mathQuestions || 0, icon: Calculator, color: 'text-pink-400', bg: 'bg-pink-950/40 border-pink-800/40' },
                { title: 'Şahmat Dərsləri', value: stats?.chessLessons || 0, icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-950/40 border-yellow-800/40' },
              ].map((s, idx) => (
                <div key={idx} className={`p-5 rounded-3xl border ${s.bg} flex flex-col justify-between`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400">{s.title}</span>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <span className="text-3xl font-black text-white">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800">
              <h3 className="text-sm font-bold text-slate-300 mb-4">Sürətli İdarəetmə</h3>
              <div className="flex flex-wrap gap-3">
                {isSuperAdmin && (
                  <button
                    onClick={() => { setActiveTab('users'); setIsCreateUserOpen(true); }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Yeni İstifadəçi Əlavə Et</span>
                  </button>
                )}
                {isSuperAdmin && (
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <History className="w-4 h-4" />
                    <span>Redaktor Tarixçəsi ({unrevertedAuditCount})</span>
                  </button>
                )}
                <button
                  onClick={() => { setActiveTab('stories'); setIsStoryModalOpen(true); }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Hekayə Əlavə Et</span>
                </button>
                <button
                  onClick={() => { setActiveTab('videos'); setIsVideoModalOpen(true); }}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Video Əlavə Et</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Users Management */}
        {activeTab === 'users' && isSuperAdmin && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">İstifadəçilər</h2>
                <p className="text-xs text-slate-400 mt-0.5">Admin, Redaktor, Loqoped, Valideyn və Sadə İstifadəçi hesablarının idarə olunması</p>
              </div>

              <button
                onClick={() => setIsCreateUserOpen(true)}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
              >
                <UserPlus className="w-4 h-4" />
                <span>Yeni İstifadəçi</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Hamısı' },
                  { id: 'admin', label: 'Adminlər' },
                  { id: 'editor', label: 'Redaktorlar' },
                  { id: 'therapist', label: 'Loqopedlər' },
                  { id: 'parent', label: 'Valideynlər' },
                  { id: 'user', label: 'Sadə İstifadəçilər' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setUserRoleFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      userRoleFilter === f.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={userSearchTerm}
                  onChange={e => setUserSearchTerm(e.target.value)}
                  placeholder="İstifadəçi axtar..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">İstifadəçi</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4">Portal İcazəsi</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500 text-xs">
                        Heç bir istifadəçi tapılmadı.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => {
                      const displayName = u.displayName || (u as any).display_name || u.username;
                      const isActive = u.isActive !== undefined ? u.isActive : !!(u as any).is_active;
                      const access = (u as any).portalAccess || (u as any).portal_access || 'both';
                      return (
                        <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-white">{displayName}</div>
                            <div className="text-[11px] text-slate-500">@{u.username}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-purple-950 text-purple-400 border border-purple-800'
                                : u.role === 'editor'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : u.role === 'therapist'
                                ? 'bg-sky-950 text-sky-400 border border-sky-800'
                                : u.role === 'parent'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}>
                              {u.role === 'admin'
                                ? 'Admin'
                                : u.role === 'editor'
                                ? 'Redaktor'
                                : u.role === 'therapist'
                                ? 'Loqoped'
                                : u.role === 'parent'
                                ? 'Valideyn'
                                : 'İstifadəçi'}
                            </span>
                          </td>
                          <td className="p-4">
                            {u.role === 'admin' || u.role === 'editor' ? (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
                                Bütün portallar
                              </span>
                            ) : (
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                access === 'therapist'
                                  ? 'bg-sky-950 text-sky-400 border border-sky-800'
                                  : access === 'parent'
                                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}>
                                {access === 'therapist'
                                  ? '🩺 Loqoped'
                                  : access === 'parent'
                                  ? '👨‍👩‍👧‍👦 Valideyn'
                                  : '✨ Hər İkisi'}
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                              {isActive ? 'Aktiv' : 'Deaktiv'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditUser(u)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-indigo-950 text-slate-400 hover:text-indigo-400 cursor-pointer transition-colors"
                                title="İstifadəçini Redaktə Et"
                              >
                                <Pencil className="w-3.5 h-3.5 text-indigo-400" />
                              </button>
                              <button
                                onClick={() => handleToggleUserActive(u)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                                title={isActive ? 'Deaktiv et' : 'Aktivləşdir'}
                              >
                                {isActive ? <Ban className="w-3.5 h-3.5 text-amber-400" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                                title="Sil"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Stories Management */}
        {activeTab === 'stories' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
                  <span>Hekayələr və Nağıllar</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    {stories.length} hekayə
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Valideyn portalı ilə tam sinxronlaşan nağıllar xəzinəsi</p>
              </div>
              <button
                onClick={() => {
                  setStoryForm({ id: null, title: '', shortDescription: '', fullStory: '', categoryId: 1, minAge: 3, maxAge: 10, readingDurationMinutes: 5, isBedtime: false, isPublished: true });
                  setIsStoryModalOpen(true);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Hekayə</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stories.map(s => (
                <div key={s.id} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                      <span className="font-bold">{s.min_age}-{s.max_age} yaş</span>
                      <div className="flex items-center gap-1.5">
                        {s.is_published === 0 && (
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/80">
                            Qaralama
                          </span>
                        )}
                        <span>{s.is_bedtime ? '🌙 Gecə' : '☀️ Gündüz'}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-extrabold text-white mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4">{s.short_description || s.full_story}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-900">
                    <button
                      onClick={() => {
                        setStoryForm({
                          id: s.id,
                          title: s.title,
                          shortDescription: s.short_description || '',
                          fullStory: s.full_story || '',
                          categoryId: s.category_id || 1,
                          minAge: s.min_age || 3,
                          maxAge: s.max_age || 10,
                          readingDurationMinutes: s.reading_duration_minutes || 5,
                          isBedtime: Boolean(s.is_bedtime),
                          isPublished: s.is_published !== 0,
                        });
                        setIsStoryModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-emerald-950 text-slate-400 hover:text-emerald-400 cursor-pointer"
                      title="Düzəliş et"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStory(s.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Videos Management */}
        {activeTab === 'videos' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Videolar</h2>
                <p className="text-xs text-slate-400 mt-0.5">Öyrədici hərəkət və nitq inkişafı videoları</p>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map(v => (
                <div key={v.id} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-1.5">{v.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2">{v.description}</p>
                    <span className="text-[10px] text-sky-400 font-mono truncate block">{v.video_url}</span>
                  </div>
                  <div className="flex items-center justify-end pt-3 border-t border-slate-900">
                    <button
                      onClick={() => handleDeleteVideo(v.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Logic Questions */}
        {activeTab === 'logic' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Məntiq Sualları</h2>
                <p className="text-xs text-slate-400 mt-0.5">Məntiqi düşünmə və fərqləndirmə tapşırıqları</p>
              </div>
              <button
                onClick={() => setIsLogicModalOpen(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Məntiq Sualı</span>
              </button>
            </div>

            <div className="space-y-3">
              {logicQuestions.map(q => (
                <div key={q.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-white">{q.question_text}</p>
                    <div className="flex gap-2 mt-1">
                      {q.answers?.map((a: any) => (
                        <span key={a.id} className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${a.is_correct ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-900 text-slate-400'}`}>
                          {a.answer_text} {a.is_correct ? '✓' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{q.min_age}-{q.max_age} yaş</span>
                    <button
                      onClick={() => handleDeleteLogic(q.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Math Questions */}
        {activeTab === 'math' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Riyaziyyat Sualları</h2>
                <p className="text-xs text-slate-400 mt-0.5">Sayma və sadə riyazi tapşırıqlar</p>
              </div>
              <button
                onClick={() => setIsMathModalOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Riyaziyyat Sualı</span>
              </button>
            </div>

            <div className="space-y-3">
              {mathQuestions.map(q => (
                <div key={q.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-white">{q.question_text}</p>
                    {q.visual_elements && <p className="text-lg my-1">{q.visual_elements}</p>}
                    <div className="flex gap-2 mt-1">
                      {q.answers?.map((a: any) => (
                        <span key={a.id} className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${a.is_correct ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-900 text-slate-400'}`}>
                          {a.answer_text} {a.is_correct ? '✓' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500">{q.min_age}-{q.max_age} yaş</span>
                    <button
                      onClick={() => handleDeleteMath(q.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Chess Lessons */}
        {activeTab === 'chess' && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Şahmat Dərsləri</h2>
                <p className="text-xs text-slate-400 mt-0.5">Uşaqlar üçün şahmat fiqurları və qaydaları</p>
              </div>
              <button
                onClick={() => setIsChessModalOpen(true)}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Şahmat Dərsi</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chessLessons.map(c => (
                <div key={c.id} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-white mb-1">{c.title}</h3>
                    <p className="text-xs text-slate-400 mb-2">{c.description}</p>
                    <span className="text-[10px] text-yellow-500 font-bold bg-yellow-950 px-2.5 py-0.5 rounded-full">
                      {c.min_age}-{c.max_age} yaş
                    </span>
                  </div>
                  <div className="flex items-center justify-end pt-3 border-t border-slate-900 mt-3">
                    <button
                      onClick={() => handleDeleteChess(c.id)}
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Editor Audit Log & Rollback (Super Admin Only) */}
        {activeTab === 'audit' && isSuperAdmin && (
          <div className="p-4 sm:p-8 space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white">Redaktor Fəaliyyət Tarixçəsi</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                    Audit Log & Undo
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Redaktorların sildiyi, əlavə etdiyi və ya dəyişdirdiyi bütün məlumatlar burada qeyd olunur.
                  Səhvən silinən sual və ya məzmunu buradan dərhal əvvəlki vəziyyətinə qaytara (Undo) bilərsiniz.
                </p>
              </div>

              <button
                onClick={fetchAuditLogs}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Yenilə</span>
              </button>
            </div>

            {/* Audit Log Table */}
            <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Tarix & Saat</th>
                    <th className="p-4">Redaktor</th>
                    <th className="p-4">Əməliyyat</th>
                    <th className="p-4">Bölmə & Element</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Müdaxilə</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 text-xs">
                        Hələlik heç bir redaktor əməliyyatı qeydə alınmayıb.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log: any) => {
                      const dateStr = log.created_at
                        ? new Date(log.created_at).toLocaleString('az-AZ', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—';

                      const actionBadge =
                        log.action_type === 'DELETE' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-950 text-rose-400 border border-rose-800">
                            Silinmə
                          </span>
                        ) : log.action_type === 'UPDATE' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-950 text-sky-400 border border-sky-800">
                            Dəyişiklik
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                            Əlavə
                          </span>
                        );

                      const entityLabels: Record<string, string> = {
                        logic: 'Məntiq Sualı',
                        math: 'Riyaziyyat Sualı',
                        story: 'Hekayə',
                        video: 'Video',
                        chess: 'Şahmat Dərsi',
                        age_group: 'Yaş Qrupu',
                      };

                      return (
                        <tr key={log.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="p-4 text-slate-400 whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="p-4">
                            <div className="font-extrabold text-white">
                              {log.user_display_name || log.user_name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              @{log.user_name} ({log.user_role})
                            </div>
                          </td>
                          <td className="p-4">{actionBadge}</td>
                          <td className="p-4">
                            <span className="text-[11px] font-bold text-indigo-400 block">
                              {entityLabels[log.entity_type] || log.entity_type}
                            </span>
                            <span className="text-white font-medium line-clamp-1">
                              {log.entity_title || `ID: #${log.entity_id}`}
                            </span>
                          </td>
                          <td className="p-4">
                            {log.is_reverted ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                Ləğv edildi / Bərpa olundu
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                Qüvvədədir
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            {log.is_reverted ? (
                              <span className="text-[11px] text-slate-500 italic">
                                {log.reverted_by_name ? `${log.reverted_by_name} tərəfindən bərpa edildi` : 'Bərpa edilib'}
                              </span>
                            ) : (
                              <button
                                onClick={() => handleRevertAction(log.id, log.entity_title)}
                                disabled={isRevertingId === log.id}
                                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
                                title="Bu əməliyyatı ləğv et və məlumatı geri qaytar (Undo)"
                              >
                                <RotateCcw className={`w-3.5 h-3.5 ${isRevertingId === log.id ? 'animate-spin' : ''}`} />
                                <span>Geri Qaytar (Ləğv et)</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create User */}
      <AnimatePresence>
        {isCreateUserOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Yeni İstifadəçi Əlavə Et</h3>
                <button onClick={() => setIsCreateUserOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-400">İstifadəçi adı (Username):</label>
                  <input
                    type="text"
                    required
                    value={newUsername}
                    onChange={e => setNewUsername(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Görünən ad (Display Name):</label>
                  <input
                    type="text"
                    value={newDisplayName}
                    onChange={e => setNewDisplayName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Şifrə:</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Rol və İcazə Statusu:</label>
                  <select
                    value={newRole}
                    onChange={e => setNewRole(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="user">Sadə İstifadəçi (Admin panelə girişi yoxdur)</option>
                    <option value="editor">Redaktor (Admin məzmun redaktoru, istifadəçi idarəsi yoxdur)</option>
                    <option value="admin">Administrator (Super Admin - hər şeyə tam səlahiyyət)</option>
                    <option value="therapist">Loqoped (Therapist portalı)</option>
                    <option value="parent">Valideyn (Valideyn portalı)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Daxil Ola Biləcəyi Portal:</label>
                  <select
                    value={newPortalAccess}
                    onChange={e => setNewPortalAccess(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="both">Hər iki portal (Loqoped və Valideyn)</option>
                    <option value="therapist">Yalnız Loqoped Portalı</option>
                    <option value="parent">Yalnız Valideyn Portalı</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Sadə istifadəçilərin hansı portala daxil ola biləcəyini seçin (Redaktor və Admin hər iki portala daxil ola bilir).
                  </p>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateUserOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    Əlavə et
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Edit User (Super Admin Only) */}
      <AnimatePresence>
        {isEditUserOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">İstifadəçini Redaktə Et</h3>
                    <p className="text-[11px] text-slate-400">Hesab məlumatlarını və statusunu dəyişdirin</p>
                  </div>
                </div>
                <button onClick={() => setIsEditUserOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateUser} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-400">Görünən ad (Display Name):</label>
                  <input
                    type="text"
                    required
                    value={editDisplayName}
                    onChange={e => setEditDisplayName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400">İstifadəçi adı (Username):</label>
                  <input
                    type="text"
                    required
                    value={editUsername}
                    onChange={e => setEditUsername(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400">E-poçt (Email - istəyə bağlı):</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    placeholder="istifadeci@example.com"
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400">İstifadəçi Statusu / Rolu:</label>
                  <select
                    value={editRole}
                    onChange={e => setEditRole(e.target.value as UserRole)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="user">Sadə İstifadəçi (Yalnız məzmunları görür, admin panelə girə bilmir)</option>
                    <option value="editor">Redaktor (Admin məzmun redaktoru, lakin istifadəçi idarəsi yoxdur)</option>
                    <option value="admin">Admin (Hər şeyi görə və idarə edə bilən tam səlahiyyətli super admin)</option>
                    <option value="therapist">Loqoped (Therapist portalı)</option>
                    <option value="parent">Valideyn (Valideyn portalı)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400">Daxil Ola Biləcəyi Portal:</label>
                  <select
                    value={editPortalAccess}
                    onChange={e => setEditPortalAccess(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="both">Hər iki portal (Loqoped və Valideyn)</option>
                    <option value="therapist">Yalnız Loqoped Portalı</option>
                    <option value="parent">Yalnız Valideyn Portalı</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Sadə istifadəçilərin hansı portala daxil ola biləcəyini seçin (Redaktor və Admin hər iki portala daxil ola bilir).
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400">Yeni Şifrə (dəyişmək istəmirsinizsə boş buraxın):</label>
                  <input
                    type="password"
                    value={editPasswordInput}
                    onChange={e => setEditPasswordInput(e.target.value)}
                    placeholder="Şifrəni olduğu kimi saxlamaq üçün boş saxlayın"
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editIsActive}
                    onChange={e => setEditIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-slate-800 cursor-pointer"
                  />
                  <label htmlFor="editIsActive" className="text-xs font-bold text-slate-300 cursor-pointer">
                    İstifadəçi hesabı aktivdir
                  </label>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditUserOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-600/30 cursor-pointer"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Create/Edit Story */}
      <AnimatePresence>
        {isStoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Hekayə Əlavə Et</h3>
                <button onClick={() => setIsStoryModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveStory} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-400">Başlıq:</label>
                  <input
                    type="text"
                    required
                    value={storyForm.title}
                    onChange={e => setStoryForm({ ...storyForm, title: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Qısa Təsvir:</label>
                  <input
                    type="text"
                    value={storyForm.shortDescription}
                    onChange={e => setStoryForm({ ...storyForm, shortDescription: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Tam Mətn:</label>
                  <textarea
                    rows={6}
                    value={storyForm.fullStory}
                    onChange={e => setStoryForm({ ...storyForm, fullStory: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400">Min Yaş:</label>
                    <input
                      type="number"
                      value={storyForm.minAge}
                      onChange={e => setStoryForm({ ...storyForm, minAge: parseInt(e.target.value, 10) })}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400">Maks Yaş:</label>
                    <input
                      type="number"
                      value={storyForm.maxAge}
                      onChange={e => setStoryForm({ ...storyForm, maxAge: parseInt(e.target.value, 10) })}
                      className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isBedtime"
                      checked={storyForm.isBedtime}
                      onChange={e => setStoryForm({ ...storyForm, isBedtime: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600"
                    />
                    <label htmlFor="isBedtime" className="text-xs font-bold text-slate-300">Gecə Nağılıdır</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={storyForm.isPublished}
                      onChange={e => setStoryForm({ ...storyForm, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600"
                    />
                    <label htmlFor="isPublished" className="text-xs font-bold text-slate-300">Dərc edilsin (Portalda görünsün)</label>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsStoryModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Create Video */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Video Əlavə Et</h3>
                <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVideo} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-400">Video Başlığı:</label>
                  <input
                    type="text"
                    required
                    value={videoForm.title}
                    onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Video URL (YouTube və ya MP4):</label>
                  <input
                    type="text"
                    required
                    value={videoForm.videoUrl}
                    onChange={e => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Təsvir:</label>
                  <input
                    type="text"
                    value={videoForm.description}
                    onChange={e => setVideoForm({ ...videoForm, description: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Create Logic Question */}
      <AnimatePresence>
        {isLogicModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Məntiq Sualı Əlavə Et</h3>
                <button onClick={() => setIsLogicModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLogic} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-400">Sual mətni:</label>
                  <input
                    type="text"
                    required
                    value={logicForm.questionText}
                    onChange={e => setLogicForm({ ...logicForm, questionText: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Variant 1:</label>
                  <input
                    type="text"
                    required
                    value={logicForm.ans1}
                    onChange={e => setLogicForm({ ...logicForm, ans1: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Variant 2:</label>
                  <input
                    type="text"
                    required
                    value={logicForm.ans2}
                    onChange={e => setLogicForm({ ...logicForm, ans2: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Variant 3:</label>
                  <input
                    type="text"
                    required
                    value={logicForm.ans3}
                    onChange={e => setLogicForm({ ...logicForm, ans3: e.target.value })}
                    className="w-full mt-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Düzgün Cavab:</label>
                  <select
                    value={logicForm.correctAns}
                    onChange={e => setLogicForm({ ...logicForm, correctAns: parseInt(e.target.value, 10) })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value={1}>Variant 1</option>
                    <option value={2}>Variant 2</option>
                    <option value={3}>Variant 3</option>
                  </select>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLogicModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Create Math Question */}
      <AnimatePresence>
        {isMathModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Riyaziyyat Sualı Əlavə Et</h3>
                <button onClick={() => setIsMathModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMath} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-400">Sual mətni:</label>
                  <input
                    type="text"
                    required
                    value={mathForm.questionText}
                    onChange={e => setMathForm({ ...mathForm, questionText: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Vizual Emojilər (məs: 🍎🍎🍎):</label>
                  <input
                    type="text"
                    value={mathForm.visualElements}
                    onChange={e => setMathForm({ ...mathForm, visualElements: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Var 1"
                    value={mathForm.ans1}
                    onChange={e => setMathForm({ ...mathForm, ans1: e.target.value })}
                    className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Var 2"
                    value={mathForm.ans2}
                    onChange={e => setMathForm({ ...mathForm, ans2: e.target.value })}
                    className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Var 3"
                    value={mathForm.ans3}
                    onChange={e => setMathForm({ ...mathForm, ans3: e.target.value })}
                    className="px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Düzgün Cavab:</label>
                  <select
                    value={mathForm.correctAns}
                    onChange={e => setMathForm({ ...mathForm, correctAns: parseInt(e.target.value, 10) })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value={1}>Variant 1</option>
                    <option value={2}>Variant 2</option>
                    <option value={3}>Variant 3</option>
                  </select>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMathModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Create Chess Lesson */}
      <AnimatePresence>
        {isChessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-white text-base">Şahmat Dərsi Əlavə Et</h3>
                <button onClick={() => setIsChessModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveChess} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-400">Dərs Başlığı:</label>
                  <input
                    type="text"
                    required
                    value={chessForm.title}
                    onChange={e => setChessForm({ ...chessForm, title: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400">Təsvir və Qayda:</label>
                  <textarea
                    rows={3}
                    value={chessForm.description}
                    onChange={e => setChessForm({ ...chessForm, description: e.target.value })}
                    className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsChessModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white text-xs font-bold"
                  >
                    Yadda saxla
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
