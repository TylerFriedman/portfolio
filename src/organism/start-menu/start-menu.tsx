import { useId, useRef } from 'react';
import windowsLogo from '../../assets/icons/windows-logo.webp';

interface StartMenuProgram {
  title: string;
  icon: string;
  onOpen: () => void;
}

interface StartMenuPinnedProgram extends StartMenuProgram {
  description: string;
}

interface StartMenuLink {
  title: string;
  icon: string;
  href: string;
}

interface StartMenuProps {
  userName: string;
  userPicture: string;
  programs: readonly StartMenuPinnedProgram[];
  places: readonly StartMenuProgram[];
  links: readonly StartMenuLink[];
}

export function StartMenu({
  userName,
  userPicture,
  programs,
  places,
  links,
}: Readonly<StartMenuProps>) {
  const menuId = useId();
  const menuRef = useRef<HTMLElement>(null);

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
        ref={menuRef}
        id={menuId}
        popover="auto"
        aria-label="Start menu"
        className="bg-start-menu shadow-start-menu inset-auto bottom-7.5 left-0 w-96 flex-col rounded-t-md open:flex"
      >
        <p className="bg-start-menu-header flex h-13.5 items-center gap-1.25 rounded-t-md px-1.25 text-sm font-bold text-white text-shadow-2xs text-shadow-black/70">
          <img
            src={userPicture}
            alt=""
            className="border-start-menu-picture-border size-10.5 rounded-sm border-2"
          />
          {userName}
        </p>
        <hr className="via-start-menu-accent mx-0.5 h-0.5 border-0 bg-linear-to-r from-transparent to-transparent" />
        <div className="mx-0.5 flex">
          <ul className="flex flex-1 flex-col gap-1 bg-white p-1.5">
            {programs.map(({ title, description, icon, onOpen }) => (
              <li key={title}>
                <button
                  type="button"
                  popoverTarget={menuId}
                  popoverTargetAction="hide"
                  className="button-reset hover:bg-highlight group flex h-8.5 w-full items-center gap-1 p-px text-left hover:text-white"
                  onClick={onOpen}
                >
                  <img src={icon} alt="" className="size-7.5" />
                  <span className="flex flex-col">
                    <span className="font-bold">{title}</span>
                    <span className="text-black/40 group-hover:text-white">{description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="bg-start-menu-side border-start-menu-border/40 font-xp text-menu flex flex-1 flex-col border-l px-1.25 pt-1.5 pb-1.25">
            <ul className="flex flex-col gap-1">
              {places.map(({ title, icon, onOpen }) => (
                <li key={title}>
                  <button
                    type="button"
                    popoverTarget={menuId}
                    popoverTargetAction="hide"
                    className="button-reset hover:bg-highlight text-start-menu-side-text flex h-6.5 w-full items-center gap-0.75 p-px text-left font-bold hover:text-white"
                    onClick={onOpen}
                  >
                    <img src={icon} alt="" className="size-5.5" />
                    <span>{title}</span>
                  </button>
                </li>
              ))}
            </ul>
            <hr className="via-start-menu-side-divider my-1.5 h-px border-0 bg-linear-to-r from-transparent to-transparent" />
            <ul className="flex flex-col gap-1">
              {links.map(({ title, icon, href }) => (
                <li key={title}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:bg-highlight text-start-menu-side-text flex h-6.5 items-center gap-0.75 p-px hover:text-white"
                    // a link can not be a popover target, so it closes the menu itself
                    onClick={() => menuRef.current?.hidePopover()}
                  >
                    <img src={icon} alt="" className="size-5.5" />
                    <span>{title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-start-menu-footer h-9" />
      </nav>
    </>
  );
}
