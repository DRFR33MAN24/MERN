const { sequelize } = require('sequelize');

module.exports = sequelize = new Sequelize('coinguru', 'phpmyadmin', 'coin-123', {
    host: 'localhost',
    dialect: 'mysql'
});