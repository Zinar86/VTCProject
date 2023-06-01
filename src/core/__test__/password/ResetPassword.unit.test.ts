import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
import {ResetPassword} from "../../usecase/user/passwords/ResetPassword";
import {User} from "../../domain/entities/User";
import {PasswordGateway} from "../gateways/PasswordGateway";
describe("Unit - GeneratePasswordRecovery", ()=>{
    it("must update the password", async ()=>{
        const userRepo = new InMemoryUserRepository()
        const passwordGateway = new PasswordGateway()
        const resetPassword = new ResetPassword(userRepo, passwordGateway);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty12457AAA896523",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        });
        user.userProperty.securityCode = "abcd"
        console.log("securityCodeBefore====>", user.userProperty.securityCode);
        await userRepo.update(user);
        await resetPassword.execute({
            newPassword : "1AAA23456789grgreg1452",
            id: user.userProperty.id,
            securityCode: user.userProperty.securityCode
        })
        console.log("securityCodeAfter====>", user.userProperty.securityCode);
        expect(user.userProperty.password).toEqual("1AAA23456789grgreg1452")
    })
})