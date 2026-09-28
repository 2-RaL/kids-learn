import { create } from 'zustand';
import { apiUrl } from '../config/api';

export type UserRole = 'admin' | 'therapist' | 'parent' | 'user';

export interface ParentProfile {
  id?: number;
  child_name?: string | null;
  child_age?: number | null;
  child_gender?: 'boy' | 'girl' | 'other' | null;
  age_group_id?: number | null;
}

export interface AuthUser {
  id: number | string;
  username: string;
  displayName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
}

export type PortalType = 'select' | 'therapist' | 'parent' | 'admin';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  parentProfile: ParentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  showAdminPanel: boolean;
  activePortal: PortalType;

  setActivePortal: (portal: PortalType) => void;
  login: (username: string, password: string, portalType?: 'therapist' | 'parent' | 'admin') => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  updateParentProfile: (profile: Partial<ParentProfile>) => Promise<boolean>;
  setShowAdminPanel: (show: boolean) => void;
  clearError: () => void;
}

const TOKEN_KEY = 'kml-auth-token';
const USER_KEY = 'kml-auth-user';
const PROFILE_KEY = 'kml-parent-profile';

function getInitialPortal(): PortalType {
  try {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#therapist') return 'therapist';
    if (hash === '#parent') return 'parent';
    if (hash === '#admin') return 'admin';
  } catch {}
  return 'select';
}

function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getStoredProfile(): ParentProfile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: getStoredToken(),
  user: getStoredUser(),
  parentProfile: getStoredProfile(),
  isAuthenticated: !!getStoredToken(),
  isLoading: false,
  error: null,
  showAdminPanel: false,
  activePortal: getInitialPortal(),

  setActivePortal: (portal: PortalType) => {
    try {
      if (portal === 'select') {
        window.location.hash = '';
      } else {
        window.location.hash = `#${portal}`;
      }
    } catch {}
    set({ activePortal: portal, error: null });
  },

  setShowAdminPanel: (showAdminPanel) => set({ showAdminPanel }),
  clearError: () => set({ error: null }),

  login: async (username: string, password: string, portalType?: 'therapist' | 'parent' | 'admin'): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, portalType }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Giriş uğursuz oldu');
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      if (data.parentProfile) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data.parentProfile));
      }

      set({
        token: data.token,
        user: data.user,
        parentProfile: data.parentProfile || null,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // Navigate to target portal if specified
      if (portalType) {
        get().setActivePortal(portalType);
      } else if (data.user.role === 'admin') {
        get().setActivePortal('admin');
      } else if (data.user.role === 'parent') {
        get().setActivePortal('parent');
      } else {
        get().setActivePortal('therapist');
      }

      return true;
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Giriş zamanı xəta baş verdi',
        isAuthenticated: false,
      });
      return false;
    }
  },

  logout: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(PROFILE_KEY);
    } catch {}
    set({
      token: null,
      user: null,
      parentProfile: null,
      isAuthenticated: false,
      showAdminPanel: false,
      error: null,
      activePortal: 'select',
    });
    try {
      window.location.hash = '';
    } catch {}
  },

  checkAuth: async () => {
    const token = get().token;
    if (!token) {
      set({ isAuthenticated: false, user: null, parentProfile: null });
      return;
    }

    try {
      const res = await fetch(apiUrl('/api/auth/me'), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        get().logout();
        return;
      }

      const data = await res.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      if (data.parentProfile) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data.parentProfile));
      }
      set({
        user: data.user,
        parentProfile: data.parentProfile || null,
        isAuthenticated: true,
      });
    } catch {
      // In case of network error, keep offline token if available
    }
  },

  updateParentProfile: async (profileUpdates: Partial<ParentProfile>) => {
    const token = get().token;
    if (!token) return false;

    try {
      const res = await fetch(apiUrl('/api/parent/profile'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          childName: profileUpdates.child_name,
          childAge: profileUpdates.child_age,
          childGender: profileUpdates.child_gender,
          ageGroupId: profileUpdates.age_group_id,
        }),
      });

      if (!res.ok) return false;
      const data = await res.json();
      const updated = data.profile;
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
      set({ parentProfile: updated });
      return true;
    } catch {
      return false;
    }
  },
}));
