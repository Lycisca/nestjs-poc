import { testTrasporter } from './application.mailer';
import { welcomeEmail } from './welcome.email';

testTrasporter(transporter => {
  welcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
});
