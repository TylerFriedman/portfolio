import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TaskbarButton } from './taskbar-button';

function renderButton(isActive: boolean) {
  const handlers = { onActivate: vi.fn(), onMinimize: vi.fn() };
  render(<TaskbarButton title="Resume" icon="/book.webp" isActive={isActive} {...handlers} />);
  return handlers;
}

describe('TaskbarButton', () => {
  it('brings a background window to the front when clicked', async () => {
    const user = userEvent.setup();
    const { onActivate, onMinimize } = renderButton(false);

    await user.click(screen.getByRole('button', { name: 'Resume' }));

    expect(onActivate).toHaveBeenCalledOnce();
    expect(onMinimize).not.toHaveBeenCalled();
  });

  it('minimizes the active window when its button is clicked again', async () => {
    const user = userEvent.setup();
    const { onActivate, onMinimize } = renderButton(true);

    await user.click(screen.getByRole('button', { name: 'Resume' }));

    expect(onMinimize).toHaveBeenCalledOnce();
    expect(onActivate).not.toHaveBeenCalled();
  });
});
