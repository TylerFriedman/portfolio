import type { ReactNode } from 'react';

interface TaskbarProps {
  startMenu: ReactNode;
  time: string;
  children: ReactNode;
}

export function Taskbar({ startMenu, time, children }: Readonly<TaskbarProps>) {
  return (
    <footer className="bg-taskbar flex h-7.5">
      {startMenu}
      <ul className="flex flex-1 gap-1 px-2.5 py-1">{children}</ul>
      <div className="bg-taskbar-tray border-tray-border shadow-tray flex items-center border-l px-2.5 text-white">
        {time}
      </div>
    </footer>
  );
}
