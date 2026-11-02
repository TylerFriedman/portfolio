import type { PointerEvent } from 'react';

export function trackDrag(
  event: PointerEvent<HTMLElement>,
  onDrag: (dx: number, dy: number) => void,
) {
  if (event.button !== 0) return;

  const target: HTMLElement = event.currentTarget;
  const { clientX, clientY } = event;
  const drag = new AbortController();

  // capture keeps the moves coming when the pointer outruns the element
  target.setPointerCapture(event.pointerId);
  target.addEventListener(
    'pointermove',
    (move) => onDrag(move.clientX - clientX, move.clientY - clientY),
    { signal: drag.signal },
  );
  target.addEventListener('pointerup', () => drag.abort(), { signal: drag.signal });
  target.addEventListener('pointercancel', () => drag.abort(), { signal: drag.signal });
}
