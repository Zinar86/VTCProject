import {GeneratePasswordRecovery} from "../../usecase/user/passwords/GeneratePasswordRecovery";
import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
import {User} from "../../domain/entities/User";
import {Msg} from "../../domain/ValueObject/Msg";
import {EmailGateway} from "../gateways/EmailGateway";
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
describe("Unit - GeneratePasswordRecovery", () => {
    let user;
    let userRepository;
    beforeAll(()=>{
        userRepository = new InMemoryUserRepository();
        user = User.create({
            firstName : "John",
            lastName : "dooo",
            email : "nostradanar@outlook.com",
            password : "@!:arafezfe,:;!",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        userRepository.update(user);
    })
    it("Must generate a security code", async () => {
        const sendGridEmailGateway = new EmailGateway()
        const generatePasswordRecovery = new GeneratePasswordRecovery(userRepository, sendGridEmailGateway);
        const securityCode = await generatePasswordRecovery.execute({
            email: "nostradanar@outlook.com",
            sender: "nostradanar@outlook.com"
        })
        console.log("securityCode=====>", securityCode)
        expect(typeof securityCode).toEqual("string")
    })
})