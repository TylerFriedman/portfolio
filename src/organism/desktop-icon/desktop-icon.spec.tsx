import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DesktopIcon } from './desktop-icon';

function renderIcon() {
  const handlers = { onSelect: vi.fn(), onOpen: vi.fn() };
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

  it('opens with the enter key for keyboard users', async () => {
    const user = userEvent.setup();
    const { onOpen } = renderIcon();

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onOpen).toHaveBeenCalledOnce();
  });
});
