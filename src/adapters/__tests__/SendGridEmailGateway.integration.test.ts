import {SendGridEmailGateway} from "../gateways/sendgrid/SendGridEmailGateway";
describe('Integration - Sendgrid', ()=>{

    it("must return a statusCode 200 after an email is sent", async ()=>{
        const sendGridEmailGateway = new SendGridEmailGateway();
        const result = sendGridEmailGateway.send({
            from: "nostradanar@outlook.com",
            to: "nostradanar@outlook.com",
            subject: "test",
            text: "some text",
            html: "some html"
        })
        await expect(result).resolves.not.toThrow()
    })
})