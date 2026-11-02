import { beforeEach, describe, expect, it } from 'vitest';
import type { ProgramId } from './types';
import { useWindowStore } from './window-store';

const actions = () => useWindowStore.getState().actions;
const windowFor = (id: ProgramId) => useWindowStore.getState().windows.find((w) => w.id === id);
const topWindow = () => useWindowStore.getState().focusOrder.at(-1);

describe('window store', () => {
  beforeEach(() => {
    useWindowStore.setState(useWindowStore.getInitialState(), true);
  });

  it('raises an already open program instead of opening a second window', () => {
    actions().open('about');
    actions().open('resume');
    actions().open('about');

    expect(useWindowStore.getState().windows.map((w) => w.id)).toEqual(['about', 'resume']);
    expect(topWindow()).toBe('about');
  });

  it('cascades new windows so they never cover each other exactly', () => {
    actions().open('about');
    actions().open('resume');

    expect(windowFor('resume')?.x).toBeGreaterThan(windowFor('about')?.x ?? Infinity);
    expect(windowFor('resume')?.y).toBeGreaterThan(windowFor('about')?.y ?? Infinity);
  });

  it('keeps the taskbar order when focus changes', () => {
    actions().open('about');
    actions().open('resume');
    actions().focus('about');

    expect(useWindowStore.getState().windows.map((w) => w.id)).toEqual(['about', 'resume']);
  });

  it('hands focus to the window below when the top one is minimized', () => {
    actions().open('about');
    actions().open('resume');
    actions().minimize('resume');

    expect(topWindow()).toBe('about');
  });

  it('hands focus to the window below when the top one is closed', () => {
    actions().open('about');
    actions().open('resume');
    actions().close('resume');

    expect(windowFor('resume')).toBeUndefined();
    expect(topWindow()).toBe('about');
  });

  it('restores a minimized window when its program is opened again', () => {
    actions().open('about');
    actions().minimize('about');
    actions().open('about');

    expect(windowFor('about')?.isMinimized).toBe(false);
    expect(topWindow()).toBe('about');
  });

  it('brings a maximized window back maximized after it was minimized', () => {
    actions().open('about');
    actions().toggleMaximize('about');
    actions().minimize('about');
    actions().focus('about');

    expect(windowFor('about')).toMatchObject({ isMinimized: false, isMaximized: true });
  });
});
