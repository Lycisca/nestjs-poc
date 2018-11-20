import { createTransporter, mockTransporter } from './mailer.provider';
import { WelcomeEmail } from './welcome.mailer';

createTransporter().then(transporter => {
  WelcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
});

// mockTransporter().then(transporter => {
//   WelcomeEmail(transporter)({ to: 'example@example.com', name: 'Miguel' });
// });
