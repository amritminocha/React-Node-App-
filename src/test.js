const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT | 3030;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
});

var mailOptions = {
  from: process.env.EMAIL,
  to: process.env.SENDER_EMAIL,
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
