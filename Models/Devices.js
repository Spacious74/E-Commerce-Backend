const sequelize = require("sequelize");
const sequelizeInstance  = require("../connection");

let Devices = sequelizeInstance.define("devices", 
    {
        id : {
            type: sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        dname : {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        category : {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        dprice : {
            type: sequelize.DataTypes.BIGINT,
            allowNull: false
        },
        createdAt : {
            type: sequelize.DataTypes.DATE
        }
    },
    {
        timestamps: false
    }
);

module.exports = Devices