import type { ReactNode } from 'react';
import windowsLogo from '../../assets/icons/windows-logo.webp';

interface TaskbarProps {
  time: string;
  children: ReactNode;
}

export function Taskbar({ time, children }: Readonly<TaskbarProps>) {
  return (
    <footer className="from-taskbar-light to-taskbar flex h-7.5 bg-linear-to-b">
      <button
        type="button"
        className="button-reset from-start-light to-start flex items-center gap-1 rounded-r-xl bg-linear-to-b pr-5 pl-2 font-sans text-lg font-bold text-white italic text-shadow-2xs text-shadow-black"
      >
        <img src={windowsLogo} alt="" className="size-5" />
        <span>start</span>
      </button>
      <ul className="flex flex-1 gap-1 px-2 py-0.5">{children}</ul>
      <div className="flex items-center bg-white/15 px-3 text-white">{time}</div>
    </footer>
  );
}
