import clsx from 'clsx';
import type { PointerEvent, ReactNode } from 'react';
import { trackDrag } from '../../utils/track-drag';

interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MIN_WIDTH = 200;
const MIN_HEIGHT = 120;

// x and y say which way each handle grows the window, corners come last so they sit above the edges
const RESIZE_HANDLES = [
  { edge: 'top', x: 0, y: -1, className: 'inset-x-2 -top-1 h-2 cursor-ns-resize' },
  { edge: 'right', x: 1, y: 0, className: 'inset-y-2 -right-1 w-2 cursor-ew-resize' },
  { edge: 'bottom', x: 0, y: 1, className: 'inset-x-2 -bottom-1 h-2 cursor-ns-resize' },
  { edge: 'left', x: -1, y: 0, className: 'inset-y-2 -left-1 w-2 cursor-ew-resize' },
  { edge: 'top-left', x: -1, y: -1, className: '-top-1 -left-1 size-3 cursor-nwse-resize' },
  { edge: 'top-right', x: 1, y: -1, className: '-top-1 -right-1 size-3 cursor-nesw-resize' },
  { edge: 'bottom-right', x: 1, y: 1, className: '-right-1 -bottom-1 size-3 cursor-nwse-resize' },
  { edge: 'bottom-left', x: -1, y: 1, className: '-bottom-1 -left-1 size-3 cursor-nesw-resize' },
] as const;

export interface WindowProps extends Bounds {
  title: string;
  icon: string;
  zIndex: number;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  children: ReactNode;
  onFocus: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  onMove: (x: number, y: number) => void;
  onResize: (bounds: Bounds) => void;
}

export function Window({
  title,
  icon,
  x,
  y,
  width,
  height,
  zIndex,
  isActive,
  isMinimized,
  isMaximized,
  children,
  onFocus,
  onMinimize,
  onToggleMaximize,
  onClose,
  onMove,
  onResize,
}: Readonly<WindowProps>) {
  function handleTitleBarPointerDown(event: PointerEvent<HTMLElement>) {
    // capturing the pointer from a button would swallow its click
    if (isMaximized || (event.target instanceof Element && event.target.closest('button'))) return;
    trackDrag(event, (dx, dy) => onMove(x + dx, y + dy));
  }

  function handleResizePointerDown(event: PointerEvent<HTMLElement>, dirX: number, dirY: number) {
    trackDrag(event, (dx, dy) => {
      const newWidth = Math.max(MIN_WIDTH, width + dirX * dx);
      const newHeight = Math.max(MIN_HEIGHT, height + dirY * dy);
      // a top or left edge moves the window so the opposite edge stays where it is
      onResize({
        x: dirX < 0 ? x + width - newWidth : x,
        y: dirY < 0 ? y + height - newHeight : y,
        width: newWidth,
        height: newHeight,
      });
    });
  }

  return (
    <dialog
      aria-label={title}
      // closed rather than unmounted so a program keeps its state while minimized
      open={!isMinimized}
      // flex only while open as it would override the browser hiding a closed dialog
      className={clsx('window absolute flex-col open:flex', isMaximized && 'inset-0 size-full')}
      style={isMaximized ? { zIndex } : { zIndex, left: x, top: y, width, height }}
      onPointerDown={onFocus}
    >
      <div
        className={clsx(
          'title-bar box-content touch-none select-none',
          !isActive && 'brightness-125 saturate-50',
        )}
        onPointerDown={handleTitleBarPointerDown}
        onDoubleClick={onToggleMaximize}
      >
        <div className="title-bar-text flex items-center gap-1">
          <img
            src={icon}
            alt=""
            // a native image drag would cancel the pointer drag of the window
            draggable={false}
            className="size-4"
          />
          <span>{title}</span>
        </div>
        <div className="title-bar-controls">
          <button type="button" aria-label="Minimize" onClick={onMinimize} />
          <button
            type="button"
            aria-label={isMaximized ? 'Restore' : 'Maximize'}
            onClick={onToggleMaximize}
          />
          <button type="button" aria-label="Close" onClick={onClose} />
        </div>
      </div>
      <div className="window-body flex-1 overflow-auto">{children}</div>
      {!isMaximized &&
        RESIZE_HANDLES.map((handle) => (
          <div
            key={handle.edge}
            data-testid={`resize-${handle.edge}`}
            className={clsx('absolute touch-none', handle.className)}
            onPointerDown={(event) => handleResizePointerDown(event, handle.x, handle.y)}
          />
        ))}
    </dialog>
  );
}
