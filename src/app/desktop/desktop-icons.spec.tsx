import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DesktopIcons } from './desktop-icons';
import { useIconStore } from './store/icon-store';
import { useWindowStore } from './store/window-store';

const openIds = () => useWindowStore.getState().windows.map((w) => w.id);
const icon = (name: string) => screen.getByRole('button', { name });
const selectedNames = () =>
  screen.queryAllByRole('button', { pressed: true }).map((button) => button.textContent);

// jsdom has no layout, so the desktop is given a 600x390 size
function renderIcons() {
  render(<DesktopIcons />);
  const desktop = screen.getByRole('list', { name: 'Desktop' });
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

    fireEvent.pointerDown(icon('About Me'), { button: 0, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(icon('About Me'), { clientX: 20 + 92 * 2, clientY: 20 + 84 * 5 });
    fireEvent.pointerUp(icon('About Me'), { clientX: 20 + 92 * 2, clientY: 20 + 84 * 5 });

    expect(useIconStore.getState().cells.about).toEqual({ col: 2, row: 5 });
  });

  it('narrows a selection down to the icon that is clicked', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(icon('About Me'));
    await user.keyboard('{Control>}a{/Control}');
    await user.click(icon('Resume'));
    await user.keyboard('{Enter}');

    expect(openIds()).toEqual(['resume']);
  });

  it('opens what a drag rectangle selects with enter', async () => {
    const user = userEvent.setup();
    const desktop = renderIcons();

    await user.pointer([
      { keys: '[MouseLeft>]', target: desktop, coords: { clientX: 200, clientY: 10 } },
      { target: desktop, coords: { clientX: 50, clientY: 150 } },
      { keys: '[/MouseLeft]', target: desktop },
    ]);
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

    await user.click(icon('About Me'));
    await user.keyboard('{Control>}');
    await user.click(icon('Contact'));
    await user.keyboard('{/Control}{Enter}');

    expect(openIds()).toEqual(['about', 'contact']);
  });

  it('selects every icon with ctrl+a', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(icon('About Me'));
    await user.keyboard('{Control>}a{/Control}{Enter}');

    expect(openIds()).toEqual(['about', 'resume', 'projects', 'contact']);
  });

  it('opens only the icon that is double-clicked', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.dblClick(icon('Projects'));

    expect(openIds()).toEqual(['projects']);
  });

  it('is a single tab stop', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.tab();
    expect(icon('About Me')).toHaveFocus();

    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it('moves the selection and focus with the arrow keys', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.tab();
    await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');

    expect(selectedNames()).toEqual(['Resume']);
    expect(icon('Resume')).toHaveFocus();
  });

  it('stays put when there is no icon in the arrow direction', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(icon('About Me'));
    await user.keyboard('{ArrowUp}{ArrowLeft}');

    expect(selectedNames()).toEqual(['About Me']);
    expect(icon('About Me')).toHaveFocus();
  });

  it('picks icons one by one with ctrl+arrow and space', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(icon('About Me'));
    await user.keyboard('{Control>}{ArrowDown}{ArrowDown}[Space]{/Control}');

    expect(selectedNames()).toEqual(['About Me', 'Projects']);
    expect(icon('Projects')).toHaveFocus();
  });

  it('extends the selection with shift+arrow', async () => {
    const user = userEvent.setup();
    renderIcons();

    await user.click(icon('About Me'));
    await user.keyboard('{Shift>}{ArrowDown}{ArrowDown}{/Shift}');

    expect(selectedNames()).toEqual(['About Me', 'Resume', 'Projects']);
  });
});
