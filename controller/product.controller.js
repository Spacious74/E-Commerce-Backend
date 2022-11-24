let Products = require('./../Models/Product');
let sequelizeInstance = require('./../config/db.config');
let bodyParser = require('body-parser');
let express = require('express');
const { Sequelize} = require('sequelize');
let expressApp = express()
expressApp.use(bodyParser.json());


let getAllProducts = async (req, res) => {
    let categoryId = req.query.CategoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let products = [];

    if (Object.keys(req.query).length == 0) {
        products = await Products.findAll();
    } else {
        if (categoryId && !(minPrice || maxPrice)) {
            products = await filterByCategory(categoryId);
        } else if (!categoryId && minPrice && maxPrice) {
            products = await filterByPriceRange(minPrice, maxPrice);
        } else {
            products = await Products.findAll({
                where: {
                    categoryId: categoryId,
                    price: {
                        [Sequelize.Op.gte]: minPrice,
                        [Sequelize.Op.lte]: maxPrice,
                    }
                }
            });
        }
    }
    res.status(200).json(products);
    res.end();
}

let filterByCategory = async (categoryId) => {
    let filteredProducts = await Products.findAll({
        where: {
            categoryId: categoryId,
        },
    });
    return filteredProducts;
};
let filterByPriceRange = async (min, max) => {
    let filterproducts = await Products.findAll({
        where: {
            price: {
                [Sequelize.Op.gte]: min,
                [Sequelize.Op.lte]: max
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
    let products = await Products.findAll({
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
    nameToAdd = req.body.name;
    priceToAdd = req.body.price;
    categoryIdToAdd = req.body.categoryId;
    await Products.create({
        name: nameToAdd,
        price: priceToAdd,
        categoryId: categoryIdToAdd
    })
    res.status(201).send("New Prouct add ho gaya hai !");
    res.end();
}

let deleteAproduct = async (req, res, next) => {
    let id = req.params.productsId;
    await Products.destroy({
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
    await Products.update(productToUpdate, {
        where: {
            id: idToUpdate
        }
    });
    let updatedProduct = await Products.findByPk(idToUpdate);
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