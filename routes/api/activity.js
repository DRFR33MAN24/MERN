const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

const Postback = require("../../models/Postback");

router.post("/", (req, res) => {
  console.log("Get Activity Route Called");
  const { subid } = req.body;

  // findall records with a given subid in postback
  // ignore disabled offers
  // apply cut on remaining offers
  // sort by date and retrurn

  Postback.findAll({
    where: { subid: subid },
    raw: true,
    nest: true
  })
    .then(postback => {
      console.log("retrived activity", postback);
      res.json(postback);
    })
    .catch(err => console.log(err));
});
module.exports = router;
