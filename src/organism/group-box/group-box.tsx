import type { ReactNode } from 'react';

interface GroupBoxProps {
  title: string;
  icon: string;
  children: ReactNode;
}

// an xp group box with its icon on the left, as on the hardware and advanced tabs of system properties
export function GroupBox({ title, icon, children }: Readonly<GroupBoxProps>) {
  return (
    <fieldset>
      <legend>{title}</legend>
      <div className="flex items-start gap-3">
        <img src={icon} alt="" className="size-8 shrink-0" />
        <div className="min-w-0 space-y-1">{children}</div>
      </div>
    </fieldset>
  );
}
