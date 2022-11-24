const sequelize = require("sequelize");
const sequelizeInstance = require("./../config/db.config");

let Products = sequelizeInstance.define("products", 
    {
        id : {
            type: sequelize.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            notNull: true
        },
        name : {
            type: sequelize.DataTypes.STRING,
            allowNull: false,
        },
        price : {
            type: sequelize.DataTypes.BIGINT,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
);

module.exports = Products;