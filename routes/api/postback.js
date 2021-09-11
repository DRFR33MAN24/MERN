const express = require("express");
const router = express.Router();
//const auth = require("../../middleware/auth");
//postback Model
const Postback = require("../../models/Postback");
const User = require("../../models/User");

// @route GET api/items
// @desc Get All Items
// @acces Public
router.post("/", (req, res) => {
  

    const amount = 1;

    // Update user 
    User.update({balance:balance+amount}
        {where:{id:subid}})
        .then(()=> console.log("user balance updated ${balance+amount}"))
        .catch(err=>console.log(err));
});

module.exports = router;
