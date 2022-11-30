const {mockRequest,mockResponse} = require("./../interceptor");
const db = require("./../../../Models/index");
const productController = require("./../../../controller/product.controller");

describe("Product Controller", () =>{
    let req,res;
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
    });
    let testPayload = {
        name: "Samsung Galaxy Note",
        CategoryId : 1,
        price: 18000
    };

    test("it should test the create method with payload", async () =>{
        const spy = jest.spyOn(db.product, "create").mockImplementation(
            (testPayload) => 
                new Promise ((resolve, reject) => {
                    resolve(testPayload);
                })
        );
        req.body = testPayload;
        await productController.addNewProduct(req,res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201); 
        expect(res.json).toHaveBeenCalledWith(testPayload);
    });
});