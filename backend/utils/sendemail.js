const nodemailer = require('nodemailer');

const sendEmail= async (email, Subject, message) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'kattie.predovic82@ethereal.email',
        pass: 'AsK3nt1kBkbgqTjaU8'
      }
    });

    const info = await transporter.sendMail({
      from: '"Moiz Sheraz from Mern Stack Learning" <kattie.predovic82@ethereal.email>',
      to: email,
      subject: Subject,
      text: message
    });

    console.log('Email sent:', info.messageId);
    return 'Done';
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};
module.exports=sendEmail