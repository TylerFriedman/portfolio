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

  it('keeps 48px of a window on screen when it is dragged past the edge', () => {
    actions().open('about');

    actions().move('about', -5000, -5000);
    const dragged = windowFor('about');
    expect(dragged?.y).toBe(0);
    expect((dragged?.x ?? 0) + (dragged?.width ?? 0)).toBe(48);

    // the bottom limit also clears the 30px taskbar
    actions().move('about', 5000, 5000);
    expect(windowFor('about')).toMatchObject({
      x: window.innerWidth - 48,
      y: window.innerHeight - 30 - 48,
    });
  });

  it('stops the top edge at the top of the desktop without moving the bottom', () => {
    actions().open('about');
    actions().resize('about', { x: 24, y: -50, width: 480, height: 434 });

    expect(windowFor('about')).toMatchObject({ y: 0, height: 384 });
  });

  it('opens no bigger than the space left on the desktop', () => {
    vi.stubGlobal('innerWidth', 500);
    vi.stubGlobal('innerHeight', 400);

    actions().open('about');

    expect(windowFor('about')).toMatchObject({ x: 24, y: 24, width: 476, height: 346 });
  });

  it('treats the front window as the active one', () => {
    const { result } = renderHook(() => useActiveWindowId());

    act(() => {
      actions().open('about');
      actions().open('resume');
      actions().focus('about');
    });

    expect(result.current).toBe('about');
  });

  it('has no active window once every window is minimized', () => {
    const { result } = renderHook(() => useActiveWindowId());

    act(() => {
      actions().open('about');
      actions().minimize('about');
    });

    expect(result.current).toBeNull();
  });
});
