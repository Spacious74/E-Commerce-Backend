let Orders = require('./../Models/Orders');
let sequelizeInstance = require('./../config/db.config');
let bodyParser = require('body-parser');
let express = require('express');
const { Sequelize } = require('sequelize');
let expressApp = express()
expressApp.use(bodyParser.json());

// async function createTable() {
//     await sequelizeInstance.sync({
//         force: true
//     });
//     console.log("Orders table created successfully"); 
// }

async function orderOrders() {
    await Orders.bulkCreate(
        [{
                name: "Samsung Galaxy Note",
                categoryId: 1,
                price: 18000
            },
            {
                name: "Iphone 13",
                categoryId: 1,
                price: 60000
            },
            {
                name: "Sony bravia",
                categoryId: 2,
                price: 40000
            },
            {
                name: "Boat Rugged",
                categoryId: 4,
                price: 4000
            },
            {
                name: "JBL Storm",
                categoryId: 3,
                price: 9000
            },
            {
                name: "Vu 5",
                categoryId: 3,
                price: 32000
            }
        ]
    );
}

// createTable();
// insertOrders();

let getAllOrders = async (req, res) => {
    let categoryId = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let orders = [];
    
    if(Object.keys(req.query).length == 0){
        Orders = await Orders.findAll();
    } else {
        if(categoryId && !(minPrice || maxPrice)){
            Orders = await filterByCategory(categoryId);
        }else if(!categoryId && minPrice && maxPrice){
            Orders = await filterByPriceRange(minPrice, maxPrice);
        } else {
            Orders = await Orders.findAll({
                where : {
                    categoryId : categoryId,
                    price : {
                        [Sequelize.Op.gte] : minPrice,
                        [Sequelize.Op.lte] : maxPrice,
                    }
                }
            });
        }
    }
    res.status(200).json(Orders);
    res.end();
}

let filterByCategory = async (categoryId) =>{
    let filteredOrders = await Orders.findAll({
        where: {
            categoryId: categoryId,
        },
    });
    return filteredOrders;
};
let filterByPriceRange = async (min, max) => {
    let filterOrders = await Orders.findAll({
        where : {
            price : {
                [Sequelize.Op.gte] : min,
                [Sequelize.Op.lte] : max
            }
        }
    });
    return filterOrders;
}


let getProductById = async (req, res) => {

    let id = req.params.OrdersId;
    if (!id) {
        res.status(400).send("ID not passed");
    }
    let Orders = await Orders.findAll({
        where: {
            id: id
        }
    });
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(Orders));
    res.end();
}

let addNewProduct = async (req, res, next) => {
    nameToAdd = req.body.name;
    priceToAdd = req.body.price;
    categoryIdToAdd = req.body.categoryId;
    await Orders.create({
        name: nameToAdd,
        price: priceToAdd,
        categoryId: categoryIdToAdd
    })
    res.status(201).send("New Prouct add ho gaya hai !");
    res.end();
}

let deleteAproduct = async (req, res, next) => {
    let id = req.params.OrdersId;
    await Orders.destroy({
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

    let idToUpdate = req.params.OrdersId;
    let productToUpdate = {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId
    };
    await Orders.update(productToUpdate, {
        where: {
            id: idToUpdate
        }
    });
    let updatedProduct = await Orders.findByPk(idToUpdate);
    res.status(200).send(updatedProduct);
    res.end();

}


module.exports = {
    getAllOrders,
    getProductById,
    addNewProduct,
    deleteAproduct,
    updateMyProduct,
    insertOrders
}