import { create } from 'zustand';
import type { ProgramId } from '../../../programs/registry';
import type { DesktopWindow, WindowStore } from './types';

const CASCADE_STEP = 24;
const DEFAULT_WIDTH = 480;
const DEFAULT_HEIGHT = 360;
const MIN_WIDTH = 200;
const MIN_HEIGHT = 120;
const VISIBLE_EDGE = 48;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function patch(
  windows: DesktopWindow[],
  id: ProgramId,
  change: (w: DesktopWindow) => Partial<DesktopWindow>,
) {
  return windows.map((w) => (w.id === id ? { ...w, ...change(w) } : w));
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
        const opened: DesktopWindow = {
          id,
          x: offset,
          y: offset,
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
          isMinimized: false,
          isMaximized: false,
        };
        return { windows: [...s.windows, opened], focusOrder: [...s.focusOrder, id] };
      });
    },
    close: (id) =>
      set((s) => ({
        windows: s.windows.filter((w) => w.id !== id),
        focusOrder: without(s.focusOrder, id),
      })),
    focus: (id) =>
      set((s) => ({
        windows: patch(s.windows, id, () => ({ isMinimized: false })),
        focusOrder: [...without(s.focusOrder, id), id],
      })),
    // sent to the bottom so the window underneath takes focus
    minimize: (id) =>
      set((s) => ({
        windows: patch(s.windows, id, () => ({ isMinimized: true })),
        focusOrder: [id, ...without(s.focusOrder, id)],
      })),
    toggleMaximize: (id) =>
      set((s) => ({ windows: patch(s.windows, id, (w) => ({ isMaximized: !w.isMaximized })) })),
    // keeps enough of the title bar on screen to drag the window back
    move: (id, x, y) =>
      set((s) => ({
        windows: patch(s.windows, id, (w) => ({
          x: clamp(x, VISIBLE_EDGE - w.width, window.innerWidth - VISIBLE_EDGE),
          y: clamp(y, 0, window.innerHeight - VISIBLE_EDGE),
        })),
      })),
    resize: (id, width, height) =>
      set((s) => ({
        windows: patch(s.windows, id, () => ({
          width: Math.max(width, MIN_WIDTH),
          height: Math.max(height, MIN_HEIGHT),
        })),
      })),
  },
}));

export function useWindowActions() {
  return useWindowStore((s) => s.actions);
}
