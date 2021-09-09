const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
//Item Model
const Offer = require("../../models/Offer");

// @route GET api/items
// @desc Get All Items
// @acces Public
router.get("/", auth, (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

module.exports = router;
