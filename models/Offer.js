const db = require("./../database");
const { DataTypes } = require("sequelize");
const Offer = db.define(
  "Offer",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    description: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },
    link: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    category: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    conversion: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    mobile_app: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    img: {
      type: DataTypes.STRING
      // allowNull defaults to true
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
module.exports = Offer;
