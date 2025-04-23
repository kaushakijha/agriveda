const nodemailer = require("nodemailer");

const sendMail = async (receiverEmailAddress, content, subject) => {
  const userEmail = receiverEmailAddress;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,  // This will fetch the Gmail ID from your .env
      pass: process.env.APP_PASSWORD,  // This will fetch the app password from your .env
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: process.env.GMAIL_ID,  // Use the same email address as sender
    to: userEmail,
    subject: subject,
    html: content,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail;
