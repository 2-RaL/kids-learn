/**
 * src/services/parentService.ts
 * Manages registered parent portal users, therapist homework assignments,
 * session notes, and reactive parent notifications.
 */

export interface RegisteredParentUser {
  id: string;
  username: string;
  parentName: string;
  childName: string;
  childAge: number;
  childGender: 'boy' | 'girl';
  avatarEmoji: string;
  phone?: string;
  registeredAt: string;
  therapistNotesSummary?: string;
}

export interface ParentNotification {
  id: string;
  targetParentId: string; // matches parent user id or username or 'all'
  childName: string;
  title: string;
  message: string;
  type: 'homework' | 'session_note' | 'general';
  createdAt: string;
  isRead: boolean;
  read?: boolean;
  relatedId?: string;
}

export interface AssignedHomework {
  id: string;
  targetParentId: string;
  childName: string;
  parentName: string;
  activityId: string;
  activityTitle: string;
  category: string;
  instructions: string;
  assignedDate: string;
  dueDate: string;
  targetSkill: string;
  parentNote?: string;
  status: 'assigned' | 'opened' | 'completed';
  score?: number;
  attemptsCount?: number;
  completedDate?: string;
}

export interface TherapistSessionNote {
  id: string;
  targetParentId: string;
  childName: string;
  parentName: string;
  date: string;
  activityPerformed: string;
  observations: string;
  progress: string;
  difficulties: string;
  nextSessionPlan: string;
  therapistName: string;
  notifiedParent: boolean;
  createdAt: string;
}

const STORAGE_KEYS = {
  PARENTS: 'kml_registered_parents',
  NOTIFICATIONS: 'kml_parent_notifications',
  HOMEWORK: 'kml_homework_assignments',
  NOTES: 'kml_session_notes',
};

// Seed initial registered parent users (including Ayan, Əli, Zəhra, Murad)
const INITIAL_PARENTS: RegisteredParentUser[] = [
  {
    id: 'parent-ayan',
    username: 'gunel_ayan',
    parentName: 'Günel Həsənova',
    childName: 'Ayan Həsənova',
    childAge: 5,
    childGender: 'girl',
    avatarEmoji: '👧',
    phone: '+994 50 777 12 34',
    registeredAt: '2026-03-10',
    therapistNotesSummary: 'Artikulyasiya məşqləri',
  },
  {
    id: 'parent-ali',
    username: 'leyla_ali',
    parentName: 'Leyla Məmmədova',
    childName: 'Əli Məmmədov',
    childAge: 5,
    childGender: 'boy',
    avatarEmoji: '👦',
    phone: '+994 50 123 45 67',
    registeredAt: '2026-02-15',
    therapistNotesSummary: 'Səslərin düzgün tələffüzü',
  },
  {
    id: 'parent-zahra',
    username: 'ayten_zahra',
    parentName: 'Aytən Əliyeva',
    childName: 'Zəhra Əliyeva',
    childAge: 4,
    childGender: 'girl',
    avatarEmoji: '👧',
    phone: '+994 55 987 65 43',
    registeredAt: '2026-03-01',
    therapistNotesSummary: 'Söz ehtiyatının artırılması',
  },
  {
    id: 'parent-murad',
    username: 'nigar_murad',
    parentName: 'Nigar Rəhimova',
    childName: 'Murad Rəhimov',
    childAge: 6,
    childGender: 'boy',
    avatarEmoji: '👦',
    phone: '+994 70 555 43 21',
    registeredAt: '2026-02-28',
    therapistNotesSummary: 'Sərbəst cümlə qurma',
  },
];

// Seed initial notifications
const INITIAL_NOTIFICATIONS: ParentNotification[] = [
  {
    id: 'notif-seed-1',
    targetParentId: 'parent-ayan',
    childName: 'Ayan Həsənova',
    title: 'Yeni Ev Tapşırığı: Rəngləri Tap',
    message: 'Ayanla birlikdə "Rənglər və Çalarlar" fəaliyyətini gündə 5 dəqiqə təkrar edin.',
    type: 'homework',
    createdAt: '2026-10-01 14:30',
    isRead: false,
  },
  {
    id: 'notif-seed-2',
    targetParentId: 'parent-ayan',
    childName: 'Ayan Həsənova',
    title: 'Loqoped Seans Qeydi: Ayan Həsənova',
    message: 'Ayan "R" hərfini deməkdə çətinlik çəkir. Evdə "R" hərfi ilə bağlı sözləri (Nar, Rəng, Qatar) daha çox dedirdin.',
    type: 'session_note',
    createdAt: '2026-10-02 09:15',
    isRead: false,
  },
];

