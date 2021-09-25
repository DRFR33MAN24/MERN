const express = require("express");
const router = express.Router();

const axios = require("axios");
const { stringify } = require("query-string");
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

const mail = "support@coinguru.biz";

router.post("/", (req, res) => {
  const { message, email,subject, name, token } = req.body;
      // Verify URL
  const query = stringify({
    secret: config.get("reCAPTCHA"),
    response: req.body.token,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `${config.get("verifyURL")}${query}`;
  //console.log(verifyURL);
  const body = await axios.get(verifyURL);
  //console.log(body.data);
  if (body.data.success !== undefined && !body.data.success) {
    return res.status(400).json({ msg: "Failed captcha verification" });
  }

  else{
     const mailOptions = {
    to: mail,
    subject: req.body.subject,
    html:`${req.body.email}   ${req.body.message}`
  };

    transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.json({ sent: false });
    } else {
      console.log("Message sent: " + response.message);

      res.json({ sent: true });
    }
  })

  }
  
  
});

module.exports = router;
