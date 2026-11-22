import { MenuBar } from '../../organism/menu-bar/menu-bar';

export function Notepad() {
  return (
    <div className="bg-explorer font-xp text-xp flex min-h-0 flex-1 flex-col">
      <MenuBar menus={['File', 'Edit', 'Format', 'View', 'Help']} />
      <textarea
        aria-label="Text"
        spellCheck={false}
        className="border-field-border font-notepad text-notepad min-h-0 flex-1 resize-none overflow-scroll border p-0.5 whitespace-pre"
      />
    </div>
  );
}
