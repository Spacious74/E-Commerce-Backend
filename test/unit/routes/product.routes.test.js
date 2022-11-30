const db = require("./../../../Models/index");
const request = require("supertest");
const app = require("./../../../app");


const endpoint = "/products";  

describe("Product routes",()=>{
    test("my get route", async ()=> {
        const res = await request(app)
        .get(endpoint)

        expect(res.statusCode).toEqual(200);
    });

    test("should add new product", async ()=> {
        const res = await request(app)
           .post(endpoint)
           .send({
             "name" : "iPhone20",
             "price" : 1000000,
             "categoryId" : 3
           });
        expect(res.statusCode).toEqual(400);
    });
})