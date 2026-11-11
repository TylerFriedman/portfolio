import { create } from 'zustand';
import type { ProgramId } from '../../../programs/registry';
import { clamp } from '../../../utils/clamp';
import { desktopSize } from '../layout';

interface DesktopWindow {
  id: ProgramId;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowStore {
  windows: DesktopWindow[];
  focusOrder: ProgramId[];
  actions: {
    open: (id: ProgramId) => void;
    close: (id: ProgramId) => void;
    focus: (id: ProgramId) => void;
    minimize: (id: ProgramId) => void;
    toggleMaximize: (id: ProgramId) => void;
    move: (id: ProgramId, x: number, y: number) => void;
    resize: (id: ProgramId, bounds: Pick<DesktopWindow, 'x' | 'y' | 'width' | 'height'>) => void;
  };
}

const CASCADE_STEP = 24;
const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;
const VISIBLE_EDGE = 48;

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
      if (get().windows.some((w) => w.id === id)) {
        get().actions.focus(id);
        return;
      }
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
      set((s) => {
        const { width, height } = desktopSize();
        return {
          windows: patch(s.windows, id, (w) => ({
            x: clamp(x, VISIBLE_EDGE - w.width, width - VISIBLE_EDGE),
            y: clamp(y, 0, height - VISIBLE_EDGE),
          })),
        };
      }),
    // the top edge stops at the top of the desktop so the title bar stays in reach
    resize: (id, { x, y, width, height }) =>
      set((s) => {
        const top = Math.max(y, 0);
        return {
          windows: patch(s.windows, id, () => ({ x, y: top, width, height: height + y - top })),
        };
      }),
  },
}));

export function useWindowActions() {
  return useWindowStore((s) => s.actions);
}

export function useActiveWindowId() {
  return useWindowStore((s) => {
    const top = s.windows.find((w) => w.id === s.focusOrder.at(-1));
    return top && !top.isMinimized ? top.id : null;
  });
}
