const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const Notification = require("../../models/Notification");

router.post("/", async (req, res) => {
  console.log("Get Notifications Route Called");
  const { subid } = req.body;

  const notifications = await Notification.findAll({
    where: { subid: subid },
    raw: true,
    nest: true
  });

  res.json(notifications);
});
module.exports = router;
