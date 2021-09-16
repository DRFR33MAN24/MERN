const db = require("./../database");
const { DataTypes } = require("sequelize");
const OfferProvider = db.define(
  "OfferProvider",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    lastUpdate: {
      type: DataTypes.DATE
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
  }
);
module.exports = OfferProvider;
