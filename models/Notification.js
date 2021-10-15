const db = require("./../database");
const { DataTypes } = require("sequelize");
const Notification = db.define(
    "Notification",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        subid: {
            type: DataTypes.INTEGER
        },
        viewed: {
            type: DataTypes.BOOLEAN
        },

        message: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        submitDate: {
            type: DataTypes.DATE
        }
    },
    {
        // Other model options go here
    }
);
module.exports = Notification;
