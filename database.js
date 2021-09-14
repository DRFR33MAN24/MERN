const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  "coinguru_db",
  "coinguru_admin",
  "CoinGuru-123",
  {
    host: "sv99.ifastnet.com",
    dialect: "mysql"
  }
);
