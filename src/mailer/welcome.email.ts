import { sendEmail } from './application.mailer';
import { createTransporter } from './application.mailer';
const path = require('path');
const Email = require('email-templates');

export const WelcomeEmail = transporter => ({ to, name }) => {
  welcomeEmailTemplate({ to, name }).then(html => {
    sendEmail(transporter)({
      to,
      subject: 'Hello ✔',
      text: '',
      html,
    });
  });
};

const welcomeEmailTemplate = async ({ to, name }) => {
  const email = new Email();
  return email.render(path.join(__dirname, 'emails', 'welcome', 'html'), {
    to,
    name,
  });
};
