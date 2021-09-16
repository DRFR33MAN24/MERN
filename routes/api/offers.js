const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item Model
const Offer = require("../../models/Offer");
const OfferProvider = require("../../models/OfferProvider");

// @route GET api/items
// @desc Get All Items
// @acces Public

//cpalead provider
const url = new URL(
  "http://cpalead.com/dashboard/reports/campaign_json.php?id=1721323"
);

router.post("/", auth, (req, res) => {
  const { subid, offer_type, country, device } = req.body;

  // #1 Update offers database by calling offer providers if necessary
  OfferProvider.findOne({ where: { name: "cpalead" } }).then(p => {
    const curr_date = +Date();
    const last_date = p.lastUpdate;
    const diffMins = Math.round(
      (((curr_date - last_date) % 86400000) % 3600000) / 60000
    ); // minutes
    console.log(diffMins);
    if (diffMins > 10) {
      axios
        .get(url)
        .then(res => {
          let offer_arr = [];
          res.data.offers.map(
            ({
              title,
              description,
              link,
              previews,
              amount,
              conversion,
              country,
              device
            }) => {
              offer_arr.push({
                title: title,
                description: description,
                link: link,
                img: previews[0].url,
                amount: amount,
                conversion: conversion,
                country: country,
                device: device
              });
            }
          );

          Offer.bulkCreate(offer_arr)
            .then(() => console.log("offers updated successfully"))
            .catch(err => console.log("error updating offers", err));
        })
        .catch(err => console.log(err));
    }
  });

  Offer.findAll({
    where: { offer_type: offer_type, country: country, device: device }
  }).then(offer => res.json(offer));
});

module.exports = router;
