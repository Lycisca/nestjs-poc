const path = require('path');
const Email = require('email-templates');

export const WelcomeEmail = transporter => ({ to, name }) => {
  welcomeEmailTemplate({ to, name }).then(({ html, text }) => {
    transporter.sendMail({
      from: 'defaultFrom@example.com',
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
