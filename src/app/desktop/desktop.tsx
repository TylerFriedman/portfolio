import { useEffect } from 'react';
import { Window } from '../../organism/window/window';
import { PROGRAMS } from '../../programs/registry';
import { useWindowActions, useWindowStore } from './store/window-store';

export function Desktop() {
  const windows = useWindowStore((s) => s.windows);
  const focusOrder = useWindowStore((s) => s.focusOrder);
  const { open, focus, minimize, toggleMaximize, close, move, resize } = useWindowActions();

  // placeholder until desktop icons can open programs
  useEffect(() => {
    open('about');
  }, [open]);

  return (
    <main className="bg-desktop relative h-dvh overflow-hidden">
      {windows.map((w) => (
        <Window
          key={w.id}
          title={PROGRAMS[w.id].title}
          x={w.x}
          y={w.y}
          width={w.width}
          height={w.height}
          zIndex={focusOrder.indexOf(w.id)}
          isMinimized={w.isMinimized}
          isMaximized={w.isMaximized}
          onFocus={() => focus(w.id)}
          onMinimize={() => minimize(w.id)}
          onToggleMaximize={() => toggleMaximize(w.id)}
          onClose={() => close(w.id)}
          onMove={(x, y) => move(w.id, x, y)}
          onResize={(width, height) => resize(w.id, width, height)}
        >
          <p>Placeholder content</p>
        </Window>
      ))}
    </main>
  );
}
