const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Hash = require("../../models/Hash");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const activate = require("../../emailTemplates/activate");

var rand, mailOptions, host, link;

var transporter = nodemailer.createTransport(
  smtpTransport({
    // service: "gmail",
    // host: "smtp.gmail.com",
    // auth: {
    //   user: "cudddan@gmail.com",
    //   pass: "blackmesa-123"
    // }

    service: "localhost",
    host: "mail.coinguru.biz",
    port: 290,
    secure: true,
    auth: {
      user: "support@coinguru.biz",
      pass: "blackmesa-123"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
);

router.post("/send", function(req, res) {
  console.log("sending Email");
  rand = crypto
    .createHash("md5")
    .update(req.body.email)
    .digest("hex");
  host = req.get("host");
  link = "http://" + host + "/api/email" + "/verify?id=" + rand;
  mailOptions = {
    from: "CoinGuru <support@coinguru.biz>",
    to: req.body.email,
    subject: "Please confirm your Email account",
    html: activate.activationTemplate(link)
  };

  console.log(mailOptions);

  Hash.create({
    hash: rand,
    email: req.body.email
  })
    .then(() => console.log("Hash saved...."))
    .catch(() => console.log("Operation failed"));

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.json({ sent: false });
    } else {
      console.log("Message sent: " + response.message);

      res.json({ sent: true });
    }
  });
});

router.get("/verify", function(req, res) {
  console.log("Domain is matched. Information is from Authentic email");

  Hash.findOne({ where: { hash: req.query.id } }).then(h => {
    User.update({ active: true }, { where: { email: h.email } })
      .then(() => {
        console.log("User Activated");
        h.destroy()
          .then(() => console.log("Hash Deleted"))
          .catch(err => console.log("Hash not deleted", err));
      })
      .then(() => res.redirect("https://coinguru.biz/app"))
      .catch(() => console.log("Activation Error"));
  });
});

module.exports = router;
