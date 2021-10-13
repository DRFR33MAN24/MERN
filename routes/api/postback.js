const express = require("express");
const router = express.Router();
const logToFile = require("../../middleware/logToFile");
const util = require("../../util");
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

router.get("/kiwi", async (req, res) => {
  const {
    sub_id,
    amount,
    status,
    offer_name,
    signature,
    trans_id,
    offer_id
  } = req.query;

  // Importing Required Modules
  const crypto = require("crypto");
  const hash = crypto
    .createHash("md5")
    .update(`${sub_id}:${amount}:${kiwi_secret}`)
    .digest("hex");

  if (signature === hash) {
    postback = await Postback.findOne({
      where: {
        offer_id: offer_id,
        trans_id: trans_id
      },

      raw: true,
      nest: true
    });

    if (postback != null) {
      res.status(200).end("1");
      return;
    }

    const newPostback = Postback.build({
      payout: `${amount}`,
      subid: `${sub_id}`,
      campaign_name: "kiwi",
      status: `${status === 1 ? "credited" : "reversed"}`,
      offer_name: `${offer_name}`,
      trans_id: `${trans_id}`,
      offer_id: `${offer_id}`
    });

    await newPostback.save();
    // Update user

    await User.update(
      { balance: db.literal(`balance + ${util.applyCut(amount)}`) },
      { where: { id: sub_id } }
    );

    res.status(200).end("1");
  } else {
    res.end("Not Authorized");
    return;
  }
});

router.get("/cpalead", (req, res) => {
  const { password, subid, payout, title } = req.query;

  if (password === cpalead_pass) {
    const newPostback = Postback.build({
      payout: `${payout}`,
      subid: `${subid}`,
      campaign_name: "cpalead",
      status: `pending`,
      offer_name: `${title}`
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

    res.status(200).end("success");
  } else {
    res.status(400).end("Not Authorized");
    return;
  }
});

module.exports = router;
