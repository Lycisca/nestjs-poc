import { sendEmail } from './application.mailer';
import { createTransporter } from './application.mailer';
const path = require('path');
const Email = require('email-templates');

export const WelcomeEmail = transporter => ({ to, name }) => {
  welcomeEmailTemplate({ to, name }).then(({ html, text }) => {
    sendEmail(transporter)({
      to,
      subject: 'Hello ✔',
      text,
      html,
    });
  });
};

const welcomeEmailTemplate = async ({ to, name }) => {
  const email = new Email();
  return email.renderAll(path.join(__dirname, 'emails', 'welcome'), {
    to,
    name,
  });
};
