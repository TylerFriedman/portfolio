import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react';
import { useDragOffset } from '../../hooks/use-drag-offset';
import { useMarquee } from '../../hooks/use-marquee';
import { DesktopIcon } from '../../organism/desktop-icon/desktop-icon';
import { PROGRAM_IDS, PROGRAMS, type ProgramId } from '../../programs/registry';
import { iconBox, iconInDirection, useIconActions, useIconStore } from './store/icon-store';
import { useWindowActions } from './store/window-store';

// cmd on a mac does what ctrl does on windows
function isCtrlHeld(event: Pick<KeyboardEvent, 'ctrlKey' | 'metaKey'>) {
  return event.ctrlKey || event.metaKey;
}

export function DesktopIcons() {
  const cells = useIconStore((s) => s.cells);
  const selectedIds = useIconStore((s) => s.selectedIds);
  const focusedId = useIconStore((s) => s.focusedId);
  const { focus, select, add, toggle, selectAll, selectInBox, clearSelection, moveSelection } =
    useIconActions();
  const { open } = useWindowActions();
  const { marquee, startMarquee } = useMarquee();
  const { offset, startDrag } = useDragOffset();
  const listRef = useRef<HTMLUListElement>(null);
  const focusedRef = useRef<HTMLButtonElement>(null);

  // focus follows the focused icon while the desktop has it, so it is never taken from a window
  useEffect(() => {
    if (listRef.current?.contains(document.activeElement)) focusedRef.current?.focus();
  }, [focusedId]);

  function handleDesktopPointerDown(event: PointerEvent<HTMLUListElement>) {
    if (event.target !== event.currentTarget) return;
    clearSelection();
    // hands focus back to the icons so the keys work after clicking or dragging on empty space
    startMarquee(event, selectInBox, () => focusedRef.current?.focus());
  }

  function handleIconPointerDown(id: ProgramId, event: PointerEvent<HTMLButtonElement>) {
    if (isCtrlHeld(event)) {
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

  function moveFocus(event: KeyboardEvent, dCol: number, dRow: number) {
    const next = iconInDirection(cells, focusedId, dCol, dRow);
    if (!next) return;
    // shift adds to the selection and ctrl moves focus alone, so space can pick icons one by one
    if (event.shiftKey) add(next);
    else if (isCtrlHeld(event)) focus(next);
    else select(next);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowUp':
        moveFocus(event, 0, -1);
        break;
      case 'ArrowDown':
        moveFocus(event, 0, 1);
        break;
      case 'ArrowLeft':
        moveFocus(event, -1, 0);
        break;
      case 'ArrowRight':
        moveFocus(event, 1, 0);
        break;
      case ' ':
        toggle(focusedId);
        break;
      case 'Enter':
        selectedIds.forEach(open);
        break;
      case 'a':
      case 'A':
        if (!isCtrlHeld(event)) return;
        selectAll();
        break;
      default:
        return;
    }
    // keeps the browser from scrolling or selecting text with the keys the desktop uses
    event.preventDefault();
  }

  return (
    <>
      <ul
        ref={listRef}
        aria-label="Desktop"
        // positioned so the icons paint above the wallpaper image
        className="absolute inset-0 touch-none select-none"
        onPointerDown={handleDesktopPointerDown}
      >
        {PROGRAM_IDS.map((id) => {
          const isSelected = selectedIds.includes(id);
          const isFocused = id === focusedId;
          const { left, top } = iconBox(cells[id]);
          const shift = isSelected && offset ? offset : { dx: 0, dy: 0 };
          return (
            <li
              key={id}
              className="absolute"
              style={{ left: left + shift.dx, top: top + shift.dy }}
            >
              <DesktopIcon
                ref={isFocused ? focusedRef : undefined}
                label={PROGRAMS[id].title}
                icon={PROGRAMS[id].icon}
                isSelected={isSelected}
                isFocused={isFocused}
                onPointerDown={(event) => handleIconPointerDown(id, event)}
                onKeyDown={handleKeyDown}
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
