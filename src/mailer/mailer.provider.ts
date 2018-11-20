const nodemailer = require('nodemailer');

interface Transporter {
  sendMail: (emailOptions: any, callback: (err, info) => {}) => {};
}

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
