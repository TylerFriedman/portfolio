import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClock } from './use-clock';

describe('useClock', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('moves on to the next minute without a reload', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 3, 16, 35, 59));
    const { result } = renderHook(() => useClock());
    const before = result.current;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).not.toBe(before);
    expect(result.current).toMatch(/36/);
  });
});
