module.exports = (sequelize,sequelizeInstance) =>{
    
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
    return User;
}

