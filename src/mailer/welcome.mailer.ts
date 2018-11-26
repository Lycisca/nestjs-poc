import I18n from '../i18n/i18n';
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

export const welcomeEmailTemplate = async ({
  to,
  name,
}): Promise<{ html: string; text: string }> => {
  const email = new Email();
  return email.renderAll(path.join(__dirname, 'emails', 'welcome'), {
    to,
    name,
    t: {
      welcome: I18n.t('Welcome', { locale: 'es' }),
    },
  });
};
