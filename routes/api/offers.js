const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item Model
const Offer = require("../../models/Offer");

// @route GET api/items
// @desc Get All Items
// @acces Public
router.get("/", auth, (req, res) => {
  Offer.find()
  .then(offer => res.json(offer));
});

module.exports = router;
