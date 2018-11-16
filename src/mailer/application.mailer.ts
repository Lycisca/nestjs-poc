const nodemailer = require('nodemailer');

export const sendEmail = (
  { from = 'defaultFrom@example.com', to, subject, text, html },
  adapter = 'test',
) => {
  if (adapter == 'test') {
    sendEmailTest({ from, to, subject, text, html });
  }
};

export const sendEmailTest = mailOptions => {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.log(error);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
};
