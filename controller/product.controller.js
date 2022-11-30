let db = require('./../Models/index');
let bodyParser = require('body-parser');
let express = require('express');
let expressApp = express()
expressApp.use(bodyParser.json());


let getAllProducts = async (req, res) => {
    let categoryId = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let products = [];

    if (Object.keys(req.query).length == 0) {
        products = await db.product.findAll();
    } else {
        if (categoryId && !(minPrice || maxPrice)) {
            products = await filterByCategory(categoryId);
        } else if (!categoryId && minPrice && maxPrice) {
            products = await filterByPriceRange(minPrice, maxPrice);
        } else {
            products = await db.product.findAll({
                where: {
                    categoryId: categoryId,
                    price: {
                        [db.sequelize.Op.gte]: minPrice,
                        [db.sequelize.Op.lte]: maxPrice,
                    }
                }
            });
        }
    }
    res.status(200).json(products);
    res.end();
}

let filterByCategory = async (categoryId) => {
    let filteredProducts = await db.product.findAll({
        where: {
            categoryId: categoryId,
        },
    });
    return filteredProducts;
};
let filterByPriceRange = async (min, max) => {
    let filterproducts = await db.product.findAll({
        where: {
            price: {
                [db.sequelize.Op.gte]: min,
                [db.sequelize.Op.lte]: max
            }
        }
    });
    return filterproducts;
}


let getProductById = async (req, res) => {

    let id = req.params.productsId;
    if (!id) {
        res.status(400).send("ID not passed");
    }
    let products = await db.product.findAll({
        where: {
            id: id
        }
    });
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(products));
    res.end();
}

let addNewProduct = async (req, res, next) => {
    let productToAdd = req.body;
    try{
        await db.product.create(productToAdd);
        res.status(201).json(productToAdd);
        res.end();
        
    }catch(err){
        res.status(500).json({
            message : "Some internal error occurred"
        });
        return;
    }
}

let deleteAproduct = async (req, res, next) => {
    let id = req.params.productsId;
    await db.product.destroy({
        where: {
            id: id
        }
    })
    res.status(200).send("Prouct Delete ho gaya hai!");
    res.end();
}

let updateMyProduct = async (req, res, next) => {

    if (!req.body.name) {
        res.status(500).send("Name to bhejo phle!");
        res.end();
    }

    let idToUpdate = req.params.productsId;
    let productToUpdate = {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId
    };
    await db.product.update(productToUpdate, {
        where: {
            id: idToUpdate
        }
    });
    let updatedProduct = await db.product.findByPk(idToUpdate);
    res.status(200).send(updatedProduct);
    res.end();

}


module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
    deleteAproduct,
    updateMyProduct,
}