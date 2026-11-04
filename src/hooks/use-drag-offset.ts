import { useState, type PointerEvent } from 'react';
import { trackDrag } from '../utils/track-drag';

interface Offset {
  dx: number;
  dy: number;
}

export function useDragOffset() {
  const [offset, setOffset] = useState<Offset | null>(null);

  function startDrag(event: PointerEvent<HTMLElement>, onDrop: (dx: number, dy: number) => void) {
    trackDrag(
      event,
      (dx, dy) => setOffset({ dx, dy }),
      (dx, dy) => {
        setOffset(null);
        onDrop(dx, dy);
      },
    );
  }

  return { offset, startDrag };
}
