import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Desktop } from './desktop';
import { useIconStore } from './store/icon-store';
import { useWindowStore } from './store/window-store';

describe('Desktop', () => {
  beforeEach(() => {
    useWindowStore.setState(useWindowStore.getInitialState(), true);
    useIconStore.setState(useIconStore.getInitialState(), true);
  });

  it('hands the keyboard to a window opened from the desktop', async () => {
    const user = userEvent.setup();
    render(<Desktop />);
    const icons = within(screen.getByRole('list', { name: 'Desktop' }));

    await user.tab();
    await user.keyboard('{ArrowDown}{Enter}{ArrowDown}');

    expect(screen.getByRole('dialog', { name: 'Resume' })).toHaveFocus();
    expect(icons.getByRole('button', { name: 'Resume', pressed: true })).toBeInTheDocument();
  });

  it.each(['Close', 'Minimize'])(
    'hands the keyboard back to the desktop on %s of the last window',
    async (button) => {
      const user = userEvent.setup();
      render(<Desktop />);
      const icons = within(screen.getByRole('list', { name: 'Desktop' }));

      await user.tab();
      await user.keyboard('{ArrowDown}{Enter}');
      await user.click(screen.getByRole('button', { name: button }));

      expect(icons.getByRole('button', { name: 'Resume' })).toHaveFocus();
    },
  );

  it('names the contact window after what is open in it, as xp does', async () => {
    const user = userEvent.setup();
    render(<Desktop />);
    const icons = within(screen.getByRole('list', { name: 'Desktop' }));

    await user.dblClick(icons.getByRole('button', { name: 'Contact' }));

    expect(screen.getByRole('dialog', { name: 'New Message' })).toBeInTheDocument();
  });

  it('leaves focus alone when the page loads', () => {
    render(<Desktop />);

    expect(document.body).toHaveFocus();
  });
});
