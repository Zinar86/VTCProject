import {SendGridEmailGateway} from "../gateways/sendgrid/SendGridEmailGateway";
import {Msg} from "../../core/domain/ValueObject/Msg";
jest.mock("@sendgrid/mail", ()=>{
    return {
        send: jest.fn().mockImplementation((msg: Msg)=>{
            if (msg.from === "nostrok.com"){
                throw new Error("NOT_GOOD")
            }
        }),
        setApiKey: jest.fn().mockImplementation()
    }
});
describe('Integration - Sendgrid', ()=>{

    it("should send a email", async ()=>{
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
    it("should not send a email", async ()=>{
        const sendGridEmailGateway = new SendGridEmailGateway();
        const result = sendGridEmailGateway.send({
            from: "nostrok.com",
            to: "noscom",
            subject: "test",
            text: "some text",
            html: "some html"
        })
        await expect(result).rejects.toThrow()
    })
})