import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { StartMenu } from './start-menu';

describe('StartMenu', () => {
  it('opens the program that is clicked', async () => {
    const user = userEvent.setup();
    const onOpenResume = vi.fn();
    const onOpenContact = vi.fn();
    render(
      <StartMenu
        userName="Tyler"
        items={[
          { title: 'Resume', icon: '/book.webp', onOpen: onOpenResume },
          { title: 'Contact', icon: '/mail.webp', onOpen: onOpenContact },
        ]}
      />,
    );

    // jsdom hides a closed popover but cannot open one
    await user.click(screen.getByRole('button', { name: 'Resume', hidden: true }));

    expect(onOpenResume).toHaveBeenCalledOnce();
    expect(onOpenContact).not.toHaveBeenCalled();
  });
});
