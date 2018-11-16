import { createTransporter, mockTransporter } from './application.mailer';
import { WelcomeEmail } from './welcome.email';

createTransporter().then(transporter => {
  WelcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
});

// mockTransporter().then(transporter => {
//   welcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
// });
