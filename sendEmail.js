var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "cudddan@gmail.com",
      pass: "blackmesa-123"
    }
  })
);

const sendEmail = (to, subject, html) => {
  const mailOptions = {
    to: to,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports = { sendEmail };
