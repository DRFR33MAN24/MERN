const db = require("./../database");
const { DataTypes } = require("sequelize");
const Postback = db.define(
  "Postback",
  {
    // Model attributes are defined here
    subid: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    offer: {
      type: DataTypes.STRING
    },

    amount: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
  }
);
module.exports = Postback;