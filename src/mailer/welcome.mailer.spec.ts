import { welcomeEmailTemplate } from './welcome.mailer';
import { mockTransporter } from './mailer.provider';
describe('Mailer welcome', () => {
  it('welcomeEmailTemplate', async () => {
    const { html, text } = await welcomeEmailTemplate({
      to: 'user@example.com',
      name: 'Example',
    });
    expect(typeof html).toBe('string');
    expect(typeof text).toBe('string');
    expect(html).toBe('<b>Bienvenido Example</b>');
    expect(text).toBe('Bienvenido Example');
  });
});
