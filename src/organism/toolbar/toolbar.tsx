import clsx from 'clsx';

const ICON_SIZES = {
  small: 'mx-1 size-5.5',
  medium: 'h-6',
  large: 'size-7.5',
};

interface ToolbarButtonProps {
  icon: string;
  label: string;
  labelPosition?: 'beside' | 'below';
  iconSize?: keyof typeof ICON_SIZES;
  type?: 'button' | 'submit';
  hasMenu?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ToolbarButton({
  icon,
  label,
  labelPosition,
  iconSize = 'small',
  type = 'button',
  hasMenu,
  isDisabled,
  onClick,
}: Readonly<ToolbarButtonProps>) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className="button-reset enabled:hover:shadow-toolbar-button flex h-full shrink-0 items-center rounded-sm border border-transparent pr-1 enabled:hover:border-black/10 enabled:active:border-black/30 enabled:active:bg-black/10 enabled:active:*:translate-px disabled:opacity-70 disabled:grayscale"
      onClick={onClick}
    >
      <span
        className={clsx(
          'flex items-center',
          labelPosition === 'below' && 'min-w-10 flex-col gap-0.5 pl-1',
        )}
      >
        <img src={icon} alt="" className={ICON_SIZES[iconSize]} />
        <span className={labelPosition ? 'max-md:sr-only' : 'sr-only'}>{label}</span>
      </span>
      {hasMenu && (
        <span className="ml-1 border-x-3 border-t-3 border-x-transparent border-t-black" />
      )}
    </button>
  );
}

export function ToolbarSeparator() {
  return <span className="m-0.5 w-px shrink-0 self-stretch bg-black/20" />;
}
