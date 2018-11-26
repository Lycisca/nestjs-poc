const i18n = require('i18n');

i18n.configure({
  locales: ['en', 'es'],
  directory: __dirname + '/locales',
});

// Use in background jobs or async functions
i18n.t = (phrase: string, { locale = 'en' }: any) =>
  i18n.__({ phrase, locale });

export default i18n;
