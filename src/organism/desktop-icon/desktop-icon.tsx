import clsx from 'clsx';
import type { KeyboardEvent, PointerEvent, Ref } from 'react';

interface DesktopIconProps {
  ref?: Ref<HTMLButtonElement>;
  label: string;
  icon: string;
  isSelected: boolean;
  isFocused: boolean;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onOpen: () => void;
}

export function DesktopIcon({
  ref,
  label,
  icon,
  isSelected,
  isFocused,
  onPointerDown,
  onKeyDown,
  onOpen,
}: Readonly<DesktopIconProps>) {
  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isSelected}
      // only the focused icon is a tab stop, the arrow keys reach the rest
      tabIndex={isFocused ? 0 : -1}
      className="button-reset group flex w-19 flex-col items-center gap-1"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onDoubleClick={onOpen}
    >
      <span className="relative">
        <img src={icon} alt="" draggable={false} className="size-12" />
        {isSelected && (
          <span
            className="bg-highlight/50 absolute inset-0 mask-contain mask-no-repeat"
            // masked to the icon's own shape so only the picture is tinted, as in xp
            style={{ maskImage: `url(${icon})` }}
          />
        )}
      </span>
      <span
        className={clsx(
          'px-0.5 text-white text-shadow-2xs text-shadow-black group-focus-visible:outline-1 group-focus-visible:outline-white group-focus-visible:outline-dotted',
          isSelected && 'bg-highlight',
        )}
      >
        {label}
      </span>
    </button>
  );
}
