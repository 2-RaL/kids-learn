/**
 * src/services/parentService.ts
 * Manages registered parent portal users, therapist homework assignments,
 * session notes, and reactive parent notifications with direct MySQL backend connection.
 */

import { apiUrl } from '../config/api';

export interface RegisteredParentUser {
  id: string;
  username: string;
  parentName: string;
  childName: string;
  childAge: number;
  childGender: 'boy' | 'girl';
  avatarEmoji?: string;
  childEmoji?: string;
  phone?: string;
  email?: string;
  registeredAt: string;
  therapistNotesSummary?: string;
  role?: string;
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

// No demo users — only real original accounts from MySQL & Admin Panel
const INITIAL_PARENTS: RegisteredParentUser[] = [];
const INITIAL_NOTIFICATIONS: ParentNotification[] = [];
const INITIAL_HOMEWORK: AssignedHomework[] = [];
const INITIAL_NOTES: TherapistSessionNote[] = [];

// Helper to safely read from localStorage while purging legacy demo seeds
function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Clean out any legacy demo users and seeds
      if (key === STORAGE_KEYS.PARENTS && Array.isArray(parsed)) {
        const cleaned = parsed.filter(
          (p: any) =>
            !String(p.id).startsWith('parent-ayan') &&
            !String(p.id).startsWith('parent-ali') &&
            !String(p.id).startsWith('parent-zahra') &&
            !String(p.id).startsWith('parent-murad')
        );
        return cleaned as T;
      }
      if (key === STORAGE_KEYS.HOMEWORK && Array.isArray(parsed)) {
        const cleaned = parsed.filter((h: any) => !String(h.id).startsWith('hw-seed'));
        return cleaned as T;
      }
      if (key === STORAGE_KEYS.NOTES && Array.isArray(parsed)) {
        const cleaned = parsed.filter((n: any) => !String(n.id).startsWith('note-seed'));
        return cleaned as T;
      }
      if (key === STORAGE_KEYS.NOTIFICATIONS && Array.isArray(parsed)) {
        const cleaned = parsed.filter((n: any) => !String(n.id).startsWith('notif-seed'));
        return cleaned as T;
      }
      return parsed;
    }
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
 * Get all registered original parent users
 */
export function getRegisteredParents(): RegisteredParentUser[] {
  return readStorage<RegisteredParentUser[]>(STORAGE_KEYS.PARENTS, INITIAL_PARENTS);
}

/**
 * Fetch real parent users directly from MySQL backend API.
 * Keeps Admin Panel, MySQL, and Therapist Portal in 100% real-time sync.
 */
export async function fetchRealParentUsers(): Promise<RegisteredParentUser[]> {
  try {
    const token = localStorage.getItem('kml-auth-token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // 1. Primary: query /api/therapist/parent-users
    const res = await fetch(apiUrl('/api/therapist/parent-users'), { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.parentUsers)) {
        writeStorage(STORAGE_KEYS.PARENTS, data.parentUsers);
        try {
          window.dispatchEvent(new CustomEvent('kml_parents_updated', { detail: data.parentUsers }));
        } catch {}
        return data.parentUsers;
      }
    }

    // 2. Fallback: if user is admin or editor, query /api/admin/users
    if (token) {
      const adminRes = await fetch(apiUrl('/api/admin/users'), { headers });
      if (adminRes.ok) {
        const adminData = await adminRes.json();
        if (Array.isArray(adminData.users)) {
          return syncAdminUsersToParentService(adminData.users);
        }
      }
    }
  } catch (err) {
    console.warn('Notice: Could not fetch parent users from MySQL API, reading cached local store:', err);
  }
  return getRegisteredParents();
}

/**
 * Synchronize users from Admin Panel to Parent Service.
 * Called whenever Admin creates, edits, or loads users in AdminPanel.
 */
