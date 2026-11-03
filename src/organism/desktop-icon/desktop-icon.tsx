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
    // resets the xp.css button chrome so only the icon and label show
    <button
      type="button"
      className="group flex min-h-0 w-19 min-w-0 flex-col items-center gap-1 rounded-none border-0 bg-transparent bg-none p-0 shadow-none outline-none"
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
