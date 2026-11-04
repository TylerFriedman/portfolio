import { useShallow } from 'zustand/react/shallow';
import { useClock } from '../../hooks/use-clock';
import { StartMenu } from '../../organism/start-menu/start-menu';
import { TaskbarButton } from '../../organism/taskbar-button/taskbar-button';
import { Taskbar } from '../../organism/taskbar/taskbar';
import { PROGRAM_IDS, PROGRAMS } from '../../programs/registry';
import { useActiveWindowId, useWindowActions, useWindowStore } from './store/window-store';

export function DesktopTaskbar() {
  // ids only so dragging or resizing a window does not re-render the taskbar
  const windowIds = useWindowStore(useShallow((s) => s.windows.map((w) => w.id)));
  const activeId = useActiveWindowId();
  const { open, focus, minimize } = useWindowActions();
  const time = useClock();

  const startMenuItems = PROGRAM_IDS.map((id) => ({ ...PROGRAMS[id], onOpen: () => open(id) }));

  return (
    <Taskbar startMenu={<StartMenu userName="Tyler Friedman" items={startMenuItems} />} time={time}>
      {windowIds.map((id) => (
        <li key={id}>
          <TaskbarButton
            title={PROGRAMS[id].title}
            icon={PROGRAMS[id].icon}
            isActive={id === activeId}
            onActivate={() => focus(id)}
            onMinimize={() => minimize(id)}
          />
        </li>
      ))}
    </Taskbar>
  );
}
