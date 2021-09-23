const db = require("./../database");
const { DataTypes } = require("sequelize");
const Payment = db.define(
  "Postback",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    subid: {
      type: DataTypes.BIGINT
    },
    payout: {
      type: DataTypes.BIGINT
    },

    status: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    submitDate: {
      type: DataTypes.DATE
    }
  },
  {
    // Other model options go here
  }
);
module.exports = Payment;