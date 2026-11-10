import { useShallow } from 'zustand/react/shallow';
import { useClock } from '../../hooks/use-clock';
import { TaskbarButton } from '../../organism/taskbar-button/taskbar-button';
import { Taskbar } from '../../organism/taskbar/taskbar';
import { PROGRAMS } from '../../programs/registry';
import { DesktopStartMenu } from './desktop-start-menu';
import { useActiveWindowId, useWindowActions, useWindowStore } from './store/window-store';

export function DesktopTaskbar() {
  // ids only so dragging or resizing a window does not re-render the taskbar
  const windowIds = useWindowStore(useShallow((s) => s.windows.map((w) => w.id)));
  const activeId = useActiveWindowId();
  const { focus, minimize } = useWindowActions();
  const time = useClock();

  return (
    <Taskbar startMenu={<DesktopStartMenu />} time={time}>
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
