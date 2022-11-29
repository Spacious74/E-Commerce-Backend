let sum = require('./../../myapp/sum');
let square = require('./../../myapp/square');

describe("My false test suite", ()=>{
    test('--- Sum method ---', ()=>{
        expect(sum(2,3)).toBe(5);
        expect(sum(-2,-3)).toBe(-5);
        expect(sum()).toBe(0);
        expect(sum("hello","this")).toBe("Please enter numbers");
    });
    test('---Square method---', ()=>{
        expect(square(2)).toBe(4);
        expect(square(0)).toBe(0);
        expect(square(-5)).toBe(25);
        expect(square()).toBe("Please enter numbers");
        expect(square(Infinity)).toBe(Infinity);
        expect(square(2,9)).toBe(4);
        
    })
})