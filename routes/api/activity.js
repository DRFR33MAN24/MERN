const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const util = require("../../util");
const Postback = require("../../models/Postback");
const Payment = require("../../models/Payment");

router.post("/", (req, res) => {
  console.log("Get Activity Route Called");
  const { subid } = req.body;

  // findall records with a given subid in postback
  // ignore disabled offers
  // apply cut on remaining offers
  // sort by date and retrurn

  Postback.findAll({
    where: { subid: subid },
    order: [["createdAt", "DESC"]],
    raw: true,
    nest: true
  })
    .then(postback => {
      console.log("retrived activity", postback);
      postback.payout = util.applyCut(postback.payout);
      res.json(postback);
    })
    .catch(err => console.log(err));
});

router.post("/payment", (req, res) => {
  console.log("Get Activity Payment Route Called");
  const { subid, payout } = req.body;

  Payment.create({
    subid: subid,
    payout: payout,
    status: "pending",
    submitDate: Date.now
  })
    .then(() => console.log("Payment order submitted"))
    .catch(err => console.log(err));
});
module.exports = router;
