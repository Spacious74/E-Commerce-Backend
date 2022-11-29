module.exports = (sequelize,sequelizeInstance)=>{
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
    return categoryModel;
}