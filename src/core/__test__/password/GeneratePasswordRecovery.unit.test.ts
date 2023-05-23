import {GeneratePasswordRecovery} from "../../usecase/user/passwords/GeneratePasswordRecovery";
import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {User} from "../../domain/entities/User";
import {InMemoryEmailGateway} from "../gateways/InMemoryEmailGateway";
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
    it("Must send a mail with link to reset password", async () => {
        const sendGridEmailGateway = new InMemoryEmailGateway()
        const generatePasswordRecovery = new GeneratePasswordRecovery(userRepository, sendGridEmailGateway);
        await generatePasswordRecovery.execute({
            email: "nostradanar@outlook.com",
            sender: "nostradanar@outlook.com"
        })
        console.log("=====>", user.userProperty.securityCode)
        expect(typeof user.userProperty.securityCode).toEqual("string")
    })
})