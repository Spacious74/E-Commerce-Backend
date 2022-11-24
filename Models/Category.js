const sequelize = require("sequelize");
const sequelizeInstance = require("./../config/db.config");

let categoryModel = sequelizeInstance.define("categories", {
    id: {
        type: sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false,
        notNull: true
    },
},{
    timestamps : false
});

module.exports = categoryModel;