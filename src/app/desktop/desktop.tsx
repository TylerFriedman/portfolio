import { useState } from 'react';
import wallpaper from '../../assets/wallpaper.webp';
import { DesktopIcon } from '../../organism/desktop-icon/desktop-icon';
import { Window } from '../../organism/window/window';
import { PROGRAM_IDS, PROGRAMS, type ProgramId } from '../../programs/registry';
import { useWindowActions, useWindowStore } from './store/window-store';

export function Desktop() {
  const windows = useWindowStore((s) => s.windows);
  const focusOrder = useWindowStore((s) => s.focusOrder);
  const { open, focus, minimize, toggleMaximize, close, move, resize } = useWindowActions();
  const [selectedId, setSelectedId] = useState<ProgramId | null>(null);

  return (
    <main className="bg-desktop relative h-dvh overflow-hidden">
      <img src={wallpaper} alt="" className="absolute inset-0 size-full object-cover" />
      <ul
        // relative so the icons paint above the wallpaper image
        className="relative flex h-full flex-col flex-wrap content-start gap-4 p-2"
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) setSelectedId(null);
        }}
      >
        {PROGRAM_IDS.map((id) => (
          <li key={id}>
            <DesktopIcon
              label={PROGRAMS[id].title}
              icon={PROGRAMS[id].icon}
              isSelected={id === selectedId}
              onSelect={() => setSelectedId(id)}
              onOpen={() => open(id)}
            />
          </li>
        ))}
      </ul>
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
