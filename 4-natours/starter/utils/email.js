const nodemailer = require("nodemailer");

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // Activate in gmail "less secure app" option if u wanna use g-mail
    host: process.env.EMAIL_HOST, // service: "Gmail", we use Gmail instead
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Ole Kristian <test@test.com>",
    to: options.email,
    subject: options.subject,
    text: options.message
    // OPTIONAL specify html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
