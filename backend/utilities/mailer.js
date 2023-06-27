const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = (user, email, password) => {
  const template = `
  <html>
    <head>
      <title>Welcome To Horsella</title>
      <style>
        .body {
          font-size: 1rem;
        }
        .body .weblink {
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="body">
        Hello ${user},
        <br /><br />
        Thank you for registering with us.
        Use the below credentials to log in our 
        <a class="weblink" href="http://horsella.herokuapp.com/login">website</a>
        <br /><br />
        Username: <strong>${email}</strong><br />
        Password: <strong>${password}</strong>
        <br /><br />
        Kindly change your password by logging in as soon as possible.
        <br /><br />
        Regards,<br />
        Team Horsella
      </div>
    </body>
  </html>
  `;

  return transport.sendMail({
    from: 'rushipatel9650@gmail.com', // From address
    to: email, // To address
    subject: 'Login Credentials for Horsella', // Subject
    html: template,
  });
};

const sendResetLink = (email, resetLink) => {
  const template = `
  <html>
    <head>
      <title>Password reset link</title>
      <style>
        .body {
          font-size: 1rem;
        }
        .body .weblink {
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="body">
        Hello Customer,
        <br /><br />
        Use the below link to reset your password.
        <br /><br />
        Reset link : ${resetLink}
        <br /><br />
        If you have not requested the reset, contact our support team immediately.
        <br /><br />
        Regards,<br />
        Team Horsella
      </div>
    </body>
  </html>
  `;

  return transport.sendMail({
    from: 'rushipatel9650@gmail.com', // From address
    to: email, // To address
    subject: 'Link to reset password', // Subject
    html: template,
  });
};

module.exports = { sendMail, sendResetLink };
