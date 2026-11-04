import type { PointerEvent } from 'react';
import { useDragOffset } from '../../hooks/use-drag-offset';
import { useMarquee } from '../../hooks/use-marquee';
import { DesktopIcon } from '../../organism/desktop-icon/desktop-icon';
import { PROGRAM_IDS, PROGRAMS, type ProgramId } from '../../programs/registry';
import { iconBox, useIconActions, useIconStore } from './store/icon-store';
import { useWindowActions } from './store/window-store';

export function DesktopIcons() {
  const cells = useIconStore((s) => s.cells);
  const selectedIds = useIconStore((s) => s.selectedIds);
  const { select, toggle, selectAll, selectInBox, clearSelection, moveSelection } =
    useIconActions();
  const { open } = useWindowActions();
  const { marquee, startMarquee } = useMarquee();
  const { offset, startDrag } = useDragOffset();

  function handleDesktopPointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    clearSelection();
    startMarquee(event, selectInBox);
  }

  function handleIconPointerDown(id: ProgramId, event: PointerEvent<HTMLButtonElement>) {
    if (event.ctrlKey || event.metaKey) {
      toggle(id);
      return;
    }
    // pressing an icon in the selection drags the whole selection, as in xp
    if (!selectedIds.includes(id)) select(id);
    startDrag(event, (dx, dy) => {
      // a press that never moved is a click, which narrows the selection to this icon
      if (dx === 0 && dy === 0) select(id);
      else moveSelection(dx, dy);
    });
  }

  return (
    <>
      <ul
        // positioned so the icons paint above the wallpaper image
        className="absolute inset-0 touch-none select-none"
        onPointerDown={handleDesktopPointerDown}
      >
        {PROGRAM_IDS.map((id) => {
          const isSelected = selectedIds.includes(id);
          const { left, top } = iconBox(cells[id]);
          const shift = isSelected && offset ? offset : { dx: 0, dy: 0 };
          return (
            <li
              key={id}
              className="absolute"
              style={{ left: left + shift.dx, top: top + shift.dy }}
            >
              <DesktopIcon
                label={PROGRAMS[id].title}
                icon={PROGRAMS[id].icon}
                isSelected={isSelected}
                onPointerDown={(event) => handleIconPointerDown(id, event)}
                onSelectAll={selectAll}
                // opening a selected icon opens the whole selection, as in xp
                onOpen={() => (isSelected ? selectedIds : [id]).forEach(open)}
              />
            </li>
          );
        })}
      </ul>
      {marquee && (
        <div
          data-testid="marquee"
          className="border-highlight bg-highlight/30 pointer-events-none absolute border"
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
