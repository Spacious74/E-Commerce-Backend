let express = require("express");
let expressApp = express();
let bodyParser = require('body-parser');
let serverConfig = require("./config/server.config");   
let router = require("./routes/index");
let ErrorHandler = require('./middlewares/ErrorHandler');

// Models
const db = require('./Models/index'); // all models are in one file 

expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

db.categories.hasMany(db.product);

let init = async () =>{
    await db.sequelizeInstance.sync({force : true});
    insertCategories();
    insertProducts();
    insertRoles();
};

let insertCategories = async () => {
    await db.categories.bulkCreate(
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
    await db.product.bulkCreate(
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
    await db.roles.bulkCreate([
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