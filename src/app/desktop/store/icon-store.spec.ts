import { beforeEach, describe, expect, it } from 'vitest';
import type { ProgramId } from '../../../programs/registry';
import { iconInDirection, useIconStore } from './icon-store';

const actions = () => useIconStore.getState().actions;
const cellOf = (id: ProgramId) => useIconStore.getState().cells[id];
const selectedIds = () => useIconStore.getState().selectedIds;

describe('icon store', () => {
  beforeEach(() => {
    useIconStore.setState(useIconStore.getInitialState(), true);
  });

  it('starts with the icons stacked down the left edge', () => {
    expect(cellOf('about')).toEqual({ col: 0, row: 0 });
    expect(cellOf('contact')).toEqual({ col: 0, row: 3 });
  });

  it('toggles an icon in and out of the selection', () => {
    actions().select('about');
    actions().toggle('contact');
    expect(selectedIds()).toEqual(['about', 'contact']);

    actions().toggle('about');
    expect(selectedIds()).toEqual(['contact']);
  });

  it('selects the icons a box touches', () => {
    actions().selectInBox({ left: 50, top: 10, right: 200, bottom: 150 });

    expect(selectedIds()).toEqual(['about', 'resume']);
  });

  it('hands focus to the first icon a box selects', () => {
    actions().selectInBox({ left: 0, top: 90, right: 100, bottom: 250 });

    expect(useIconStore.getState().focusedId).toBe('resume');
  });

  it('finds the next icon along a line before one off to the side', () => {
    const cells = {
      about: { col: 0, row: 0 },
      resume: { col: 3, row: 1 },
      projects: { col: 0, row: 4 },
      contact: { col: 5, row: 5 },
    };

    expect(iconInDirection(cells, 'about', 0, 1)).toBe('projects');
    expect(iconInDirection(cells, 'about', 1, 0)).toBe('resume');
    expect(iconInDirection(cells, 'about', 0, -1)).toBeUndefined();
  });

  it('snaps a dropped icon to the nearest grid cell', () => {
    actions().select('about');
    actions().moveSelection(92 * 3 + 40, 84 * 4 - 40);

    expect(cellOf('about')).toEqual({ col: 3, row: 4 });
  });

  it('moves a selection together so it keeps its shape', () => {
    actions().selectInBox({ left: 0, top: 0, right: 100, bottom: 150 });
    actions().moveSelection(92 * 2, 0);

    expect(cellOf('about')).toEqual({ col: 2, row: 0 });
    expect(cellOf('resume')).toEqual({ col: 2, row: 1 });
  });

  it('puts an icon back when it is dropped on another icon', () => {
    actions().select('about');
    actions().moveSelection(0, 84);

    expect(cellOf('about')).toEqual({ col: 0, row: 0 });
  });

  it('stops a group at the edge of the desktop without squashing it', () => {
    actions().selectInBox({ left: 0, top: 0, right: 100, bottom: 150 });
    actions().moveSelection(10_000, 10_000);

    expect(cellOf('about')).toEqual({ col: 10, row: 6 });
    expect(cellOf('resume')).toEqual({ col: 10, row: 7 });
  });
});
