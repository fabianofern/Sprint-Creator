import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ToolProfile } from '../types';

interface AuthState {
  userId: string | null;
  profile: ToolProfile | null;
  currentProjectId: string | null;
  setUser: (userId: string | null, profile: ToolProfile | null) => void;
  setCurrentProject: (projectId: string | null) => void;
  canEdit: () => boolean;
  canAdmin: () => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      profile: null,
      currentProjectId: null,
      setUser: (userId, profile) => set({ userId, profile }),
      setCurrentProject: (currentProjectId) => set({ currentProjectId }),
      canEdit: () => {
        const { profile } = get();
        return profile === 'administrador' || profile === 'operador';
      },
      canAdmin: () => {
        const { profile } = get();
        return profile === 'administrador';
      },
      logout: () => set({ userId: null, profile: null, currentProjectId: null }),
    }),
    {
      name: 'sprint-creator-auth',
    }
  )
);
