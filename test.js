const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT | 3030;

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: [USER_EMAIL],
      pass: [GMAIL_GENERATED_PASSWORD]
    }
  })
);

var mailOptions = {
  from: [USER_EMAIL],
  to: [RECEPIENT_EMAIL],
  subject: 'Sending Email using Node.js[nodemailer]',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.get('', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
