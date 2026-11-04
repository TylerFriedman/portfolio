import type { PointerEvent } from 'react';

export function trackDrag(
  event: PointerEvent<HTMLElement>,
  onDrag: (dx: number, dy: number) => void,
  onEnd?: (dx: number, dy: number) => void,
) {
  if (event.button !== 0) return;

  // typed as an html element so the native listeners below get pointer events
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
  function end(dx: number, dy: number) {
    drag.abort();
    onEnd?.(dx, dy);
  }
  target.addEventListener('pointerup', (up) => end(up.clientX - clientX, up.clientY - clientY), {
    signal: drag.signal,
  });
  // a cancelled gesture ends where it started
  target.addEventListener('pointercancel', () => end(0, 0), { signal: drag.signal });
}
