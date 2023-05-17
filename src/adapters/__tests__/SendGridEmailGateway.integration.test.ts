import {SendGridEmailGateway} from "../gateways/sendgrid/SendGridEmailGateway";
describe('Integration - Sendgrid', ()=>{
    it("must return a statusCode 200 after an email is sent", async ()=>{
        const sendGridEmailGateway = new SendGridEmailGateway();
        const result = await sendGridEmailGateway.send({
            from: "nostradanar@outlook.com",
            to: "nostradanar@outlook.com",
            subject: "test",
            text: "du text",
            html: "du html"
        })
        console.log(result)
        expect(result[0].statusCode).toEqual(201);
    })
})