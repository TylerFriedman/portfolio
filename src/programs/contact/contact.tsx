import { useState, useTransition, type SubmitEvent } from 'react';
import { sendMessage } from '../../api/send-message';
import mailtoIcon from '../../assets/icons/mailto.webp';
import { PROFILE } from '../../content/profile';
import {
  HeaderField,
  MessageBody,
  OutlookExpress,
} from '../../organism/outlook-express/outlook-express';

export function Contact() {
  const [isSending, startSending] = useTransition();
  const [status, setStatus] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    startSending(async () => {
      try {
        await sendMessage(new FormData(form));
        form.reset();
        setStatus('Your message has been sent.');
      } catch {
        // the message stays in the form so nothing typed is lost
        setStatus('Your message could not be sent, please message me on LinkedIn.');
      }
    });
  }

  return (
    <OutlookExpress
      status={isSending ? 'Sending message...' : status}
      isSending={isSending}
      headers={
        <>
          <HeaderField label="To:" icon={mailtoIcon} readOnly value={PROFILE.name} />
          <HeaderField label="From:" name="email" type="email" required />
          <HeaderField label="Subject:" name="subject" required />
        </>
      }
      onSubmit={handleSubmit}
    >
      <MessageBody name="message" aria-label="Message" required />
      <input type="checkbox" name="botcheck" hidden />
    </OutlookExpress>
  );
}
