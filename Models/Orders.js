const sequelize = require("sequelize");
const sequelizeInstance  = require("../connection");

let Orders = sequelizeInstance.define("orders", 
    {
        id : {
            type: sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        userId : {
            type: sequelize.DataTypes.BIGINT,
            allowNull: false
        },
        productId : {
            type: sequelize.DataTypes.BIGINT,
            allowNull: false
        },
        quantity : {
            type: sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        payment : {
            type: sequelize.DataTypes.BOOLEAN,
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

module.exports = Orders;