const INITIAL_HOMEWORK: AssignedHomework[] = [
  {
    id: 'hw-seed-1',
    targetParentId: 'parent-ayan',
    childName: 'Ayan Həsənova',
    parentName: 'Günel Həsənova',
    activityId: 'colors',
    activityTitle: 'Rəngləri Təbii Nitqlə Tələffüz Et',
    category: 'Söz Ehtiyatı',
    instructions: 'Ayanla birlikdə rəng kartlarını göstərərək adlarını aydın tələffüz edin.',
    assignedDate: '2026-10-01',
    dueDate: '2026-10-08',
    targetSkill: 'Rənglərin adlandırılması və təmiz artikulyasiya',
    parentNote: 'Tələsmədən, səsləri uzadaraq təkrar edin.',
    status: 'assigned',
    score: 0,
    attemptsCount: 0,
  },
  {
    id: 'hw-seed-2',
    targetParentId: 'parent-ali',
    childName: 'Əli Məmmədov',
    parentName: 'Leyla Məmmədova',
    activityId: 'animals',
    activityTitle: 'Heyvan Səslərinin İmitasiyası',
    category: 'Artikulyasiya',
    instructions: 'Gündə 5 dəqiqə heyvanların çıxardığı səsləri təkrar edin.',
    assignedDate: '2026-09-28',
    dueDate: '2026-10-05',
    targetSkill: 'Tənəffüs və səs tonusu',
    parentNote: 'Əlini ruhlandırın, hər uğurlu tələffüzə ulduz verin.',
    status: 'completed',
    score: 95,
    attemptsCount: 2,
    completedDate: '2026-10-01',
  },
];

const INITIAL_NOTES: TherapistSessionNote[] = [
  {
    id: 'note-seed-1',
    targetParentId: 'parent-ayan',
    childName: 'Ayan Həsənova',
    parentName: 'Günel Həsənova',
    date: '2026-10-02',
    activityPerformed: 'Dil gimnastikası və artikulyasiya təlimi',
    observations: 'Ayan "R" hərfini deməkdə çətinlik çəkir. "R" hərfi ilə bağlı sözləri daha çox dedirdin.',
    progress: 'Dodaq və dil əzələləri fəallaşıb, təkrarlara həvəslidir.',
    difficulties: '"R" səsində titrəmə əvəzinə boğaz səsi verir.',
    nextSessionPlan: 'Dil ucunun yuxarı qaldırılması və "Trrr" vibrasiya məşqi.',
    therapistName: 'Demo Loqoped',
    notifiedParent: true,
    createdAt: '2026-10-02 09:15',
  },
  {
    id: 'note-seed-2',
    targetParentId: 'parent-ali',
    childName: 'Əli Məmmədov',
    parentName: 'Leyla Məmmədova',
    date: '2026-09-30',
    activityPerformed: 'Tənəffüs və səs gücləndirmə',
    observations: 'Əli tapşırıqları yüksək fəallıqla icra etdi. Cümlələri daha axıcıdır.',
    progress: 'Tənəffüs idarəsi 80%-ə yüksəldi.',
    difficulties: 'Yalnız bəzi uzun sözlərdə heca buraxır.',
    nextSessionPlan: 'Üçhecalı ritmik sözlərlə nağıl danışma.',
    therapistName: 'Demo Loqoped',
    notifiedParent: false,
    createdAt: '2026-09-30 11:00',
  },
];

// Helper to safely read from localStorage
function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {}
  return fallback;
}

// Helper to safely write to localStorage
function writeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/**
 * Get all registered parent users
 */
export function getRegisteredParents(): RegisteredParentUser[] {
  return readStorage<RegisteredParentUser[]>(STORAGE_KEYS.PARENTS, INITIAL_PARENTS);
}

/**
 * Register or update a parent user in the directory
 */
export function registerParentUser(user: Partial<RegisteredParentUser> & { id: string; parentName: string; childName: string }): RegisteredParentUser {
  const current = getRegisteredParents();
  const existingIdx = current.findIndex((p) => p.id === user.id || p.username === user.username);
  
  const updatedUser: RegisteredParentUser = {
    id: user.id,
    username: user.username || user.id,
    parentName: user.parentName,
    childName: user.childName,
    childAge: user.childAge || 5,
    childGender: user.childGender || 'girl',
    avatarEmoji: user.avatarEmoji || (user.childGender === 'boy' ? '👦' : '👧'),
    phone: user.phone || '',
    registeredAt: user.registeredAt || new Date().toISOString().split('T')[0],
    therapistNotesSummary: user.therapistNotesSummary || 'Təzə qeydiyyat',
  };

  let newParents: RegisteredParentUser[];
  if (existingIdx >= 0) {
    newParents = [...current];
    newParents[existingIdx] = { ...newParents[existingIdx], ...updatedUser };
  } else {
    newParents = [updatedUser, ...current];
  }

  writeStorage(STORAGE_KEYS.PARENTS, newParents);
  return updatedUser;
}

