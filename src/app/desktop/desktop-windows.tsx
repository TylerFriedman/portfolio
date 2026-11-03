import { Window } from '../../organism/window/window';
import { PROGRAMS } from '../../programs/registry';
import { useActiveWindowId, useWindowActions, useWindowStore } from './store/window-store';

export function DesktopWindows() {
  const windows = useWindowStore((s) => s.windows);
  const focusOrder = useWindowStore((s) => s.focusOrder);
  const activeId = useActiveWindowId();
  const { focus, minimize, toggleMaximize, close, move, resize } = useWindowActions();

  return (
    <>
      {windows.map((w) => (
        <Window
          key={w.id}
          title={PROGRAMS[w.id].title}
          icon={PROGRAMS[w.id].icon}
          x={w.x}
          y={w.y}
          width={w.width}
          height={w.height}
          zIndex={focusOrder.indexOf(w.id)}
          isActive={w.id === activeId}
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
    </>
  );
}
