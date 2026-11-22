import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Contact } from './contact';

async function writeMessage(user: UserEvent, email = 'jane@example.com') {
  await user.type(screen.getByLabelText('From:'), email);
  await user.type(screen.getByLabelText('Subject:'), 'Hello');
  await user.type(screen.getByRole('textbox', { name: 'Message' }), 'Nice portfolio');
  await user.click(screen.getByRole('button', { name: 'Send' }));
}

describe('Contact', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('sends the message with the access key and clears the form', async () => {
    vi.stubEnv('VITE_WEB3FORMS_KEY', 'test-key');
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}'));
    const user = userEvent.setup();
    render(<Contact />);

    await writeMessage(user);

    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe('https://api.web3forms.com/submit');
    expect(Object.fromEntries(init?.body as FormData)).toEqual({
      access_key: 'test-key',
      email: 'jane@example.com',
      subject: 'Hello',
      message: 'Nice portfolio',
    });
    expect(await screen.findByRole('status')).toHaveTextContent('Your message has been sent.');
    expect(screen.getByLabelText('From:')).toHaveValue('');
  });

  it('keeps what was typed when the message could not be sent', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response('{}', { status: 500 }));
    const user = userEvent.setup();
    render(<Contact />);

    await writeMessage(user);

    expect(await screen.findByRole('status')).toHaveTextContent('could not be sent');
    expect(screen.getByLabelText('From:')).toHaveValue('jane@example.com');
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('Nice portfolio');
  });

  it('does not send without a valid email to reply to', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const user = userEvent.setup();
    render(<Contact />);

    await writeMessage(user, 'not-an-email');

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('can not be sent twice while a message is on its way', async () => {
    vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    render(<Contact />);

    await writeMessage(user);

    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Sending message...');
  });
});
