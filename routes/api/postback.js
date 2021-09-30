const express = require("express");
const router = express.Router();
const logToFile = require("../../middleware/logToFile");
const util = require("util");
//const auth = require("../../middleware/auth");
//postback Model
const Postback = require("../../models/Postback");
const User = require("../../models/User");
const db = require("../../database");
const cpalead_pass = "cpalead_123";
const kiwi_secret = "lsRWy0Q2FZDWIJliNuje4BFTSUSFCL1O";
// @route GET api/items
// @desc Get All Items
// @acces Public
router.use("/kiwi", logToFile.SiteLogger);
router.use("/cpalead", logToFile.SiteLogger);
router.get("/kiwi", (req, res) => {
  const { sub_id, amount, status, offer_name, signature } = req.query;

  // Importing Required Modules
  const crypto = require("crypto");
  const hash = crypto
    .createHash("md5")
    .update(`${sub_id}:${amount}:${kiwi_secret}`)
    .digest("hex");

  if (signature === hash) {
    const newPostback = Postback.build({
      payout: `${amount}`,
      subid: `${sub_id}`,
      campaign_name: "kiwi",
      status: `${status}`,
      offer_name: `${offer_name}`
    });

    newPostback
      .save()
      .then(pb => console.log(success))
      .catch(err => console.log(err));
    // Update user

    User.update(
      { balance: db.literal(`balance + ${util.applyCut(amount)}`) },
      { where: { id: sub_id } }
    )
      .then(() => console.log(`user balance updated ${util.applyCut(amount)}`))
      .catch(err => console.log(err));

    res.send(1);
  } else {
    res.send("Not Authorized");
    return;
  }
});

router.get("/cpalead", (req, res) => {
  const { password, subid, payout } = req.query;

  if (password === cpalead_pass) {
    const newPostback = Postback.build({
      payout: `${payout}`,
      subid: `${subid}`,
      campaign_name: "cpalead"
    });

    newPostback
      .save()
      .then(pb => console.log(success))
      .catch(err => console.log(err));
    // Update user

    User.update(
      { balance: db.literal(`balance + ${util.applyCut(payout)}`) },
      { where: { id: subid } }
    )
      .then(() => console.log(`user balance updated ${util.applyCut(payout)}`))
      .catch(err => console.log(err));

    res.send("success");
  } else {
    res.send("Not Authorized");
    return;
  }
});

module.exports = router;
