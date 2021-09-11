const express = require("express");
const router = express.Router();
//const auth = require("../../middleware/auth");
//postback Model
const Postback = require("../../models/Postback");

// @route GET api/items
// @desc Get All Items
// @acces Public
router.post("/", (req, res) => {
  const newItem = new Postback({ name: req.body.name });

  newItem.save().then(item => res.json(item));
});

module.exports = router;
