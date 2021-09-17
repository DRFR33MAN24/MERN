const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
//Item Model
const Offer = require("../../models/Offer");
const OfferProvider = require("../../models/OfferProvider");

// @route GET api/items
// @desc Get All Items
// @acces Public

//cpalead provider
const url =
  "http://cpalead.com/dashboard/reports/campaign_json.php?id=1721323&show=4";
router.post("/", (req, res) => {
  const { subid, country, device } = req.body;
  console.log(country, device);
  // #1 Update offers database by calling offer providers if necessary
  OfferProvider.findOne({ where: { name: "cpalead" } }).then(p => {
    const curr_date = new Date();
    const last_date = new Date(p.lastUpdate);
    const diffMins = Math.round(
      (((curr_date - last_date) % 86400000) % 3600000) / 60000
    ); // minutes
    console.log(curr_date, last_date, diffMins);

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
              mobile_app_type
            }) => {
              offer_arr.push({
                title: title,
                description: description,
                link: link,
                img: previews[0].url,
                amount: amount,
                conversion: conversion,
                country: country,
                device: mobile_app_type
              });
            }
          );

          Offer.bulkCreate(offer_arr)
            .then(() => {
              console.log("offers updated successfully");
              OfferProvider.update(
                { lastUpdate: curr_date },
                { where: { name: "cpalead" } }
              );
            })
            .catch(err => console.log("error updating offers", err));
        })
        .catch(err => console.log(err));
    }
  });

  console.log(country, device);
  Offer.findAll({
    where: { country: country, device: device },
    raw: true,
    nest: true
  }).then(offer => {
    //loop on all offers and change subid
    console.log(offer);
    res.json(offer);
  });
});

module.exports = router;
