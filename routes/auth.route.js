let controller = require('./../controller/auth.controller')
let express = require('express');
let expressApp = express();
let router = express.Router();
let validator = require('./../middlewares/VerifySignup')

expressApp.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup",[validator.checkDuplicateUserName], controller.signup);
router.post("/signin", controller.signin);

module.exports = router;