import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PROJECTS } from '../../content/projects';
import { Projects } from './projects';

describe('Projects', () => {
  it('opens a project in the same window and goes back to the folder', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.dblClick(screen.getByRole('button', { name: /Alleysway/ }));

    expect(screen.getByText('My Projects\\Alleysway')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'What Was Built' })).toBeInTheDocument();
    expect(screen.getByText(PROJECTS[0].overview[0])).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(screen.getByRole('button', { name: /Alleysway/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeDisabled();
  });

  it('links the open project’s repos', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    expect(screen.queryByRole('link', { name: 'API on GitHub' })).not.toBeInTheDocument();

    await user.dblClick(screen.getByRole('button', { name: /Fusion/ }));

    expect(screen.getByRole('link', { name: 'API on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/TylerFriedman/Fusion_API',
    );
  });

  it('goes up to the folder from a project', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.dblClick(screen.getByRole('button', { name: /ClockIT/ }));
    await user.click(screen.getByRole('button', { name: 'Up' }));

    expect(screen.getByRole('button', { name: /ClockIT/ })).toBeInTheDocument();
  });
});
