import { useRef, type PointerEvent } from 'react';

// opens on click so the tap never lands on what it opened, as safari's click doesn't say it was a finger
export function useTap(onTap: () => void) {
  const isTouch = useRef(false);
  return {
    onPointerDown: (event: PointerEvent) => {
      isTouch.current = event.pointerType === 'touch';
    },
    onClick: () => {
      if (isTouch.current) onTap();
    },
  };
}
