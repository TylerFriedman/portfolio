import clsx from 'clsx';

interface TaskbarButtonProps {
  title: string;
  icon: string;
  isActive: boolean;
  onActivate: () => void;
  onMinimize: () => void;
}

export function TaskbarButton({
  title,
  icon,
  isActive,
  onActivate,
  onMinimize,
}: Readonly<TaskbarButtonProps>) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      className={clsx(
        'button-reset flex h-full w-40 items-center gap-1.5 rounded-sm px-2 text-white focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-dotted',
        isActive ? 'bg-black/25' : 'bg-white/20 hover:bg-white/30',
      )}
      // xp minimizes a window when its already pressed button is clicked again
      onClick={isActive ? onMinimize : onActivate}
    >
      <img src={icon} alt="" className="size-4" />
      <span className="truncate">{title}</span>
    </button>
  );
}
