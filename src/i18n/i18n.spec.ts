import I18n from './i18n';

describe('I18n', () => {
  it('translate', async () => {
    I18n.setLocale('es');
    expect(I18n.__('Welcome')).toBe('Bienvenido');
  });

  it('translate falback en locale', async () => {
    I18n.setLocale('br');
    expect(I18n.__('Welcome')).toBe('Welcome');
  });

  it('translate in paralell global object fail', async () => {
    I18n.setLocale('es');
    const [es, en, es2] = await Promise.all([
      new Promise((resolve, reject) => {
        resolve(I18n.__('Welcome'));
      }),
      new Promise((resolve, reject) => {
        I18n.setLocale('en');
        resolve(I18n.__('Welcome'));
      }),
      new Promise((resolve, reject) => {
        resolve(I18n.__('Welcome'));
      }),
    ]);
    expect(es).toBe('Bienvenido');
    expect(es).toBe('Bienvenido');
    expect(es2).not.toBe('Bienvenido');
  });

  it('translate in paralell no use global traslate object', async () => {
    const [es, en, es2] = await Promise.all([
      new Promise((resolve, reject) => {
        resolve(I18n.t('Welcome', { locale: 'es' }));
      }),
      new Promise((resolve, reject) => {
        resolve(I18n.t('Welcome', { locale: 'en' }));
      }),
      new Promise((resolve, reject) => {
        resolve(I18n.t('Welcome', { locale: 'es' }));
      }),
    ]);
    expect(es).toBe('Bienvenido');
    expect(en).toBe('Welcome');
    expect(es2).toBe('Bienvenido');
  });
});
