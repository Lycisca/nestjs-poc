import { sendEmail } from './application.mailer';

const welcomeEmail = ({ to, name }) => {
  sendEmail({
    to,
    text: `Welcome ${name}`,
    subject: 'Hello ✔',
    html: `<b>Welcome ${name}</b>`,
  });
};

// welcomeEmail({
//   to: 'user@example.com',
//   name: 'Miguel',
// });
