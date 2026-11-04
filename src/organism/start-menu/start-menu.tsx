import { useId } from 'react';
import windowsLogo from '../../assets/icons/windows-logo.webp';

interface StartMenuItem {
  title: string;
  icon: string;
  onOpen: () => void;
}

interface StartMenuProps {
  userName: string;
  items: readonly StartMenuItem[];
}

export function StartMenu({ userName, items }: Readonly<StartMenuProps>) {
  const menuId = useId();

  return (
    <>
      <button
        type="button"
        popoverTarget={menuId}
        className="button-reset bg-start-button font-start text-shadow-start flex items-center gap-1.5 rounded-r-lg pr-5 pl-2.5 text-lg font-semibold text-white italic hover:brightness-105 active:brightness-90"
      >
        <img src={windowsLogo} alt="" className="size-5.5" />
        <span>Start</span>
      </button>
      <nav
        id={menuId}
        popover="auto"
        aria-label="Start menu"
        className="bg-start-menu shadow-start-menu inset-auto bottom-7.5 left-0 w-96 flex-col rounded-t-md open:flex"
      >
        <p className="bg-start-menu-header flex h-13.5 items-center rounded-t-md px-2 text-sm font-bold text-white text-shadow-2xs text-shadow-black/70">
          {userName}
        </p>
        <hr className="via-start-menu-accent mx-0.5 h-0.5 border-0 bg-linear-to-r from-transparent to-transparent" />
        <div className="mx-0.5 flex">
          <ul className="flex flex-1 flex-col gap-1 bg-white p-1.5">
            {items.map(({ title, icon, onOpen }) => (
              <li key={title}>
                <button
                  type="button"
                  popoverTarget={menuId}
                  popoverTargetAction="hide"
                  className="button-reset hover:bg-highlight flex h-8.5 w-full items-center gap-1 p-px hover:text-white"
                  onClick={onOpen}
                >
                  <img src={icon} alt="" className="size-7.5" />
                  <span>{title}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="bg-start-menu-side border-start-menu-border/40 flex-1 border-l" />
        </div>
        <div className="bg-start-menu-footer h-9" />
      </nav>
    </>
  );
}