export function syncAdminUsersToParentService(users: any[]): RegisteredParentUser[] {
  if (!Array.isArray(users)) return getRegisteredParents();

  // Filter only real parent/user accounts (exclude pure admin/editor unless they have parent access)
  const parents: RegisteredParentUser[] = users
    .filter((u) => {
      const role = u.role || 'user';
      const access = u.portalAccess || u.portal_access || 'both';
      return (['parent', 'user'].includes(role) || ['both', 'parent'].includes(access)) && role !== 'admin';
    })
    .map((u) => {
      const childGender: 'boy' | 'girl' = u.childGender === 'girl' || u.child_gender === 'girl' ? 'girl' : 'boy';
      const childName = (u.childName || u.child_name || u.displayName || u.display_name || u.username || '').trim();
      const parentName = (u.displayName || u.display_name || u.username || '').trim();

      return {
        id: String(u.id),
        username: u.username,
        parentName: parentName || 'Valideyn',
        childName: childName || 'Övladınız',
        childAge: u.childAge || u.child_age ? Number(u.childAge || u.child_age) : 5,
        childGender,
        avatarEmoji: childGender === 'girl' ? '👧' : '👦',
        childEmoji: childGender === 'girl' ? '👧' : '👦',
        phone: u.email || '',
        email: u.email || '',
        registeredAt: u.createdAt || u.created_at
          ? new Date(u.createdAt || u.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        therapistNotesSummary: '',
        role: u.role || 'parent',
      };
    });

  writeStorage(STORAGE_KEYS.PARENTS, parents);
  try {
    window.dispatchEvent(new CustomEvent('kml_parents_updated', { detail: parents }));
  } catch {}
  return parents;
}

/**
 * Register or update a parent user in the directory
 */
export function registerParentUser(
  user: Partial<RegisteredParentUser> & { id: string; parentName: string; childName: string }
): RegisteredParentUser {
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
    childEmoji: user.avatarEmoji || (user.childGender === 'boy' ? '👦' : '👧'),
    phone: user.phone || '',
    email: user.email || '',
    registeredAt: user.registeredAt || new Date().toISOString().split('T')[0],
    therapistNotesSummary: user.therapistNotesSummary || '',
  };

  let newParents: RegisteredParentUser[];
  if (existingIdx >= 0) {
    newParents = [...current];
    newParents[existingIdx] = { ...newParents[existingIdx], ...updatedUser };
  } else {
    newParents = [updatedUser, ...current];
  }

  writeStorage(STORAGE_KEYS.PARENTS, newParents);
  try {
    window.dispatchEvent(new CustomEvent('kml_parents_updated', { detail: newParents }));
  } catch {}
  return updatedUser;
}

/**
 * Notifications Management
 */
export function getParentNotifications(parentId?: string): ParentNotification[] {
  const all = readStorage<ParentNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  if (!parentId) return all;
  return all.filter((n) => n.targetParentId === String(parentId) || n.targetParentId === 'all');
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
  const dateStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const newNotif: ParentNotification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...notif,
    createdAt: dateStr,
    isRead: false,
  };

  const updated = [newNotif, ...current];
  writeStorage(STORAGE_KEYS.NOTIFICATIONS, updated);

  try {
    window.dispatchEvent(new CustomEvent('kml_notification_added', { detail: newNotif }));
    window.dispatchEvent(new CustomEvent('kml_notifications_updated'));
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
    if (!parentId || n.targetParentId === String(parentId) || n.targetParentId === 'all') {
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
  return all.filter((hw) => hw.targetParentId === String(parentId));
}

/**
 * Fetch homework live from MySQL database
 */
export async function fetchRealHomeworkList(childId?: string): Promise<AssignedHomework[]> {
  try {
    const token = localStorage.getItem('kml-auth-token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const url = childId
      ? apiUrl(`/api/therapist/homework?childId=${encodeURIComponent(childId)}`)
      : apiUrl('/api/therapist/homework');
    const res = await fetch(url, { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.homework)) {
        const parents = getRegisteredParents();
        const mapped: AssignedHomework[] = data.homework.map((h: any) => {
          const parentObj = parents.find((p) => p.id === String(h.child_id));
          return {
            id: String(h.id),
            targetParentId: String(h.child_id),
            childName: parentObj?.childName || h.child_name || 'Övladınız',
            parentName: parentObj?.parentName || h.parent_name || 'Valideyn',
            activityId: h.activity_id,
            activityTitle: h.activity_title,
            category: h.category || 'Ümumi',
            instructions: h.instructions,
            assignedDate: h.assigned_date ? new Date(h.assigned_date).toISOString().split('T')[0] : '',
            dueDate: h.due_date ? new Date(h.due_date).toISOString().split('T')[0] : '',
            targetSkill: h.target_skill || '',
            parentNote: h.parent_note || '',
            status: h.status || 'assigned',
            score: h.score || 0,
            attemptsCount: h.attempts_count || 0,
            completedDate: h.completed_date ? new Date(h.completed_date).toISOString().split('T')[0] : undefined,
          };
        });
        writeStorage(STORAGE_KEYS.HOMEWORK, mapped);
        try {
          window.dispatchEvent(new CustomEvent('kml_notifications_updated'));
        } catch {}
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Error fetching homework from MySQL API:', err);
  }
  return getAssignedHomeworkList(childId);
}

/**
 * Assign homework to parent with MySQL persistence and real-time notification
 */
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

  // Asynchronously persist to MySQL database
  try {
    const token = localStorage.getItem('kml-auth-token');
    if (token) {
      fetch(apiUrl('/api/therapist/homework'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childId: hwData.targetParentId,
          activityId: hwData.activityId,
          activityTitle: hwData.activityTitle,
          category: hwData.category,
          instructions: hwData.instructions,
          dueDate: hwData.dueDate,
          targetSkill: hwData.targetSkill,
          parentNote: hwData.parentNote,
        }),
      }).catch(() => {});
    }
  } catch {}

  return newHw;
}

