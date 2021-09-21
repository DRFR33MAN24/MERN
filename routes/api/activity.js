const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

const Offer = require("../../models/Offer");
const OfferProvider = require("../../models/OfferProvider");

router.post("/", (req, res) => {
  console.log("Get Activity Route Called");

  (async function() {
    // await Promise.all([CallCpalead(), CallKiwi()]);

    try {
      const offer = await Offer.findAll({
        where: { country: country, device: device },
        raw: true,
        nest: true
      });

      console.log("retrived offers", offer);
      res.json(offer);
    } catch (error) {}
  })();
});
module.exports = router;
