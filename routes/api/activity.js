const express = require("express");
const router = express.Router();

const util = require("../../util");
const Postback = require("../../models/Postback");
const Payment = require("../../models/Payment");
const User = require("../../models/User");
const ObjectsToCsv = require("objects-to-csv");
const auth = require("../../middleware/auth");

const getActivity = async subid => {
  let total = 0;
  let postback;
  let postback_final;
  try {
    postback = await Postback.findAll({
      where: { subid: subid },
      order: [["createdAt", "DESC"]],
      raw: true,
      nest: true
    });

    console.log("retrived activity", postback);
    postback_final = postback.map(post => {
      var temp = Object.assign({}, post);
      temp.payout = util.applyCut(temp.payout);
      total = total + temp.payout;
      return temp;
    });

    // res.json(postback);
  } catch (error) {
    console.log(error);
  }
  let payment;
  try {
    payment = await Payment.findAll({
      where: { subid: subid },
      order: [["createdAt", "DESC"]],
      raw: true,
      nest: true
    });

    console.log("retrived payment", payment);

    // res.json(payment);
  } catch (error) {
    console.log(error);
  }

  const activity = {
    payment: payment,
    postback: postback_final,
    total: total
  };
  console.log(activity);
  return activity;
};

router.post("/", async (req, res) => {
  console.log("Get Activity Route Called");
  const { subid } = req.body;

  // findall records with a given subid in postback
  // ignore disabled offers
  // apply cut on remaining offers
  // sort by date and retrurn
  const activity = await getActivity(subid);
  res.json(activity);
  // get total and pending valuss
  // return all in a big object
});

router.get("/downloadCSV", async (req, res) => {
  console.log("Get CSV Route Called");

  const data = [];
  const users = await User.findAll({
    include: [{ model: Payment, as: "payments" }]
  });
  //console.log(users);

  users.map(({ wallet, payments }) => {
    let totalPayout = 0;

    payments.map(({ payout,status,id }) => {
      if (status === "pending") {
        
        totalPayout += payout;
       await Payment.update({status:"processing"},{where:{id:id}});
      }
    });

    data.push({ address: wallet, amount: totalPayout });
  });

  const csv = new ObjectsToCsv(data);
  await csv.toDisk("./payments.csv");

  res.download("./payments.csv");

  // get all payments
  // get users by subid retrived from payments
  // get payout and wallet adderess
  // create csv file save to desk
  // .then sendFile to browser
});

router.post("/payment", auth, async (req, res) => {
  console.log("Get Activity Payment Route Called");
  const { subid } = req.body;
  let balance = 0;
  try {
    user = await User.findOne({ where: { id: subid }, plain: true });

    console.log(user);
    if (user.wallet === undefined || user.wallet === "") {
      return res
        .status(400)
        .json({ msg: "Please enter a valid wallet address" });
    }
    balance = user.balance;
    if (balance <= 0) {
      return res.status(400).json({ msg: "Not enough balance" });
    }
  } catch (error) {}
  try {
    const date = new Date();
    await Payment.create({
      subid: subid,
      payout: balance,
      status: "pending",
      submitDate: date
    });
    console.log("Payment order submitted");
  } catch (error) {
    console.log(error);
  }

  try {
    await User.update(
      { balance: 0 },
      {
        where: {
          id: subid
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

  try {
    const activity = await getActivity(subid);
    res.json(activity);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
