const sequelize = require("sequelize");
const sequelizeInstance  = require("./../config/db.config");

let User = sequelizeInstance.define("users", 
    {
        username : {
            type: sequelize.DataTypes.STRING,
        },
        email : {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: sequelize.DataTypes.STRING,
            allowNull: false
        }
    }
);

module.exports = User

