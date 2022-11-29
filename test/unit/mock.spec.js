let calculateEmailSends = (n,sendEmails) => {
    let totalEmailsSend = 0;
    for(let i = 0; i<n ; i++){
        sendEmails();
        totalEmailsSend++;
    }
    return totalEmailsSend;
};

describe("Mock Functions", ()=>{

    
    let sendEmails = jest.fn();

    test("first mock example", ()=>{
        expect(calculateEmailSends(5,sendEmails)).toBe(5);
    })
})
