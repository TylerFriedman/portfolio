import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DesktopIcon } from './desktop-icon';

function renderIcon() {
  const handlers = { onSelect: vi.fn(), onToggle: vi.fn(), onSelectAll: vi.fn(), onOpen: vi.fn() };
  render(<DesktopIcon label="Projects" icon="/folder.png" isSelected={false} {...handlers} />);
  return handlers;
}

describe('DesktopIcon', () => {
  it('opens its program on double-click', async () => {
    const user = userEvent.setup();
    const { onOpen } = renderIcon();

    await user.dblClick(screen.getByRole('button', { name: 'Projects' }));

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('only selects on a single click', async () => {
    const user = userEvent.setup();
    const { onSelect, onOpen } = renderIcon();

    await user.click(screen.getByRole('button', { name: 'Projects' }));

    expect(onSelect).toHaveBeenCalledOnce();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('toggles instead of selecting when ctrl is held', async () => {
    const user = userEvent.setup();
    const { onSelect, onToggle } = renderIcon();

    await user.keyboard('{Control>}');
    await user.click(screen.getByRole('button', { name: 'Projects' }));

    expect(onToggle).toHaveBeenCalledOnce();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('opens with the enter key for keyboard users', async () => {
    const user = userEvent.setup();
    const { onOpen } = renderIcon();

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('selects every icon with ctrl+a', async () => {
    const user = userEvent.setup();
    const { onSelectAll } = renderIcon();

    await user.tab();
    await user.keyboard('{Control>}a{/Control}');

    expect(onSelectAll).toHaveBeenCalledOnce();
  });
});
