import clsx from 'clsx';
import type { PointerEvent, ReactNode } from 'react';
import { trackDrag } from '../../utils/track-drag';

export interface WindowProps {
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
  onResize: (width: number, height: number) => void;
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
      {!isMaximized && (
        <div
          data-testid="resize-handle"
          className="absolute right-0 bottom-0 size-3 cursor-se-resize touch-none"
          onPointerDown={(event) => trackDrag(event, (dx, dy) => onResize(width + dx, height + dy))}
        />
      )}
    </dialog>
  );
}
