import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FolderTile } from './folder-tile';

function renderTile() {
  const onOpen = vi.fn();
  render(<FolderTile name="Fusion" description="File Folder" onOpen={onOpen} />);
  return onOpen;
}

describe('FolderTile', () => {
  it('opens on double-click', async () => {
    const user = userEvent.setup();
    const onOpen = renderTile();

    await user.dblClick(screen.getByRole('button', { name: /Fusion/ }));

    expect(onOpen).toHaveBeenCalledOnce();
  });

  it('only selects on a single click', async () => {
    const user = userEvent.setup();
    const onOpen = renderTile();

    await user.click(screen.getByRole('button', { name: /Fusion/ }));

    expect(screen.getByRole('button', { name: /Fusion/ })).toHaveFocus();
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('opens with the enter key', async () => {
    const user = userEvent.setup();
    const onOpen = renderTile();

    await user.tab();
    await user.keyboard('{Enter}');

    expect(onOpen).toHaveBeenCalledOnce();
  });
});
