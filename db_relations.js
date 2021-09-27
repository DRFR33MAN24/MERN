const db = require("./database");
const User = require("./models/User");
const Payment = require("./models/Payment");

User.hasMany(Payment);
Payment.belongsTo(User);
