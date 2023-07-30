const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service:'gmail',
  port: 587,
  secure: true,
  auth: {
    user: 'themebrandarg@gmail.com',
    pass: 'tdhqkpuutwcukutf'
  },
  /*tls: {
    secure: true,
    ignoreTLS: true,
    rejectUnauthorized: false,
    ciphers:'SSLv3'
}*/
});


module.exports ={ enviarEmail :(mailOptions) => { 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
 }}