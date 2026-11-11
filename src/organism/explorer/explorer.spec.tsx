import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Explorer } from './explorer';

function renderExplorer(handlers: { onBack?: () => void; onUp?: () => void } = {}) {
  render(
    <Explorer address="My Projects" addressIcon="/folder.webp" taskPane={null} {...handlers}>
      <p>Contents</p>
    </Explorer>,
  );
}

describe('Explorer', () => {
  it('greys out back and up while there is nowhere to go', () => {
    renderExplorer();

    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Up' })).toBeDisabled();
  });

  it('runs the matching handler for back and up', async () => {
    const user = userEvent.setup();
    const handlers = { onBack: vi.fn(), onUp: vi.fn() };
    renderExplorer(handlers);

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(handlers.onBack).toHaveBeenCalledOnce();

    await user.click(screen.getByRole('button', { name: 'Up' }));
    expect(handlers.onUp).toHaveBeenCalledOnce();
  });
});
