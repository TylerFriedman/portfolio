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
    <section
      role="dialog"
      aria-label={title}
      // hidden rather than unmounted so a program keeps its state while minimized
      hidden={isMinimized}
      className={clsx('window absolute flex flex-col', isMaximized && 'inset-0')}
      style={isMaximized ? { zIndex } : { zIndex, left: x, top: y, width, height }}
      onPointerDown={onFocus}
    >
      <div
        className="title-bar box-content touch-none select-none"
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
          {title}
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
    </section>
  );
}
