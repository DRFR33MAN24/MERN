const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const Postback = require("../../models/Postback");
const User = require("../../models/User");

const pass = "coin_123";
router.get("/", async (req, res) => {
  const { password } = req.query;
  if (password != pass) {
    res.end("Not Authorized");
    return;
  }
  // get number of subs
  let count = await User.count();

  // get total payout
  let total = await Postback.sum("payout");

  // get num of tickets
  const stats = { total: total, count: count };

  res.json(stats);
});

module.exports = router;
