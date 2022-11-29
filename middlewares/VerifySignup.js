// const User = require("../Models/User");
const db = require('./../Models/index');
const Roles = db.roles;
const User = db.users;
let checkDuplicateUserName = async (req, res, next) => {

    let user = await User.findOne({
        where: {
            username: req.body.username,
        }
    });

    if (user) {
        res.status(400).json({
            message: "User Already Exists!",
        });
        return;
    }
    next();
}

let checkRolesExisted = (req, res, next) => {

    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!Roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i],
                });  
                return;
            }
        }
    }

}

module.exports = {
    checkDuplicateUserName
};