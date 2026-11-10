import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { DesktopStartMenu } from './desktop-start-menu';
import { useWindowStore } from './store/window-store';

const openIds = () => useWindowStore.getState().windows.map((w) => w.id);

// jsdom hides a closed popover but can not open one, so its contents are queried as hidden
describe('DesktopStartMenu', () => {
  beforeEach(() => {
    useWindowStore.setState(useWindowStore.getInitialState(), true);
  });

  it('opens a pinned program', async () => {
    const user = userEvent.setup();
    render(<DesktopStartMenu />);

    await user.click(screen.getByRole('button', { name: /Contact/, hidden: true }));

    expect(openIds()).toEqual(['contact']);
  });

  it('opens the program behind a place', async () => {
    const user = userEvent.setup();
    render(<DesktopStartMenu />);

    await user.click(screen.getByRole('button', { name: 'My Resume', hidden: true }));

    expect(openIds()).toEqual(['resume']);
  });
});
