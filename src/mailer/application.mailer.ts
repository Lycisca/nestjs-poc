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
    console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

export const testTrasporter = callback => {
  nodemailer.createTestAccount((err, account) => {
    const trasporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });
    callback(trasporter);
  });
};
