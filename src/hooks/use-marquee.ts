import { useState, type PointerEvent } from 'react';
import { clamp } from '../utils/clamp';
import { trackDrag } from '../utils/track-drag';

export interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function overlaps(a: Box, b: Box) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function useMarquee() {
  const [marquee, setMarquee] = useState<Box | null>(null);

  function startMarquee(event: PointerEvent<HTMLElement>, onResize: (box: Box) => void) {
    const { clientX: x, clientY: y } = event;
    const bounds = event.currentTarget.getBoundingClientRect();
    trackDrag(
      event,
      (dx, dy) => {
        // the far corner stays inside the element so the box never spills over its edges
        const cornerX = clamp(x + dx, bounds.left, bounds.right);
        const cornerY = clamp(y + dy, bounds.top, bounds.bottom);
        const box = {
          left: Math.min(x, cornerX),
          top: Math.min(y, cornerY),
          right: Math.max(x, cornerX),
          bottom: Math.max(y, cornerY),
        };
        setMarquee(box);
        onResize(box);
      },
      () => setMarquee(null),
    );
  }

  return { marquee, startMarquee };
}
