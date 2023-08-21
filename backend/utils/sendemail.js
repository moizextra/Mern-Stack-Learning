const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    let testaccount=await nodeMailer.createTestAccount();
    const transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'kamron.mosciski34@ethereal.email',
            pass: 'emRyRKcbCu2KGJjXnX'
        }
    });

  const mailOptions = {
    from: "Moiz",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;