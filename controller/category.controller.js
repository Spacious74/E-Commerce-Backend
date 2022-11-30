let db = require('./../Models/index');



let getAllCategories = async (req, res) => {
    try {
        let categories = await db.categories.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({
            message: "Some internal error occured",
        });
    }
};

let getCategoryById = async (req, res, next) => {
    let id = req.params.categoryId;
    let categories = await db.categories.findOne({
        where: {
            id: id
        },
    });
    res.status(200).json(categories);
    res.end();
};

let addNewCategory = async (req, res, next) => {
    let categoryToAdd = req.body.name;
    await db.categories.create({
        name: categoryToAdd
    })
    res.status(201).send("New Category added successfully");
    res.end();
}

let deleteAcategory = async (req, res, next) => {
    let id = req.params.categoryId;
    await db.categories.destroy({
        where: {
            id: id
        }
    })
    res.status(200).send("Category Deleted Successfully ")
    res.end();
}

let updateMyCategory = async (req, res, next) => {

    let idToUpdate = req.params.categoryId;
    let categoryToUpdate = {
        name: req.body.name
    };
    await db.categories.update(categoryToUpdate, {
        where: {
            id: idToUpdate
        }
    });
    let updatedCategory = await db.categories.findByPk(idToUpdate);
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