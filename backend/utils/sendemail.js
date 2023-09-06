const nodemailer = require('nodemailer');

const sendEmail= async (email, Subject, message) => {
  try {
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'prince62@ethereal.email',
          pass: 'uWxz2wUXKrcSSDcjs7'
      }
  });

    const info = await transporter.sendMail({
      from: '"Moiz Sheraz from Mern Stack Learning" <kattie.predovic82@ethereal.email>',
      to: email,
      subject: Subject,
      text: message,
      html:'<h1><Password Reset Request</h1>'
    });

    console.log('Email sent:', info.messageId);
    return 'Done';
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
module.exports=sendEmail