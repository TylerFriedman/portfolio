import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StartMenu } from './start-menu';

function renderStartMenu() {
  const handlers = { onOpenAbout: vi.fn(), onOpenProjects: vi.fn() };
  render(
    <StartMenu
      userName="Tyler"
      userPicture="/tyler.webp"
      programs={[
        {
          title: 'About Me',
          description: 'Who I am',
          icon: '/notepad.webp',
          onOpen: handlers.onOpenAbout,
        },
      ]}
      places={[{ title: 'My Projects', icon: '/folder.webp', onOpen: handlers.onOpenProjects }]}
      links={[{ title: 'GitHub', icon: '/github.svg', href: 'https://github.com/TylerFriedman' }]}
    />,
  );
  return handlers;
}

// jsdom hides a closed popover but can not open one, so its contents are queried as hidden
describe('StartMenu', () => {
  it('opens a pinned program from the left column', async () => {
    const user = userEvent.setup();
    const { onOpenAbout, onOpenProjects } = renderStartMenu();

    await user.click(screen.getByRole('button', { name: /About Me/, hidden: true }));

    expect(onOpenAbout).toHaveBeenCalledOnce();
    expect(onOpenProjects).not.toHaveBeenCalled();
  });

  it('opens a place from the right column', async () => {
    const user = userEvent.setup();
    const { onOpenProjects } = renderStartMenu();

    await user.click(screen.getByRole('button', { name: 'My Projects', hidden: true }));

    expect(onOpenProjects).toHaveBeenCalledOnce();
  });

  it('opens links in a new tab without handing over the page', () => {
    renderStartMenu();

    const link = screen.getByRole('link', { name: 'GitHub', hidden: true });
    expect(link).toHaveAttribute('href', 'https://github.com/TylerFriedman');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
