const db = require("./../database");
const { DataTypes } = require("sequelize");

const User = db.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
      // allowNull defaults to true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false

      // allowNull defaults to true
    },
    balance: {
      type: DataTypes.BIGINT,
      defaultValue: 0
    },
    register_date: {
      type: DataTypes.DATE,
      defaultValue: Date.now
      // allowNull defaults to true
    }
  },
  {
    // Other model options go here
  }
);

module.exports = User;

// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const UserSchema = new schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   register_date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = User = mongoose.model("user", UserSchema);
