import { useId, type KeyboardEvent, type ReactNode } from 'react';

interface PropertySheetProps<Tab extends string> {
  tabs: Tab[];
  selectedTab: Tab;
  onSelectTab: (tab: Tab) => void;
  buttons: ReactNode;
  children: ReactNode;
}

export function PropertySheet<Tab extends string>({
  tabs,
  selectedTab,
  onSelectTab,
  buttons,
  children,
}: Readonly<PropertySheetProps<Tab>>) {
  const id = useId();
  const tabId = (tab: Tab) => `${id}-${tab}`;

  function handleKeyDown(event: KeyboardEvent<HTMLMenuElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(tabs.indexOf(selectedTab) + step + tabs.length) % tabs.length];
    onSelectTab(next);
    document.getElementById(tabId(next))?.focus();
  }

  return (
    <div className="bg-explorer font-xp text-xp flex min-h-0 flex-1 flex-col p-2">
      <menu role="tablist" className="flex-wrap" onKeyDown={handleKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab}
            id={tabId(tab)}
            type="button"
            role="tab"
            aria-selected={tab === selectedTab}
            aria-controls={tab === selectedTab ? `${id}-panel` : undefined}
            // only the open tab is a tab stop the arrow keys reach the rest
            tabIndex={tab === selectedTab ? 0 : -1}
            onClick={() => onSelectTab(tab)}
          >
            {tab}
          </button>
        ))}
      </menu>
      <article
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={tabId(selectedTab)}
        className="min-h-0 flex-1 overflow-y-auto"
      >
        {children}
      </article>
      <div className="flex justify-end gap-1.5">{buttons}</div>
    </div>
  );
}
