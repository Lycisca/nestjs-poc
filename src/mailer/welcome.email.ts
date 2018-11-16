import { sendEmail } from './application.mailer';

export const welcomeEmail = transporter => ({ to, name }) => {
  sendEmail(transporter)({
    to,
    text: `Welcome ${name}`,
    subject: 'Hello ✔',
    html: `<b>Welcome ${name}</b>`,
  });
};
