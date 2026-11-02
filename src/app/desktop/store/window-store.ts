import { create } from 'zustand';
import type { DesktopWindow, ProgramId, WindowStore } from './types';

const CASCADE_STEP = 24;
const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 360;

function patch(windows: DesktopWindow[], id: ProgramId, changes: Partial<DesktopWindow>) {
  return windows.map((w) => (w.id === id ? { ...w, ...changes } : w));
}

function without(focusOrder: ProgramId[], id: ProgramId) {
  return focusOrder.filter((other) => other !== id);
}

export const useWindowStore = create<WindowStore>()((set, get) => ({
  windows: [],
  focusOrder: [],
  actions: {
    open: (id) => {
      if (get().windows.some((w) => w.id === id)) return get().actions.focus(id);
      set((s) => {
        // offset each new window so it never lands exactly on top of the last one
        const offset = CASCADE_STEP * (s.windows.length + 1);
        const window: DesktopWindow = {
          id,
          x: offset,
          y: offset,
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
          isMinimized: false,
          isMaximized: false,
        };
        return { windows: [...s.windows, window], focusOrder: [...s.focusOrder, id] };
      });
    },
    close: (id) =>
      set((s) => ({
        windows: s.windows.filter((w) => w.id !== id),
        focusOrder: without(s.focusOrder, id),
      })),
    focus: (id) =>
      set((s) => ({
        windows: patch(s.windows, id, { isMinimized: false }),
        focusOrder: [...without(s.focusOrder, id), id],
      })),
    // sent to the bottom so the window underneath takes focus
    minimize: (id) =>
      set((s) => ({
        windows: patch(s.windows, id, { isMinimized: true }),
        focusOrder: [id, ...without(s.focusOrder, id)],
      })),
    toggleMaximize: (id) =>
      set((s) => ({
        windows: s.windows.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)),
      })),
    move: (id, x, y) => set((s) => ({ windows: patch(s.windows, id, { x, y }) })),
    resize: (id, width, height) =>
      set((s) => ({ windows: patch(s.windows, id, { width, height }) })),
  },
}));

export function useWindowActions() {
  return useWindowStore((s) => s.actions);
}
