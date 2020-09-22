const express = require('express');
const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();


const auth = {
    auth : {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
    }
}

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email,subject,text,cb) => {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: subject,
        text: text
      };
    
    
    
    
    
    transporter.sendMail(mailOptions, function(error, data) {
      if (error) {
        cb(error,null);
      } else {
        cb(null,data);
      }
    });
    
}

module.exports=sendMail ;


