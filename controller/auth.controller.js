let db = require('./../Models/index');
let config = require('./../config/auth.config')
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

let signup = async (req,res) => {
    let user = await db.users.create({
        username : req.body.username,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
    });

    if(req.body.roles){
        let roles = await db.roles.findAll({
            where : {
                name : {
                    [db.sequelize.Op.or]: req.body.roles,
                }
            }
        });
        await user.setRoles(roles);
        res.status(200).json({
            message : "User Registered Successfully"
        });
    }
}

let signin = async (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let userName = await db.users.findOne({
        where : { 
            username: username
        }
    });
    if(!userName){
        res.status(404).json({
            message : "db.users not found"
        });
        return;
    }
    let isValidPassword = bcrypt.compareSync(
        req.body.password, //vishal@123
        userName.password // decrypted password
    );
    if(!isValidPassword) {
        res.status(404).json({
            message : "Password is incorrect"
        });
        return;
    }
    var token = jwt.sign({ id : userName.id}, config.secret,{
        expiresIn : 86400,
    });

    let authorities = [];
    let roles = await userName.getRoles();
    for(let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    res.status(200).send({
        id : userName.id,
        username: userName.userName,
        email : userName.email,
        roles : authorities,
        accessToken : token,
    });
};

module.exports = {
    signup,
    signin
}