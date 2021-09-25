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
  (async function() {
    let total = 0;
    let postback;
    try {
      postback = await Postback.findAll({
        where: { subid: subid },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true
      });

      console.log("retrived activity", postback);
      postback.map(({ payout }) => {
        payout = util.applyCut(payout);
        total = total + payout;
      });

      // res.json(postback);
    } catch (error) {
      console.log(error);
    }
    let payment;
    try {
      payment = await Payment.findAll({
        where: { subid: subid },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true
      });

      console.log("retrived payment", payment);

      // res.json(payment);
    } catch (error) {
      console.log(error);
    }

    const activity = {
      payment: payment,
      postback: postback,
      total: total
    };
    res.json(activity);
    console.log(activity);
  })();
  // get total and pending valuss
  // return all in a big object
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
