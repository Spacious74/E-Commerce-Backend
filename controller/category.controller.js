let Categories = require('./../Models/Category');
let sequelizeInstance = require('./../config/db.config');
let bodyParser = require('body-parser');
let express = require('express');
let expressApp = express();
expressApp.use(bodyParser.json());


let getAllCategories = async (req, res) => {
   let cate = await Categories.findAll();
   res.status(200).json(cate);
   res.end();
};

let getCategoryById = async (req, res, next) => {
   let id = req.params.categoryId;
   let categories = await Categories.findAll({
        where : {
            id : id
        },
   });
   res.status(200).json(categories);
   res.end();
};

let addNewCategory = async (req, res, next) => {
    let categoryToAdd = req.body.name;
    await Categories.create({
        name: categoryToAdd
    })
    res.status(201).send("New Category added successfully");
    res.end();
}

let deleteAcategory = async (req, res, next) =>{
    let id = req.params.categoryId;
    await Categories.destroy({
        where : {
            id: id
        }
    })
    res.status(200).send("Category Deleted Successfully ")
    res.end();
}

let updateMyCategory = async (req,res,next) => {

    let idToUpdate = req.params.categoryId;
    let categoryToUpdate = {
        name : req.body.name
    };
    await Categories.update(categoryToUpdate,{
        where : {
            id : idToUpdate
        }
    });
    let updatedCategory = await Categories.findByPk(idToUpdate);
    res.status(200).send(updatedCategory);
    res.end();
}


module.exports = {
    getAllCategories,
    getCategoryById,
    addNewCategory,
    deleteAcategory,
    updateMyCategory
}