
const Products = require('../Models/Product');
let Cart = require('./../Models/Cart');
let Product = require('./../Models/Product');
let db = require('./../Models/index');
let cart = db.cart;
let product = db.product;



let createCart = async (req, res, next) => {
    const cart = {
        cost : 0
    };
    try {
        await Cart.create(cart);
        res.status(200).json({
            message : "Cart Created successfully"
        });
    } catch (err) {
        res.status(401).json({
            message : "Some Internal Server Error occurred"
        });
    }
}
let updateCart = async (req, res, next) => {
    
    const cartId = req.params.cartId;
    let cartToUpdate = await Cart.findByPk(cartId);
    if (cartToUpdate) {
        let productsToAdd = await Products.findAll({
            where : {
                id : req.body.productIds,
            }
        });

        if(productsToAdd){
            await cartToUpdate.setProducts(productsToAdd);
            console.log("Products Added");
            let totalcost = 0;
            let productsSelected = [];
            let products = await cartToUpdate.getProducts();
            for (let i = 0; i < products.length; i++) {
                totalcost = totalcost + products[i].price;
                productsSelected.push({
                    id : products[i].id,
                    name : products[i].name,
                    cost : products[i].price
                });
            }
            res.status(200).json({
                id : cartToUpdate.id,
                productsSelected,
                totalcost,
            });
        }
    } else{
        res.status(404).json({
            "message": "Cart Id does not exist"
        })
        return;
    }

}
let getCart = async (req, res, next) => {
    let cart = await Cart.findByPk(req.params.cartId);
    let totalcost = 0;
    let productsSelected = [];
    let products = await cart.getProducts();
    for (let i = 0; i < products.length; i++) {
        totalcost = totalcost + products[i].cost;
        productsSelected.push({
            id : products[i].id,
            name : products[i].name,
            cost : products[i].price
        });
    }
    res.status(200).json({
        id : cart.id,
        productsSelected,
        totalcost,
    });
}

module.exports = {
    createCart,
    updateCart,
    getCart
}