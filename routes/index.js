let express = require('express');
let path = require('path');

// Route files
let categoryRoute = require('./categories.route')
let productRoute = require('./products.route')
let authRoute = require('./auth.route');
let cartRoute = require('./cart.route');

let router= express.Router();

router.get('/', (req, res) =>{
    res.write("I am the home route");
    res.end();
});


// base route for categories
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/cart", cartRoute);

module.exports = router;

