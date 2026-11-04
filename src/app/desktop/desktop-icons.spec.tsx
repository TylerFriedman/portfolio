import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DesktopIcons } from './desktop-icons';
import { useIconStore } from './store/icon-store';
import { useWindowStore } from './store/window-store';

const openIds = () => useWindowStore.getState().windows.map((w) => w.id);

// jsdom has no layout, so the desktop is given a 600x390 size
function renderIcons() {
  render(<DesktopIcons />);
  const desktop = screen.getByRole('list');
  vi.spyOn(desktop, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 600,
    height: 390,
  } as DOMRect);
  return desktop;
}

describe('DesktopIcons', () => {
  beforeEach(() => {
    useWindowStore.setState(useWindowStore.getInitialState(), true);
    useIconStore.setState(useIconStore.getInitialState(), true);
  });

  it('drags an icon to a new spot on the grid', () => {
    renderIcons();
    const about = screen.getByRole('button', { name: 'About Me' });

    fireEvent.pointerDown(about, { button: 0, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(about, { clientX: 20 + 92 * 2, clientY: 20 + 84 * 5 });
    fireEvent.pointerUp(about, { clientX: 20 + 92 * 2, clientY: 20 + 84 * 5 });

    expect(useIconStore.getState().cells.about).toEqual({ col: 2, row: 5 });
  });

  it('narrows a selection down to the icon that is clicked', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(screen.getByRole('button', { name: 'About Me' }));
    await user.keyboard('{Control>}a{/Control}');
    await user.click(screen.getByRole('button', { name: 'Resume' }));
    await user.keyboard('{Enter}');

    expect(openIds()).toEqual(['resume']);
  });

  it('selects every icon the drag rectangle touches', async () => {
    const user = userEvent.setup();
    const desktop = renderIcons();

    fireEvent.pointerDown(desktop, { button: 0, clientX: 200, clientY: 10 });
    fireEvent.pointerMove(desktop, { clientX: 50, clientY: 150 });
    fireEvent.pointerUp(desktop);
    await user.tab();
    await user.keyboard('{Enter}');

    expect(openIds()).toEqual(['about', 'resume']);
  });

  it('keeps the drag rectangle inside the desktop so it never covers the taskbar', () => {
    const desktop = renderIcons();

    fireEvent.pointerDown(desktop, { button: 0, clientX: 400, clientY: 300 });
    fireEvent.pointerMove(desktop, { clientX: 250, clientY: 450 });

    expect(screen.getByTestId('marquee')).toHaveStyle({ top: '300px', height: '90px' });
  });

  it('adds to the selection with ctrl+click', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(screen.getByRole('button', { name: 'About Me' }));
    await user.keyboard('{Control>}');
    await user.click(screen.getByRole('button', { name: 'Contact' }));
    await user.keyboard('{/Control}{Enter}');

    expect(openIds()).toEqual(['about', 'contact']);
  });

  it('selects every icon with ctrl+a', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(screen.getByRole('button', { name: 'About Me' }));
    await user.keyboard('{Control>}a{/Control}{Enter}');

    expect(openIds()).toEqual(['about', 'resume', 'projects', 'contact']);
  });

  it('opens only the icon that is double-clicked', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.dblClick(screen.getByRole('button', { name: 'Projects' }));

    expect(openIds()).toEqual(['projects']);
  });
});
