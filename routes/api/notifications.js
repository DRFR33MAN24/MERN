const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const Notification = require("../../models/Notification");

router.post("/", (req, res) => {
    console.log("Get Offer Route Called");
    const { subid } = req.body;



});
module.exports = router;