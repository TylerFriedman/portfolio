import { create } from 'zustand';
import { PROGRAM_IDS, type ProgramId } from '../../../programs/registry';
import { overlaps, type Box } from '../../../utils/box';
import { clamp } from '../../../utils/clamp';
import { desktopSize } from '../layout';

interface Cell {
  col: number;
  row: number;
}

interface IconStore {
  cells: Record<ProgramId, Cell>;
  selectedIds: ProgramId[];
  focusedId: ProgramId;
  actions: {
    focus: (id: ProgramId) => void;
    select: (id: ProgramId) => void;
    add: (id: ProgramId) => void;
    toggle: (id: ProgramId) => void;
    selectAll: () => void;
    selectInBox: (box: Box) => void;
    clearSelection: () => void;
    moveSelection: (dx: number, dy: number) => void;
  };
}

// an icon is the 76px wide button with its one line label, spaced 16px apart
const ICON_WIDTH = 76;
const ICON_HEIGHT = 68;
const GAP = 16;
const CELL_WIDTH = ICON_WIDTH + GAP;
const CELL_HEIGHT = ICON_HEIGHT + GAP;

function gridSize() {
  const { width, height } = desktopSize();
  return {
    cols: Math.max(1, Math.floor(width / CELL_WIDTH)),
    rows: Math.max(1, Math.floor(height / CELL_HEIGHT)),
  };
}

export function iconBox({ col, row }: Cell): Box {
  const left = GAP / 2 + col * CELL_WIDTH;
  const top = GAP / 2 + row * CELL_HEIGHT;
  return { left, top, right: left + ICON_WIDTH, bottom: top + ICON_HEIGHT };
}

// limits a shift so every one of the values stays between 0 and max
function shiftWithin(shift: number, values: number[], max: number) {
  return clamp(shift, -Math.min(...values), max - Math.max(...values));
}

function cellKey({ col, row }: Cell) {
  return `${col},${row}`;
}

// the nearest icon ahead, preferring one in the same column or row so arrows move along a line
export function iconInDirection(
  cells: Record<ProgramId, Cell>,
  from: ProgramId,
  dCol: number,
  dRow: number,
) {
  const { col, row } = cells[from];
  const ahead = (id: ProgramId) => (cells[id].col - col) * dCol + (cells[id].row - row) * dRow;
  const aside = (id: ProgramId) =>
    Math.abs((cells[id].col - col) * dRow - (cells[id].row - row) * dCol);
  const byNearest = (a: ProgramId, b: ProgramId) => aside(a) - aside(b) || ahead(a) - ahead(b);
  return PROGRAM_IDS.filter((id) => ahead(id) > 0).sort(byNearest)[0];
}

// filled top to bottom then left to right, like a fresh xp desktop
function initialCells() {
  const { rows } = gridSize();
  return Object.fromEntries(
    PROGRAM_IDS.map((id, i) => [id, { col: Math.floor(i / rows), row: i % rows }]),
  ) as Record<ProgramId, Cell>;
}

export const useIconStore = create<IconStore>()((set) => ({
  cells: initialCells(),
  selectedIds: [],
  focusedId: PROGRAM_IDS[0],
  actions: {
    focus: (id) => set({ focusedId: id }),
    select: (id) => set({ selectedIds: [id], focusedId: id }),
    add: (id) =>
      set((s) => ({
        selectedIds: s.selectedIds.includes(id) ? s.selectedIds : [...s.selectedIds, id],
        focusedId: id,
      })),
    toggle: (id) =>
      set((s) => ({
        selectedIds: s.selectedIds.includes(id)
          ? s.selectedIds.filter((other) => other !== id)
          : [...s.selectedIds, id],
        focusedId: id,
      })),
    selectAll: () => set({ selectedIds: PROGRAM_IDS }),
    selectInBox: (box) =>
      set((s) => {
        const selectedIds = PROGRAM_IDS.filter((id) => overlaps(box, iconBox(s.cells[id])));
        return { selectedIds, focusedId: selectedIds[0] ?? s.focusedId };
      }),
    clearSelection: () => set({ selectedIds: [] }),
    moveSelection: (dx, dy) =>
      set((s) => {
        const { cols, rows } = gridSize();
        const moving = s.selectedIds.map((id) => s.cells[id]);
        // the whole group shifts by the same amount so it keeps its shape at the edges
        const dCol = shiftWithin(
          Math.round(dx / CELL_WIDTH),
          moving.map((cell) => cell.col),
          cols - 1,
        );
        const dRow = shiftWithin(
          Math.round(dy / CELL_HEIGHT),
          moving.map((cell) => cell.row),
          rows - 1,
        );
        const targets = moving.map(({ col, row }) => ({ col: col + dCol, row: row + dRow }));
        const taken = new Set(
          PROGRAM_IDS.filter((id) => !s.selectedIds.includes(id)).map((id) => cellKey(s.cells[id])),
        );

        // dropping onto another icon puts the group back so icons never stack
        if (targets.some((cell) => taken.has(cellKey(cell)))) return s;
        return {
          cells: {
            ...s.cells,
            ...Object.fromEntries(s.selectedIds.map((id, i) => [id, targets[i]])),
          },
        };
      }),
  },
}));

export function useIconActions() {
  return useIconStore((s) => s.actions);
}
