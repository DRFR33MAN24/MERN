const express = require("express");
const router = express.Router();
//const auth = require("../../middleware/auth");
//postback Model
const Postback = require("../../models/Postback");
const User = require("../../models/User");
const db = require("../../database");
const cpalead_pass = "cpalead_123";
const kiwi_pass = "kiwi_123";
// @route GET api/items
// @desc Get All Items
// @acces Public
router.get("/", (req, res) => {

  const { password } = req.query;

  if (password === cpalead_pass) {

    const {
      subid,
      payout
    } = req.query;


    const newPostback = Postback.build({
      payout: `${payout}`,
      subid: `${subid}`,
      campaign_name: 'cpalead'
    });

    newPostback
      .save()
      .then(pb => console.log(success))
      .catch(err => console.log(err));
    // Update user

    User.update(
      { balance: db.literal(`balance + ${payout}`) },
      { where: { id: subid } }
    )
      .then(() => console.log(`user balance updated ${payout}`))
      .catch(err => console.log(err));

    res.send("success");
  }

  else if (password === kiwi_pass) {
    const {
      sub_id,
      amount,
      status,
      offer_name
    } = req.query;


    const newPostback = Postback.build({
      payout: `${amount}`,
      subid: `${sub_id}`,
      campaign_name: 'kiwi',
      status: `${status}`,
      offer_name: `${offer_name}`
    });

    newPostback
      .save()
      .then(pb => console.log(success))
      .catch(err => console.log(err));
    // Update user

    User.update(
      { balance: db.literal(`balance + ${amount}`) },
      { where: { id: sub_id } }
    )
      .then(() => console.log(`user balance updated ${amount}`))
      .catch(err => console.log(err));

    res.send("success");
  }

  else {

    res.send("Not Authorized");
    return;

  }

});

module.exports = router;
