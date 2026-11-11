import clsx from 'clsx';
import type { ReactNode } from 'react';
import addressDropdownIcon from '../../assets/icons/address-dropdown.webp';
import backIcon from '../../assets/icons/back.webp';
import foldersIcon from '../../assets/icons/folders.webp';
import forwardIcon from '../../assets/icons/forward.webp';
import goIcon from '../../assets/icons/go.webp';
import searchIcon from '../../assets/icons/search.webp';
import upIcon from '../../assets/icons/up.webp';
import viewsIcon from '../../assets/icons/views.webp';
import windowsFlag from '../../assets/icons/windows-flag.webp';

const MENUS = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];

interface ToolbarButtonProps {
  icon: string;
  label: string;
  isLabelShown?: boolean;
  isLarge?: boolean;
  hasMenu?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

function ToolbarButton({
  icon,
  label,
  isLabelShown,
  isLarge,
  hasMenu,
  isDisabled,
  onClick,
}: Readonly<ToolbarButtonProps>) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className="button-reset enabled:hover:shadow-toolbar-button flex h-full items-center rounded-sm border border-transparent pr-1 enabled:hover:border-black/10 enabled:active:border-black/30 enabled:active:bg-black/10 enabled:active:*:translate-px disabled:opacity-70 disabled:grayscale"
      onClick={onClick}
    >
      <img src={icon} alt="" className={isLarge ? 'size-7.5' : 'mx-1 size-5.5'} />
      <span className={clsx(!isLabelShown && 'sr-only')}>{label}</span>
      {hasMenu && (
        <span className="ml-1 border-x-3 border-t-3 border-x-transparent border-t-black" />
      )}
    </button>
  );
}

function ToolbarSeparator() {
  return <span className="mx-0.5 h-8 w-px bg-black/20" />;
}

interface ExplorerProps {
  address: string;
  addressIcon: string;
  taskPane: ReactNode;
  children: ReactNode;
  // left out while there is nowhere to go, which greys the button out as in xp
  onBack?: () => void;
  onUp?: () => void;
}

export function Explorer({
  address,
  addressIcon,
  taskPane,
  children,
  onBack,
  onUp,
}: Readonly<ExplorerProps>) {
  return (
    <div className="bg-explorer font-xp text-xp flex min-h-0 flex-1 flex-col">
      <div aria-hidden className="flex h-6 shrink-0 border-b border-white/70">
        <ul className="flex flex-1 items-center border-r border-b border-black/10 px-0.5">
          {MENUS.map((menu) => (
            <li key={menu} className="px-1.5">
              {menu}
            </li>
          ))}
        </ul>
        <img
          src={windowsFlag}
          alt=""
          className="border-b border-l border-b-black/10 border-l-white"
        />
      </div>
      <div className="flex h-9 shrink-0 items-center border-b border-black/10 px-0.75 pt-px">
        <ToolbarButton
          icon={backIcon}
          label="Back"
          isLabelShown
          isLarge
          hasMenu
          isDisabled={!onBack}
          onClick={onBack}
        />
        <ToolbarButton icon={forwardIcon} label="Forward" isLarge hasMenu isDisabled />
        <ToolbarButton icon={upIcon} label="Up" isDisabled={!onUp} onClick={onUp} />
        <ToolbarSeparator />
        {/* shown for the look of xp only, so they are kept out of reach */}
        <div inert className="flex h-full items-center">
          <ToolbarButton icon={searchIcon} label="Search" isLabelShown />
          <ToolbarButton icon={foldersIcon} label="Folders" isLabelShown />
          <ToolbarSeparator />
          <ToolbarButton icon={viewsIcon} label="Views" hasMenu />
        </div>
      </div>
      <div className="flex h-5.5 shrink-0 items-center border-t border-white/70 px-0.5">
        <span className="px-1.25 text-black/50">Address</span>
        <p className="border-address-border relative flex h-full flex-1 items-center gap-1 border bg-white pl-0.5">
          <img src={addressIcon} alt="" className="size-3.5" />
          <span className="truncate">{address}</span>
          <img src={addressDropdownIcon} alt="" className="absolute right-px h-4.5" />
        </p>
        <span aria-hidden className="flex items-center gap-1 pr-4.5 pl-1.25">
          <img src={goIcon} alt="" />
          <span>Go</span>
        </span>
      </div>
      <div className="flex min-h-0 flex-1 border border-t-0 border-black/40">
        <aside className="bg-task-pane flex w-45 shrink-0 flex-col gap-3 overflow-auto p-2.5">
          {taskPane}
        </aside>
        <div className="min-w-0 flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </div>
  );
}

interface ExplorerSectionProps {
  title: string;
  children?: ReactNode;
}

export function ExplorerSection({ title, children }: Readonly<ExplorerSectionProps>) {
  return (
    <section>
      <h2 className="text-xp pt-0.5 pb-0.75 pl-3 font-bold">{title}</h2>
      <hr className="from-explorer-rule h-px w-75 border-0 bg-linear-to-r to-white" />
      <div className="p-4">{children}</div>
    </section>
  );
}
