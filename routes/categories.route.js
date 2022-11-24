let express = require('express');
let categoryRouter = express.Router();
let categoryController = require("./../controller/category.controller");
let reqestValidator = require('./../middlewares/RequestValidator');

categoryRouter.get('/', categoryController.getAllCategories);

categoryRouter.get('/:categoryId', [reqestValidator.validateReqForCategoryId], categoryController.getCategoryById);

categoryRouter.post("/", [reqestValidator.validateReqForCategoryName], categoryController.addNewCategory);

categoryRouter.delete("/:categoryId", [reqestValidator.validateReqForCategoryId], categoryController.deleteAcategory);

categoryRouter.put("/:categoryId", [reqestValidator.validateReqForCategoryName], categoryController.updateMyCategory);

module.exports = categoryRouter;