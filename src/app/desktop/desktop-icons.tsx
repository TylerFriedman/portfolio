import { useState, type PointerEvent } from 'react';
import { overlaps, useMarquee } from '../../hooks/use-marquee';
import { DesktopIcon } from '../../organism/desktop-icon/desktop-icon';
import { PROGRAM_IDS, PROGRAMS, type ProgramId } from '../../programs/registry';
import { useWindowActions } from './store/window-store';

export function DesktopIcons() {
  const { open } = useWindowActions();
  const [selectedIds, setSelectedIds] = useState<ProgramId[]>([]);
  const { marquee, startMarquee } = useMarquee();

  function toggle(id: ProgramId) {
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id],
    );
  }

  function handlePointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    setSelectedIds([]);
    // the list items render in PROGRAM_IDS order
    const items = Array.from(event.currentTarget.children);
    startMarquee(event, (box) =>
      setSelectedIds(PROGRAM_IDS.filter((_, i) => overlaps(box, items[i].getBoundingClientRect()))),
    );
  }

  return (
    <>
      <ul
        // relative so the icons paint above the wallpaper image
        className="relative flex h-full touch-none flex-col flex-wrap content-start gap-4 p-2 select-none"
        onPointerDown={handlePointerDown}
      >
        {PROGRAM_IDS.map((id) => (
          <li key={id}>
            <DesktopIcon
              label={PROGRAMS[id].title}
              icon={PROGRAMS[id].icon}
              isSelected={selectedIds.includes(id)}
              onSelect={() => setSelectedIds([id])}
              onToggle={() => toggle(id)}
              onSelectAll={() => setSelectedIds(PROGRAM_IDS)}
              // opening a selected icon opens the whole selection, as in xp
              onOpen={() => (selectedIds.includes(id) ? selectedIds : [id]).forEach(open)}
            />
          </li>
        ))}
      </ul>
      {marquee && (
        <div
          data-testid="marquee"
          className="border-highlight bg-highlight/30 pointer-events-none fixed border"
          style={{
            left: marquee.left,
            top: marquee.top,
            width: marquee.right - marquee.left,
            height: marquee.bottom - marquee.top,
          }}
        />
      )}
    </>
  );
}
