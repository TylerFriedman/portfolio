export async function sendMessage(message: FormData) {
  message.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: message,
  });
  if (!response.ok) throw new Error(`message not sent: ${response.status}`);
}
