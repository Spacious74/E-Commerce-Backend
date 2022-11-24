const sequelize = require("sequelize");
const sequelizeInstance = require("../connection");

let SuperHeroes = sequelizeInstance.define("superheroes", {
    id: {
        type: sequelize.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.DataTypes.STRING,
        allowNull: false
    },
    power: sequelize.DataTypes.STRING,
    comics: sequelize.DataTypes.STRING

},{
    timestamps : false
})

module.exports = SuperHeroes;