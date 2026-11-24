import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Phase = 'boot' | 'logon' | 'welcome' | 'desktop';

interface SessionStore {
  phase: Phase;
  actions: {
    showLogon: () => void;
    logOn: () => void;
    showDesktop: () => void;
    turnOff: () => void;
  };
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      phase: 'boot',
      actions: {
        showLogon: () => set({ phase: 'logon' }),
        logOn: () => set({ phase: 'welcome' }),
        showDesktop: () => set({ phase: 'desktop' }),
        turnOff: () => set({ phase: 'boot' }),
      },
    }),
    // saved for the browser session so a refresh carries on where it left off
    {
      name: 'session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ phase }) => ({ phase }),
    },
  ),
);

export function useSessionActions() {
  return useSessionStore((s) => s.actions);
}
