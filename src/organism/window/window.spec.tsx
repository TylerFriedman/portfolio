import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Window, type WindowProps } from './window';

function renderWindow(props: Partial<WindowProps> = {}) {
  const handlers = {
    onFocus: vi.fn(),
    onMinimize: vi.fn(),
    onToggleMaximize: vi.fn(),
    onClose: vi.fn(),
    onMove: vi.fn(),
    onResize: vi.fn(),
  };
  render(
    <Window
      title="About Me"
      x={100}
      y={50}
      width={400}
      height={300}
      zIndex={1}
      isMinimized={false}
      isMaximized={false}
      {...handlers}
      {...props}
    >
      <p>Hello</p>
    </Window>,
  );
  return handlers;
}

function drag(element: Element, dx: number, dy: number) {
  fireEvent.pointerDown(element, { clientX: 10, clientY: 10 });
  fireEvent.pointerMove(element, { clientX: 10 + dx, clientY: 10 + dy });
  fireEvent.pointerUp(element);
}

describe('Window', () => {
  it('moves by the distance its title bar is dragged', () => {
    const { onMove } = renderWindow();

    drag(screen.getByText('About Me'), 30, 40);

    expect(onMove).toHaveBeenCalledWith(130, 90);
  });

  it('stops following the pointer once it is released', () => {
    const { onMove } = renderWindow();
    const title = screen.getByText('About Me');

    drag(title, 30, 40);
    fireEvent.pointerMove(title, { clientX: 500, clientY: 500 });

    expect(onMove).toHaveBeenCalledOnce();
  });

  it('does not start a drag from a title bar button', () => {
    const { onMove } = renderWindow();

    drag(screen.getByRole('button', { name: 'Close' }), 30, 40);

    expect(onMove).not.toHaveBeenCalled();
  });

  it('resizes by the distance its corner is dragged', () => {
    const { onResize } = renderWindow();

    drag(screen.getByTestId('resize-handle'), 20, 10);

    expect(onResize).toHaveBeenCalledWith(420, 310);
  });

  it('can not be moved or resized while maximized', () => {
    const { onMove } = renderWindow({ isMaximized: true });

    drag(screen.getByText('About Me'), 30, 40);

    expect(onMove).not.toHaveBeenCalled();
    expect(screen.queryByTestId('resize-handle')).not.toBeInTheDocument();
  });

  it('runs the matching action for each title bar button', async () => {
    const user = userEvent.setup();
    const { onMinimize, onToggleMaximize, onClose } = renderWindow();

    await user.click(screen.getByRole('button', { name: 'Minimize' }));
    expect(onMinimize).toHaveBeenCalledOnce();
    expect(onClose).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Maximize' }));
    expect(onToggleMaximize).toHaveBeenCalledOnce();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('offers restore instead of maximize when maximized', () => {
    renderWindow({ isMaximized: true });

    expect(screen.getByRole('button', { name: 'Restore' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Maximize' })).not.toBeInTheDocument();
  });

  it('toggles maximize when the title bar is double-clicked', async () => {
    const user = userEvent.setup();
    const { onToggleMaximize } = renderWindow();

    await user.dblClick(screen.getByText('About Me'));

    expect(onToggleMaximize).toHaveBeenCalledOnce();
  });

  it('hides its content without removing it while minimized', () => {
    renderWindow({ isMinimized: true });

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hello')).not.toBeVisible();
  });

  it('comes to the front when clicked anywhere inside', () => {
    const { onFocus } = renderWindow();

    fireEvent.pointerDown(screen.getByText('Hello'));

    expect(onFocus).toHaveBeenCalledOnce();
  });
});
