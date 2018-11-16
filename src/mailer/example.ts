import { createTransporter, mockTransporter } from './application.mailer';
import { welcomeEmail } from './welcome.email';

createTransporter().then(transporter => {
  welcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
});

// mockTransporter().then(transporter => {
//   welcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
// });
