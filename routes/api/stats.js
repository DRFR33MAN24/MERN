const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");
const Postback = require("../../models/Postback");
const User = require("../../models/User")

const pass = "coin_123"
router.get("/", (req, res) => {
    const { password } = req.query;
    if (password != pass) {
        res.end('Not Authorized')
        return;
    }
    const stats = {};
    // get number of subs
    User.count()
        .then(count => stats.subs = count)
        .catch(err => console.log(err))
    // get total payout 
    Postback.sum('payout')
        .then(s => stats.revenu = s)
        .catch(err => console.log(err))
    // get num of tickets

    res.json(stats);

});

module.exports = router;