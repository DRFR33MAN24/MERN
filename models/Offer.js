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
    offer_id: {
      type: DataTypes.BIGINT
    },
    featured: {
      type: DataTypes.BOOLEAN
    },

    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    },
    img: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    amount: {
      type: DataTypes.INTEGER
      // allowNull defaults to true
    },
    provider: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
    ,
    category: {
      type: DataTypes.STRING
    }
  },
  {
    // Other model options go here
  }
);
module.exports = Offer;
