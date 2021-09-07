const { Sequelize } = require("sequelize");

module.exports = new Sequelize("coinguru", "phpmyadmin", "coin-123", {
  host: "localhost",
  dialect: "mysql"
});
