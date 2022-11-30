
const {mockRequest,mockResponse} = require("./../interceptor");
const db = require("./../../../Models/index");
let categoryController = require("./../../../controller/category.controller");

describe("Category Controller", ()=>{
    let req,res;
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
    });

    let allCategories = [
        {
        id : 1,
        name : "Watches"
        },
        {
        id : 2,
        name : "Books"
        }
    ];
    
    test("the Get All Categories method", async () => {
        const spy = jest.spyOn(db.categories, "findAll").mockImplementation(()=>
            new Promise((resolve, reject) => {
                resolve(allCategories);
            })
        );
        await categoryController.getAllCategories(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(allCategories);
    });

    test("should test the error for getAllCategories", async()=>{
        const spy = jest.spyOn(db.categories, "findAll").mockImplementation(()=>
            new Promise((resolve, reject) => {
                reject({
                    message : "Some internal error occured"
                });
            })
        );
        await categoryController.getAllCategories(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({"message" : "Some internal error occured"});
    });

    let singleCategory = {
        id : 1,
        name : "Watches"
    }
    test("test the getCategoryById method", async () => {
        const spy = jest.spyOn(db.categories, "findOne").mockImplementation(()=>{
            return new Promise((resolve, reject) => {
                resolve(singleCategory);
            });
        });
        req.params.categoryId = 1;
        await categoryController.getCategoryById(req, res);

        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(singleCategory);
    });

})

