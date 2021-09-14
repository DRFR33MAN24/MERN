const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Hash = require("../../models/Hash");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

var rand, mailOptions, host, link;

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

router.get("/send", function(req, res) {
  console.log("sending Email");
  rand = Math.floor(Math.random() * 100 + 54);
  host = req.get("host");
  link = "http://" + host + "/verify?id=" + rand;
  mailOptions = {
    to: req.body.email,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
      link +
      ">Click here to verify</a>"
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
  console.log(req.protocol + ":/" + req.get("host"));
  if (req.protocol + "://" + req.get("host") == "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");

    Hash.findOne({ where: { hash: req.query.id } }).then(h => {
      User.update({ active: true }, { where: { email: h.email } })
        .then(() => {
          console.log("User Activated");
          h.destroy()
            .then(() => console.log("Hash Deleted"))
            .catch(err => console.log("Hash not deleted", err));
        })
        .catch(() => console.log("Activation Error"));
    });
  } else {
    res.end("<h1>Request is from unknown source");
  }
});

module.exports = router;
