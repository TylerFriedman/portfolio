import type { ReactNode } from 'react';
import collapseIcon from '../../assets/icons/collapse.webp';

interface TaskPaneGroupProps {
  title: string;
  children: ReactNode;
}

// a native details element gives xp's collapsible groups keyboard and screen reader support for free
export function TaskPaneGroup({ title, children }: Readonly<TaskPaneGroupProps>) {
  return (
    <details open className="group overflow-hidden rounded-t-sm">
      <summary className="bg-task-pane-header text-task-pane-text hover:text-task-pane-hover flex h-6 cursor-pointer items-center pr-0.5 pl-3 font-bold [&::-webkit-details-marker]:hidden">
        <span className="flex-1">{title}</span>
        <img src={collapseIcon} alt="" className="size-4.75 rotate-180 group-open:rotate-0" />
      </summary>
      <div className="bg-task-pane-group flex flex-col gap-1.5 px-3 py-2">{children}</div>
    </details>
  );
}

interface TaskPaneLinkProps {
  title: string;
  icon: string;
  href: string;
}

export function TaskPaneLink({ title, icon, href }: Readonly<TaskPaneLinkProps>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-task-pane-text hover:text-task-pane-hover flex items-center gap-1.5 hover:underline"
    >
      <img src={icon} alt="" className="size-4 shrink-0" />
      <span>{title}</span>
    </a>
  );
}

interface TaskPaneDetailsProps {
  name: string;
  details: readonly string[];
}

export function TaskPaneDetails({ name, details }: Readonly<TaskPaneDetailsProps>) {
  return (
    <div>
      <p className="font-bold">{name}</p>
      {details.map((detail) => (
        <p key={detail}>{detail}</p>
      ))}
    </div>
  );
}
