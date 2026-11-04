import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DesktopIcon } from './desktop-icon';

function renderIcon({ isSelected = false, isFocused = false } = {}) {
  const handlers = { onPointerDown: vi.fn(), onKeyDown: vi.fn(), onOpen: vi.fn() };
  render(
    <DesktopIcon
      label="Projects"
      icon="/folder.png"
      isSelected={isSelected}
      isFocused={isFocused}
      {...handlers}
    />,
  );
  return handlers;
}

describe('DesktopIcon', () => {
  it('opens its program on double-click', async () => {
    const user = userEvent.setup();
    const { onOpen } = renderIcon();

    await user.dblClick(screen.getByRole('button', { name: 'Projects' }));

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('does not open on a single click', async () => {
    const user = userEvent.setup();
    const { onPointerDown, onOpen } = renderIcon();

    await user.click(screen.getByRole('button', { name: 'Projects' }));

    expect(onPointerDown).toHaveBeenCalledOnce();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('tells assistive tech whether it is selected', () => {
    renderIcon({ isSelected: true });

    expect(screen.getByRole('button', { name: 'Projects', pressed: true })).toBeInTheDocument();
  });

  it('is a tab stop only while it holds focus', () => {
    renderIcon({ isFocused: true });

    expect(screen.getByRole('button', { name: 'Projects' })).toHaveAttribute('tabindex', '0');
  });
});
