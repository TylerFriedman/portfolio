import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProgramId } from '../../../programs/registry';
import { useActiveWindowId, useWindowStore } from './window-store';

const actions = () => useWindowStore.getState().actions;
const windowFor = (id: ProgramId) => useWindowStore.getState().windows.find((w) => w.id === id);
const topWindow = () => useWindowStore.getState().focusOrder.at(-1);

describe('window store', () => {
  beforeEach(() => {
    useWindowStore.setState(useWindowStore.getInitialState(), true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('raises an already open program instead of opening a second window', () => {
    actions().open('notepad');
    actions().open('resume');
    actions().open('notepad');

    expect(useWindowStore.getState().windows.map((w) => w.id)).toEqual(['notepad', 'resume']);
    expect(topWindow()).toBe('notepad');
  });

  it('opens a dialog at its own size and other programs at the default', () => {
    vi.stubGlobal('innerWidth', 1280);
    vi.stubGlobal('innerHeight', 800);

    actions().open('resume');
    actions().open('projects');

    expect(windowFor('resume')).toMatchObject({ width: 460, height: 480 });
    expect(windowFor('projects')).toMatchObject({ width: 640, height: 480 });
  });

  it('cascades new windows so they never cover each other exactly', () => {
    actions().open('notepad');
    actions().open('resume');

    expect(windowFor('resume')?.x).toBeGreaterThan(windowFor('notepad')?.x ?? Infinity);
    expect(windowFor('resume')?.y).toBeGreaterThan(windowFor('notepad')?.y ?? Infinity);
  });

  it('keeps the taskbar order when focus changes', () => {
    actions().open('notepad');
    actions().open('resume');
    actions().focus('notepad');

    expect(useWindowStore.getState().windows.map((w) => w.id)).toEqual(['notepad', 'resume']);
  });

  it('hands focus to the window below when the top one is minimized', () => {
    actions().open('notepad');
    actions().open('resume');
    actions().minimize('resume');

    expect(topWindow()).toBe('notepad');
  });

  it('hands focus to the window below when the top one is closed', () => {
    actions().open('notepad');
    actions().open('resume');
    actions().close('resume');

    expect(windowFor('resume')).toBeUndefined();
    expect(topWindow()).toBe('notepad');
  });

  it('restores a minimized window when its program is opened again', () => {
    actions().open('notepad');
    actions().minimize('notepad');
    actions().open('notepad');

    expect(windowFor('notepad')?.isMinimized).toBe(false);
    expect(topWindow()).toBe('notepad');
  });

  it('brings a maximized window back maximized after it was minimized', () => {
    actions().open('notepad');
    actions().toggleMaximize('notepad');
    actions().minimize('notepad');
    actions().focus('notepad');

    expect(windowFor('notepad')).toMatchObject({ isMinimized: false, isMaximized: true });
  });

  it('keeps 48px of a window on screen when it is dragged past the edge', () => {
    actions().open('notepad');

    actions().move('notepad', -5000, -5000);
    const dragged = windowFor('notepad');
    expect(dragged?.y).toBe(0);
    expect((dragged?.x ?? 0) + (dragged?.width ?? 0)).toBe(48);

    // the bottom limit also clears the 30px taskbar
    actions().move('notepad', 5000, 5000);
    expect(windowFor('notepad')).toMatchObject({
      x: window.innerWidth - 48,
      y: window.innerHeight - 30 - 48,
    });
  });

  it('stops the top edge at the top of the desktop without moving the bottom', () => {
    actions().open('notepad');
    actions().resize('notepad', { x: 24, y: -50, width: 480, height: 434 });

    expect(windowFor('notepad')).toMatchObject({ y: 0, height: 384 });
  });

  it('opens no bigger than the space left on the desktop', () => {
    vi.stubGlobal('innerWidth', 500);
    vi.stubGlobal('innerHeight', 400);

    actions().open('notepad');

    expect(windowFor('notepad')).toMatchObject({ x: 24, y: 24, width: 476, height: 346 });
  });

  it('treats the front window as the active one', () => {
    const { result } = renderHook(() => useActiveWindowId());

    act(() => {
      actions().open('notepad');
      actions().open('resume');
      actions().focus('notepad');
    });

    expect(result.current).toBe('notepad');
  });

  it('has no active window once every window is minimized', () => {
    const { result } = renderHook(() => useActiveWindowId());

    act(() => {
      actions().open('notepad');
      actions().minimize('notepad');
    });

    expect(result.current).toBeNull();
  });
});
