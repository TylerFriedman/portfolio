import { useState } from 'react';
import { DesktopIcon } from '../../organism/desktop-icon/desktop-icon';
import { PROGRAM_IDS, PROGRAMS, type ProgramId } from '../../programs/registry';
import { useWindowActions } from './store/window-store';

export function DesktopIcons() {
  const { open } = useWindowActions();
  const [selectedId, setSelectedId] = useState<ProgramId | null>(null);

  return (
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
  );
}
