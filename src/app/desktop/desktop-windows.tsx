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
      {windows.map((w) => {
        const { title, icon, component: Program, minSize } = PROGRAMS[w.id];
        return (
          <Window
            key={w.id}
            title={title}
            icon={icon}
            minSize={minSize}
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
            onResize={(bounds) => resize(w.id, bounds)}
          >
            <Program />
          </Window>
        );
      })}
    </>
  );
}
