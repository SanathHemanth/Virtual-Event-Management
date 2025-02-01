const nodemailer = require('nodemailer');
//const {events} = require('../Controllers/eventController');
const transponder = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
    //   user: "257d316a0fcab3",
    //   pass: "2192780b0521ce"
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
});

const registrationMail = async(to,eventName)=>{
    try{
        const mailDetail = {
            to : to,
            subject : `Registration confirmation - ${eventName}`,
            html : '<h1>Thank you for registering for the event</h1>'
        };
        console.log("Email User:", process.env.EMAIL_USER); // Debugging
        console.log("Email Pass:", process.env.EMAIL_PASS);
        await transponder.sendMail(mailDetail);
        console.log(`mail send to ${to}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
};

module.exports = {registrationMail};