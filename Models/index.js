const sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
let dbConfig = require("./../config/db.config")[env];
const sequelizeInstance = new sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: dbConfig.pool
    }
);
let db = {}
db.sequelize = sequelize;
db.sequelizeInstance = sequelizeInstance;
db.roles = require('./Roles')(sequelize, sequelizeInstance);
db.users = require('./User')(sequelize, sequelizeInstance);
db.product = require('./Product')(sequelize, sequelizeInstance);
db.cart = require('./Cart')(sequelize, sequelizeInstance);
db.categories = require('./Category')(sequelize, sequelizeInstance);

db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});

db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "productId",
    otherKey: "cartId",
});

db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId",
    otherKey: "productId",
});

db.Roles = ["users", "admin"];
module.exports = db;