/**
 * Notifications Management
 */
export function getParentNotifications(parentId?: string): ParentNotification[] {
  const all = readStorage<ParentNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  if (!parentId) return all;
  return all.filter((n) => n.targetParentId === parentId || n.targetParentId === 'all');
}

export function getUnreadNotificationsCount(parentId?: string): number {
  const list = getParentNotifications(parentId);
  return list.filter((n) => !n.isRead && !n.read).length;
}

export const getUnreadNotificationCount = getUnreadNotificationsCount;

export function sendParentNotification(
  notif: Omit<ParentNotification, 'id' | 'createdAt' | 'isRead'>
): ParentNotification {
  const current = readStorage<ParentNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const now = new Date();
  const dateStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const newNotif: ParentNotification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...notif,
    createdAt: dateStr,
    isRead: false,
  };

  const updated = [newNotif, ...current];
  writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  
  // Dispatch custom window event so open components reactively update
  try {
    window.dispatchEvent(new CustomEvent('kml_notification_added', { detail: newNotif }));
  } catch {}

  return newNotif;
}

export function markNotificationAsRead(id: string): void {
  const current = readStorage<ParentNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const updated = current.map((n) => (n.id === id ? { ...n, isRead: true } : n));
  writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  try {
    window.dispatchEvent(new CustomEvent('kml_notifications_updated'));
  } catch {}
}

export function markAllNotificationsAsRead(parentId?: string): void {
  const current = readStorage<ParentNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  const updated = current.map((n) => {
    if (!parentId || n.targetParentId === parentId || n.targetParentId === 'all') {
      return { ...n, isRead: true };
    }
    return n;
  });
  writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  try {
    window.dispatchEvent(new CustomEvent('kml_notifications_updated'));
  } catch {}
}

/**
 * Homework Management
 */
export function getAssignedHomeworkList(parentId?: string): AssignedHomework[] {
  const all = readStorage<AssignedHomework[]>(STORAGE_KEYS.HOMEWORK, INITIAL_HOMEWORK);
  if (!parentId) return all;
  return all.filter((hw) => hw.targetParentId === parentId);
}

export function assignHomeworkToParent(
  hwData: Omit<AssignedHomework, 'id' | 'assignedDate' | 'status' | 'score' | 'attemptsCount'>
): AssignedHomework {
  const current = readStorage<AssignedHomework[]>(STORAGE_KEYS.HOMEWORK, INITIAL_HOMEWORK);
  const newHw: AssignedHomework = {
    id: `hw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...hwData,
    assignedDate: new Date().toISOString().split('T')[0],
    status: 'assigned',
    score: 0,
    attemptsCount: 0,
  };

  const updated = [newHw, ...current];
  writeStorage(STORAGE_KEYS.HOMEWORK, updated);

  // Send automated notification to the target parent
  sendParentNotification({
    targetParentId: hwData.targetParentId,
    childName: hwData.childName,
    title: `Yeni Ev Tapşırığı: ${hwData.activityTitle}`,
    message: `${hwData.instructions}${hwData.parentNote ? ` (Valideyn qeydi: ${hwData.parentNote})` : ''}`,
    type: 'homework',
    relatedId: newHw.id,
  });

  return newHw;
}

/**
 * Session Notes Management
 */
export function getSessionNotesList(parentId?: string): TherapistSessionNote[] {
  const all = readStorage<TherapistSessionNote[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  if (!parentId) return all;
  return all.filter((note) => note.targetParentId === parentId);
}

export function saveSessionNote(
  noteData: Omit<TherapistSessionNote, 'id' | 'createdAt'>
): TherapistSessionNote {
  const current = readStorage<TherapistSessionNote[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  const now = new Date();
  const dateStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newNote: TherapistSessionNote = {
    id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...noteData,
    createdAt: dateStr,
  };

  const updated = [newNote, ...current];
  writeStorage(STORAGE_KEYS.NOTES, updated);

  // If the therapist checked "Valideynə bildiriş göndər", dispatch notification!
  if (noteData.notifiedParent) {
    sendParentNotification({
      targetParentId: noteData.targetParentId,
      childName: noteData.childName,
      title: `Loqoped Seans Qeydi: ${noteData.childName}`,
      message: noteData.observations,
      type: 'session_note',
      relatedId: newNote.id,
    });
  }

  return newNote;
}
