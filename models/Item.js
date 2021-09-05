const db = require('./../database');
const { DataTypes } = require('sequelize');
const Item = db.define('Item', {
  // Model attributes are defined here

  name: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },

  date: {
    type: DataTypes.DATE,
    defaultValue: Date.now
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});



// const mongoose = require("mongoose");
// const schema = mongoose.Schema;

// const itemSchema = new schema({
//   name: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = Item = mongoose.model("item", itemSchema);
