import type { ComponentProps, ReactNode, SubmitEventHandler } from 'react';
import attachIcon from '../../assets/icons/attach.webp';
import checkIcon from '../../assets/icons/check.webp';
import copyIcon from '../../assets/icons/copy.webp';
import cutIcon from '../../assets/icons/cut.webp';
import pasteIcon from '../../assets/icons/paste.webp';
import priorityIcon from '../../assets/icons/priority.webp';
import sendIcon from '../../assets/icons/send.webp';
import signIcon from '../../assets/icons/sign.webp';
import spellingIcon from '../../assets/icons/spelling.webp';
import undoIcon from '../../assets/icons/undo.webp';
import { MenuBar } from '../menu-bar/menu-bar';
import { ToolbarButton, ToolbarSeparator } from '../toolbar/toolbar';

type OutlookButtonProps = Omit<ComponentProps<typeof ToolbarButton>, 'labelPosition' | 'iconSize'>;

// every outlook express tool has its label under the icon
function OutlookButton(props: Readonly<OutlookButtonProps>) {
  return <ToolbarButton {...props} labelPosition="below" iconSize="medium" />;
}

interface HeaderFieldProps extends ComponentProps<'input'> {
  label: string;
  icon?: string;
}

export function HeaderField({ label, icon, ...input }: Readonly<HeaderFieldProps>) {
  return (
    <label className="flex items-center gap-1">
      <span className="flex w-15 shrink-0 items-center gap-1">
        {icon && <img src={icon} alt="" className="size-4" />}
        {label}
      </span>
      <input type="text" {...input} className="min-w-0 flex-1" />
    </label>
  );
}

export function MessageBody(props: Readonly<ComponentProps<'textarea'>>) {
  return <textarea {...props} className="min-h-0 flex-1 resize-none p-1" />;
}

interface OutlookExpressProps {
  status: string;
  isSending: boolean;
  headers: ReactNode;
  children: ReactNode;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}

// an xp new message window where only send works so that the other tools are there for the look
export function OutlookExpress({
  status,
  isSending,
  headers,
  children,
  onSubmit,
}: Readonly<OutlookExpressProps>) {
  return (
    <form className="bg-explorer font-xp text-xp flex min-h-0 flex-1 flex-col" onSubmit={onSubmit}>
      <MenuBar menus={['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Message', 'Help']} />
      <div className="flex h-12 shrink-0 items-center overflow-hidden border-b border-black/10 px-0.75 py-0.5">
        <OutlookButton icon={sendIcon} label="Send" type="submit" isDisabled={isSending} />
        <ToolbarSeparator />
        <div inert className="flex h-full items-center">
          <OutlookButton icon={cutIcon} label="Cut" isDisabled />
          <OutlookButton icon={copyIcon} label="Copy" isDisabled />
          <OutlookButton icon={pasteIcon} label="Paste" isDisabled />
          <OutlookButton icon={undoIcon} label="Undo" />
          <ToolbarSeparator />
          <OutlookButton icon={checkIcon} label="Check" />
          <OutlookButton icon={spellingIcon} label="Spelling" isDisabled />
          <ToolbarSeparator />
          <OutlookButton icon={attachIcon} label="Attach" />
          <OutlookButton icon={priorityIcon} label="Priority" hasMenu />
          <ToolbarSeparator />
          <OutlookButton icon={signIcon} label="Sign" />
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1 border-t border-white/70 px-1.5 py-1">
        {headers}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <div className="status-bar">
        <output className="status-bar-field min-h-5 min-w-0 truncate">{status}</output>
      </div>
    </form>
  );
}
