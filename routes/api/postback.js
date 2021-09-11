const express = require("express");
const router = express.Router();
//const auth = require("../../middleware/auth");
//postback Model
const Postback = require("../../models/Postback");
const User = require("../../models/User");

// @route GET api/items
// @desc Get All Items
// @acces Public
router.post("/", (req, res) => {
  const { subid, virtual_currency, payout, campaign_name, password } = req.body;
  const setPass = cpa_123;
  if (password != setPass) {
    res.send("Not Authorized");
    return;
  }
  const newPostback = Postback.build({
    payout: `${payout}`,
    subid: `${subid}`,
    campaign_name: `${campaign_name}`
  });

  newPostback
    .save()
    .then(pb => console.log(success))
    .catch(err => console.log(err));
  // Update user

  User.update({ balance: balance + virtual_currency }, { where: { id: subid } })
    .then(() =>
      console.log(`user balance updated ${balance + virtual_currency}`)
    )
    .catch(err => console.log(err));

  res.send("success");
});

module.exports = router;
