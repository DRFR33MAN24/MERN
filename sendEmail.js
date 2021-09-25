var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

async function SendMail(mailOptions) {
  return new Promise((resolve, reject) => {
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

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log("error is " + error);
        resolve(false); // or use rejcet(false) but then you will have to handle errors
      } else {
        console.log("Email sent: " + info.response);
        resolve(true);
      }
    });
  });
}

module.exports = { SendMail };
