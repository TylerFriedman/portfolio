import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';
import { useSessionStore } from './session/store/session-store';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    sessionStorage.clear();
    useSessionStore.setState(useSessionStore.getInitialState(), true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('boots, waits for the user to log on, then welcomes them to the desktop', async () => {
    const playSpy = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    render(<App />);

    expect(screen.getByRole('progressbar', { name: 'Starting up' })).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(3000));
    fireEvent.click(screen.getByRole('button', { name: 'Tyler Friedman' }));

    expect(screen.getByRole('heading', { name: 'welcome' })).toBeInTheDocument();
    expect(playSpy).toHaveBeenCalledOnce();
    await act(() => vi.advanceTimersByTimeAsync(1500));
    expect(screen.getByRole('list', { name: 'Desktop' })).toBeInTheDocument();
  });

  it('skips the boot screen on a key press', () => {
    render(<App />);

    fireEvent.keyDown(window, { key: 'Enter' });

    expect(
      screen.getByRole('heading', { name: 'To begin, click your user name' }),
    ).toBeInTheDocument();
  });

  it('starts the boot again when the computer is turned off', () => {
    render(<App />);

    fireEvent.keyDown(window, { key: 'Enter' });
    fireEvent.click(screen.getByRole('button', { name: 'Turn off computer' }));

    expect(screen.getByRole('progressbar', { name: 'Starting up' })).toBeInTheDocument();
  });

  it('carries on at the desktop after a refresh in the same session', async () => {
    sessionStorage.setItem('session', JSON.stringify({ state: { phase: 'desktop' } }));
    await useSessionStore.persist.rehydrate();
    render(<App />);

    expect(screen.getByRole('list', { name: 'Desktop' })).toBeInTheDocument();
  });
});
