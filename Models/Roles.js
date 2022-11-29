module.exports = (sequelize,sequelizeInstance) => {

    const Role = sequelizeInstance.define("roles", {
        id: {
            type: sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: sequelize.STRING,
        }
    });
    return Role;
}
