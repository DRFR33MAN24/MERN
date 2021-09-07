const { Sequelize } = require("sequelize");

module.exports = new Sequelize("msm123msm", "msm1994", "blackmesa", {
  host: "db4free.net",
  dialect: "mysql"
});
