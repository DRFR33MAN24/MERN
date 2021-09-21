const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

const Postback = require("../../models/Postback");

router.post("/", (req, res) => {
  console.log("Get Activity Route Called");
  const { sudid } = req.body;
  (async function() {
    // await Promise.all([CallCpalead(), CallKiwi()]);

    try {
      const postback = await Postback.findAll({
        where: { subid: subid },
        raw: true,
        nest: true
      });

      console.log("retrived activity", postback);
      res.json(postback);
    } catch (error) {}
  })();
});
module.exports = router;
