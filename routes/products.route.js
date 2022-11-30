let express = require('express');
let productRouter = express.Router();
let productsController = require('./../controller/product.controller');
let requestValidator = require('./../middlewares/RequestValidator');
let Authjwt = require('./../middlewares/auth.jwt')

productRouter.get('/', productsController.getAllProducts);
productRouter.get('/:productsId',[requestValidator.validateReqForProductId], productsController.getProductById);
productRouter.post("/",[requestValidator.validateReqForProductName], productsController.addNewProduct);
productRouter.delete("/:productsId",[requestValidator.validateReqForProductId], productsController.deleteAproduct);
productRouter.put("/:productsId",[requestValidator.validateReqForProductId,requestValidator.validateReqForProductName], productsController.updateMyProduct);

module.exports = productRouter;