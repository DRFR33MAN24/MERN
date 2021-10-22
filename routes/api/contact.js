const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");
const { stringify } = require("query-string");
const { SendMail } = require("../../sendEmail");

const mail = "coinguru@coinguru.biz";

router.post("/", async (req, res) => {
  const { message, email, subject, name, token } = req.body;
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
  } else {
    const mailOptions = {
      to: mail,
      subject: req.body.subject,
      html: `${req.body.email}   ${req.body.message}`
    };

    SendMail(mailOptions)
      .then(res => {
        res.json({ sent: true });
      })
      .catch(err => {
        res.json({ sent: false });
        console.log(err);
      });
  }
});

module.exports = router;
