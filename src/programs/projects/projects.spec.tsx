import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Projects } from './projects';

describe('Projects', () => {
  it('opens a project in the same window and goes back to the folder', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.dblClick(screen.getByRole('button', { name: /Payment Portal/ }));

    expect(screen.getByText('My Projects\\Payment Portal')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What I Built' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(screen.getByRole('button', { name: /Payment Portal/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  });

  it('goes up to the folder from a project', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.dblClick(screen.getByRole('button', { name: /ClockIT/ }));
    await user.click(screen.getByRole('button', { name: 'Up' }));

    expect(screen.getByRole('button', { name: /ClockIT/ })).toBeInTheDocument();
  });
});
