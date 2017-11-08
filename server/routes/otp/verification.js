/*===================== load all the files we need ========================================*/
let express=require('express');
let router=express.Router();
var nodemailer = require('nodemailer');
let otplib = require('otplib');

let secret=null;
let token=null;

router.post('/sendOTP', avmailSend); // has to be called at register, mail sent to email id with encrypted otp

function avmailSend(req, res) {

secret = otplib.authenticator.generateSecret();
token = otplib.authenticator.generate(secret);
    var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'expensemanager1295@gmail.com',
        pass: 'Expense@12'
    }
});
const mailOptions = {
  from: 'expensemanager1295@gmail.com', // sender address
  to: req.body.email, // list of receivers
  subject: req.body.content, // Subject line
  html:`<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  </head>
  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666
  ; background:white; text-decoration: none;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td valign="top" style="width: 100%;">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  </head>
  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666
  ; background:white; text-decoration: none;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td valign="top" style="width: 100%;">
  <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
  <tr align="center">
  <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 14pt; font-weight: bold; color: #333333
  ;">
  <h1>Glib App</h1>
  <p style="margin: 0; padding: 0;">Welcome! One more step to register with us!</p>
  </td>
  </tr>
  <tr align="center">
  <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 11pt;">
  <p> Your OTP is :`+token+`</p>
  </td>
  </tr>
  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>`// plain text body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.json({"message":"OTP not Sent"});
  } else {
    res.json({"message":"OTP Sent"});
  }
}); 
    
}

router.post('/verifyOTP', avmailGet); // has to be called at clicking link in email ^^ sent above
function avmailGet(req, res) {
let isValid = false;
 //const isValid = otplib.authenticator.check(req.body.token, secret);
 if(req.body.token == token)
 isValid = true;
    res.send({"message":isValid});
}
module.exports=router;
