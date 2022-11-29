let db ={}
db.roles = require('./Roles');
db.users = require('./User');
db.product = require('./Product');
db.cart = require('./Cart');

db.roles.belongsToMany(db.users,{
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});
db.users.belongsToMany(db.roles,{
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

db.product.belongsToMany(db.cart,{
    through: "cart_products",
    foreignKey : "productId",
    otherKey : "cartId",
});

db.cart.belongsToMany(db.product,{
    through: "cart_products",
    foreignKey : "cartId",
    otherKey : "productId",
});

db.Roles = ["users","admin"];
module.exports = db;