const db = require("./../database");
const { DataTypes } = require("sequelize");
const Postback = db.define(
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

    campaign_name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    status: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    offer_name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    trans_id: {
      type: DataTypes.BIGINT
    },
    offer_id: {
      type: DataTypes.BIGINT
    }

  },
  {
    // Other model options go here
  }
);
module.exports = Postback;
