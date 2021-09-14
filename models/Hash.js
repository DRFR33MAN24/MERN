const db = require("./../database");
const { DataTypes } = require("sequelize");
const Hash = db.define(
  "Hash",
  {
    // Model attributes are defined here
    hash: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Other model options go here
  }
);
module.exports = Hash;
