import { useState, type PointerEvent } from 'react';
import type { Box } from '../utils/box';
import { clamp } from '../utils/clamp';
import { trackDrag } from '../utils/track-drag';

// the box is measured from the element's top left corner
export function useMarquee() {
  const [marquee, setMarquee] = useState<Box | null>(null);

  function startMarquee(event: PointerEvent<HTMLElement>, onResize: (box: Box) => void) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    trackDrag(
      event,
      (dx, dy) => {
        // the far corner stays inside the element so the box never spills over its edges
        const cornerX = clamp(x + dx, 0, bounds.width);
        const cornerY = clamp(y + dy, 0, bounds.height);
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
