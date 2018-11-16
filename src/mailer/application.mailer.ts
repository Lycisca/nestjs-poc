const nodemailer = require('nodemailer');

interface Transporter {
  sendMail: (emailOptions: any, callback: (err, info) => {}) => {};
}

export const sendEmail = trasporter => ({
  from = 'defaultFrom@example.com',
  to,
  subject,
  text,
  html,
}) => {
  trasporter.sendMail({ from, to, subject, text, html }, (error, info) => {
    if (error) return console.log(error);
  });
};

export const createTransporter = async () => {
  return nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    secure: false,
    auth: {
      user: 'username',
      pass: 'password',
    },
  });
};

export const mockTransporter = async () => {
  return { sendMail: () => {} };
};
