const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'geronimo.reynoso.3@gmail.com',
    pass: 'waqkfxzzysgjpkay'
  }
});

const mailOptions = {
  from: 'geronimo.reynoso.3@gmail.com',
  to: 'geronimo.reynoso.3@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Aca hiria la clave para recuperar el password'
};

module.exports ={ enviarEmail :() => { 
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
 }}