let Categories = require('./../Models/Category')
let Products = require('./../Models/Product')

const validateReqForCategoryName = (req,res,next) =>{
    if(!req.body.name){
        res.status(400).send({
            message : "Category Name is required for DB"
        });
        return;
    }
    next();
}

const validateReqForProductName = (req,res,next) =>{
    if(!req.body.name || !req.body.price || !req.body.CategoryId){
        res.status(400).send({
            message : "One thing is missed Please fill all details "
        });
        return;
    }
    next();
}

const validateReqForCategoryId = async (req, res, next) =>{
    let categoryId = req.params.categoryId;
    if(categoryId){
        let category = await Categories.findByPk(categoryId);
        if(!category){
            res.status(400).send("Category Id doesn't exits");
            return;
        }
        next();
    }else{
        res.status(400).send("Something went wrong from server side !");
        return ;
    }
    // res.end();
}
const validateReqForProductId = async (req, res, next) =>{
    let productId = req.params.productsId;
    if(productId){
        let product = await Products.findByPk(productId);
        if(!product){
            res.status(400).send("Product Id doesn't exits");
            return;
        }
        next();
    }else{
        res.status(400).send("Something went wrong from server side !");
        return ;
    }
    // res.end();
}

module.exports = {
    validateReqForCategoryName,
    validateReqForCategoryId,
    validateReqForProductId,
    validateReqForProductName
};