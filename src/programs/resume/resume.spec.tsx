import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LINKS } from '../../content/profile';
import { Resume } from './resume';

describe('Resume', () => {
  it('links to github and linkedin in a new tab', () => {
    render(<Resume />);

    for (const { title, href } of LINKS) {
      const link = screen.getByRole('link', { name: title });
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveAttribute('target', '_blank');
    }
  });

  it('lists the most recent job first', async () => {
    const user = userEvent.setup();
    render(<Resume />);

    await user.click(screen.getByRole('tab', { name: 'Experience' }));
    const [latestJob] = screen.getAllByRole('group');

    expect(latestJob).toHaveAccessibleName('Software Developer');
    expect(latestJob).toHaveTextContent('Sunstone Logistic Systems · Jan 2026 - Present');
  });

  it('points only the open tab at the panel it shows', () => {
    render(<Resume />);

    expect(screen.getByRole('tab', { name: 'General' })).toHaveAttribute(
      'aria-controls',
      screen.getByRole('tabpanel').id,
    );
    expect(screen.getByRole('tab', { name: 'Skills' })).not.toHaveAttribute('aria-controls');
  });

  it('moves between tabs with the arrow keys, wrapping at the ends', async () => {
    const user = userEvent.setup();
    render(<Resume />);

    await user.click(screen.getByRole('tab', { name: 'General' }));
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Experience', selected: true })).toHaveFocus();

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Leadership', selected: true })).toHaveFocus();
  });

  it('never shows a phone number or email address on any tab', async () => {
    const user = userEvent.setup();
    render(<Resume />);

    for (const tab of screen.getAllByRole('tab')) {
      await user.click(tab);
      expect(screen.getByRole('tabpanel')).not.toHaveTextContent(/@|\d{3}\s?\d{3}\s?\d{4}/);
    }
  });
});
