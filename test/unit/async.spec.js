
let promiseFunc = () => {
    return new Promise((resolve,reject)=>{
        resolve("I am a promise");
    });
};

xdescribe('Async JS', ()=>{
    test("Test Your Promise", ()=>{
        promiseFunc().then((data)=>{
            expect(data).toBe("I am a promise");
        }).catch((err)=>{
            expect(err).toBe("I was rejected");
        });
    });

    test("test your aync/await", async ()=>{
        let output = await promiseFunc();
        expect(output).toBe("I am a promise");
    });
});