const db = require("./../database");
const { DataTypes } = require("sequelize");
const Offer = db.define(
  "Offer",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
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

    conversion: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    country: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    device: {
      type: DataTypes.STRING
    }
    ,
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
