let sequelize = require("sequelize");
let sequelizeInstance = require("./../config/db.config");

const Role = sequelizeInstance.define("roles", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: sequelize.STRING,
    }
});

module.exports = Role