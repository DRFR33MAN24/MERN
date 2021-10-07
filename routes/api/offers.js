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
const url_cpalead =
  "http://cpalead.com/dashboard/reports/campaign_json.php?id=1721323";

const url_kiwi =
  "https://www.kiwiwall.com/get-offers/8mj7rMyCaqd04dKDgLL22oRZC9zqmBtY/?country=ALL";

const updateFq_kiwi = 100;
const updateFq_cpalead = 10;

const CallCpalead = async () => {
  // #1 Update offers database by calling offer providers if necessary
  let offers_cpalead = [];
  const cpalead_p = await OfferProvider.findOne({ where: { name: "cpalead" } });
  console.log("Finding cpalead Finished");
  const curr_date = new Date();
  const last_date = new Date(cpalead_p.lastUpdate);
  const diffMins = Math.round(
    (((curr_date - last_date) % 86400000) % 3600000) / 60000
  ); // minutes
  console.log("Time since last update cpalead", diffMins);

  if (diffMins > updateFq_cpalead) {
    const res = await axios.get(url_cpalead);

    console.log("Calling cpalead API");
    res.data.offers.map(
      ({
        title,
        campid,
        description,
        link,
        previews,
        amount,
        conversion,
        country,
        mobile_app_type
      }) => {
        offers_cpalead.push({
          title: title,
          offer_id: campid,
          description: description,
          link: link,
          img: previews[0].url,
          amount: amount * 100,
          conversion: conversion,
          country: country,
          device: mobile_app_type,
          provider: "cpalead",
          category: conversion
        });
      }
    );

    try {
      numDelOffers_cpalead = await Offer.destroy({
        where: { provider: "cpalead" }
      });
      console.log("number of deleted offers cpalead", numDelOffers_cpalead);
    } catch (error) {
      console.log(error);
    }

    try {
      await Offer.bulkCreate(offers_cpalead);
      console.log("offers created successfully cpalead");
    } catch (error) {}

    try {
      await OfferProvider.update(
        { lastUpdate: curr_date },
        { where: { name: "cpalead" } }
      );
      console.log("offers updated successfully cpalead");
    } catch (error) {
      console.log("error updating offers", error);
    }
  }
};

const CallKiwi = async () => {
  let offers_kiwi = [];
  const kiwi_p = await OfferProvider.findOne({ where: { name: "kiwi" } });
  console.log("Finding kiwi Finished");
  const curr_date = new Date();
  const last_date = new Date(kiwi_p.lastUpdate);
  const diffMins = Math.round(
    (((curr_date - last_date) % 86400000) % 3600000) / 60000
  ); // minutes
  console.log("Time since last update kiwi", diffMins);

  if (diffMins > updateFq_kiwi) {
    const res = await axios.get(url_kiwi);
    console.log("Calling kiwi API");
    res.data.offers.map(
      ({
        name,
        instructions,
        link,
        logo,
        amount,
        id,
        countries,
        os,
        category
      }) => {
        // create an array with all the countries
        const country_arr = countries.split(",");
        country_arr.map(c => {
          offers_kiwi.push({
            title: name,
            offer_id: id,
            description: instructions,
            link: link,
            img: logo,
            amount: amount,
            conversion: category,
            country: c,
            device: os,
            provider: "kiwi",
            category: category
          });
        });
      }
    );

    try {
      numDelOffers_kiwi = await Offer.destroy({
        where: { provider: "kiwi" }
      });
      console.log("number of kiwi deleted offers kiwi", numDelOffers_kiwi);
    } catch (error) {
      console.log(error);
    }

    try {
      await Offer.bulkCreate(offers_kiwi);
      console.log("offers created successfully kiwi");
    } catch (error) {}

    try {
      await OfferProvider.update(
        { lastUpdate: curr_date },
        { where: { name: "kiwi" } }
      );
      console.log("offers updated successfully kiwi");
    } catch (error) {
      console.log("error updating offers", error);
    }
  }
};

router.post("/", (req, res) => {
  console.log("Get Offer Route Called");
  const { subid, country, device } = req.body;
  console.log(country, device);

  (async function() {
    try {
      console.log(country, device);
      const offer = await Offer.findAll({
        where: { country: country },
        raw: true,
        nest: true
      });

      console.log("retrived offers", offer);
      res.json(offer);
      await Promise.all([CallCpalead(), CallKiwi()]);
      // await CallCpalead();
      // await CallKiwi();
    } catch (error) {
      console.log(error);
    }
  })();
});
module.exports = router;
