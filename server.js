let express = require("express");
let expressApp = express();
let bodyParser = require('body-parser');
let serverConfig = require("./config/server.config");   
let router = require("./routes/index");
let ErrorHandler = require('./middlewares/ErrorHandler');
let sequelizeInstance = require('./config/db.config');
// Models
let Category = require('./Models/Category');
let Products = require('./Models/Product');
let Roles  = require("./Models/Roles");

expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

Category.hasMany(Products);

let init = async () =>{
    await sequelizeInstance.sync({force : true});
    insertCategories();
    insertProducts();
    insertRoles();
};

let insertCategories = async () => {
    await Category.bulkCreate(
        [
            {
                name: "Mobiles",
                
            },
            {
                name: "Fashion",
                
            },
            {
                name: "Gadgets",
                
            },
            {
                name: "Appliances",
                
            }
        ]
    );
};
let insertProducts = async() => {
    await Products.bulkCreate(
        [{
                name: "Samsung Galaxy Note",
                price: 18000,
                CategoryId : 1
            },
            {
                name: "Iphone 13",
                price: 60000,
                CategoryId : 1
            },
            {
                name: "Sony bravia",
                price: 40000,
                CategoryId : 2
            },
            {
                name: "Boat Rugged",
                price: 4000,
                CategoryId : 3
            },
            {
                name: "JBL Storm",
                price: 9000,
                CategoryId : 3
            },
            {
                name: "Vu 5",
                price: 32000,
                CategoryId : 2
            }
        ]
    );
}
let insertRoles = async () => {
    await Roles.bulkCreate([
        {
            id: 1,
            name : "user",
        },
        {
            id : 2,
            name : "admin",
        }
    ]);
};



expressApp.listen(serverConfig.PORT, () => {
    console.log("Server is running at Port " + serverConfig.PORT);
    init();
});