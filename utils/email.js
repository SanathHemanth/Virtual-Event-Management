const nodemailer = require('nodemailer');
//const {events} = require('../Controllers/eventController');
const transponder = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "257d316a0fcab3",
      pass: "2192780b0521ce"
    }
});

const sendMail = async(to,eventName)=>{

};