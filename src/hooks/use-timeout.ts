import { useEffect } from 'react';

// a null delay holds the timer off until it is needed
export function useTimeout(callback: () => void, delay: number | null) {
  useEffect(() => {
    if (delay === null) return;
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
}
