import clsx from 'clsx';

interface DesktopIconProps {
  label: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function DesktopIcon({
  label,
  icon,
  isSelected,
  onSelect,
  onOpen,
}: Readonly<DesktopIconProps>) {
  return (
    <button
      type="button"
      className="button-reset group flex w-19 flex-col items-center gap-1"
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onOpen();
      }}
    >
      <img src={icon} alt="" draggable={false} className="size-12" />
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