/**
 * Session Notes Management
 */
export function getSessionNotesList(parentId?: string): TherapistSessionNote[] {
  const all = readStorage<TherapistSessionNote[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  if (!parentId) return all;
  return all.filter((note) => note.targetParentId === String(parentId));
}

/**
 * Fetch session notes live from MySQL database
 */
export async function fetchRealSessionNotesList(childId?: string): Promise<TherapistSessionNote[]> {
  try {
    const token = localStorage.getItem('kml-auth-token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const url = childId
      ? apiUrl(`/api/therapist/notes?childId=${encodeURIComponent(childId)}`)
      : apiUrl('/api/therapist/notes');
    const res = await fetch(url, { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.notes)) {
        const parents = getRegisteredParents();
        const mapped: TherapistSessionNote[] = data.notes.map((n: any) => {
          const parentObj = parents.find((p) => p.id === String(n.child_id));
          return {
            id: String(n.id),
            targetParentId: String(n.child_id),
            childName: parentObj?.childName || n.child_name || 'Uşaq',
            parentName: parentObj?.parentName || n.parent_name || 'Valideyn',
            date: n.session_date ? new Date(n.session_date).toISOString().split('T')[0] : '',
            activityPerformed: n.activity_performed,
            observations: n.observations || '',
            progress: n.progress || '',
            difficulties: n.difficulties || '',
            nextSessionPlan: n.next_session_plan || '',
            therapistName: n.therapist_name || 'Loqoped',
            notifiedParent: true,
            createdAt: n.created_at ? new Date(n.created_at).toISOString().split('T')[0] : '',
          };
        });
        writeStorage(STORAGE_KEYS.NOTES, mapped);
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Error fetching session notes from MySQL API:', err);
  }
  return getSessionNotesList(childId);
}

/**
 * Save session note with MySQL persistence and conditional parent notification
 */
export function saveSessionNote(noteData: Omit<TherapistSessionNote, 'id' | 'createdAt'>): TherapistSessionNote {
  const current = readStorage<TherapistSessionNote[]>(STORAGE_KEYS.NOTES, INITIAL_NOTES);
  const now = new Date();
  const dateStr = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

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

  // Asynchronously persist to MySQL database
  try {
    const token = localStorage.getItem('kml-auth-token');
    if (token) {
      fetch(apiUrl('/api/therapist/notes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childId: noteData.targetParentId,
          sessionDate: noteData.date,
          activityPerformed: noteData.activityPerformed,
          observations: noteData.observations,
          progress: noteData.progress,
          difficulties: noteData.difficulties || '',
          nextSessionPlan: noteData.nextSessionPlan,
        }),
      }).catch(() => {});
    }
  } catch {}

  return newNote;
}
