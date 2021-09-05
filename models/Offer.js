const db = require('./../database');
const { DataTypes } = require('sequelize');
const Offer = db.define('Offer', {
    // Model attributes are defined here
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    description: {
        type: DataTypes.TEXT
        // allowNull defaults to true
    },
    payout: {
        type: DataTypes.BIGINT
        // allowNull defaults to true
    },
    country: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});