let db ={}
db.roles = require('./Roles');
db.users = require('./User');

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
db.Roles = ["users","admin"];
module.exports = db;