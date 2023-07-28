const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: true,
  auth: {
    user: '',
    pass: ''
  },
  /*tls: {
    secure: true,
    ignoreTLS: true,
    rejectUnauthorized: false,
    ciphers:'SSLv3'
}*/
});

const mailOptions = {
  from: 'prueba@serviexportsp.com.ar',
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