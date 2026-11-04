import clsx from 'clsx';

interface DesktopIconProps {
  label: string;
  icon: string;
  isSelected: boolean;
  onSelect: () => void;
  onToggle: () => void;
  onSelectAll: () => void;
  onOpen: () => void;
}

export function DesktopIcon({
  label,
  icon,
  isSelected,
  onSelect,
  onToggle,
  onSelectAll,
  onOpen,
}: Readonly<DesktopIconProps>) {
  return (
    <button
      type="button"
      className="button-reset group flex w-19 flex-col items-center gap-1"
      onClick={(event) => (event.ctrlKey || event.metaKey ? onToggle() : onSelect())}
      onDoubleClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter') onOpen();
        if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
          event.preventDefault();
          onSelectAll();
        }
      }}
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
