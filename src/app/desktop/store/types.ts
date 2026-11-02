export type ProgramId = 'about' | 'resume' | 'projects' | 'contact';

export interface DesktopWindow {
  id: ProgramId;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface WindowState {
  windows: DesktopWindow[];
  focusOrder: ProgramId[];
}

export interface WindowActions {
  open: (id: ProgramId) => void;
  close: (id: ProgramId) => void;
  focus: (id: ProgramId) => void;
  minimize: (id: ProgramId) => void;
  toggleMaximize: (id: ProgramId) => void;
  move: (id: ProgramId, x: number, y: number) => void;
  resize: (id: ProgramId, width: number, height: number) => void;
}

export type WindowStore = WindowState & { actions: WindowActions };
