let express = require('express');
let expressApp = express();
let cartRouter = express.Router();
let cartController = require('./../controller/cart.controller');
let authJwt = require('./../middlewares/auth.jwt');

cartRouter.post("/",[authJwt.VerifyToken], cartController.createCart);
cartRouter.put("/:cartId",[authJwt.VerifyToken], cartController.updateCart);
cartRouter.get("/:cartId",[authJwt.VerifyToken], cartController.getCart);


module.exports = cartRouter;