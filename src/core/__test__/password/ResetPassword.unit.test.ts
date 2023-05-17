import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {ResetPassword} from "../../usecase/user/passwords/ResetPassword";
import {User} from "../../entities/User";

describe("Unit - GeneratePasswordRecovery", ()=>{
    it("must update the password", async ()=>{
        const userRepo = new InMemoryUserRepository()
        const resetPassword = new ResetPassword(userRepo);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        });
        await userRepo.save(user);
        await resetPassword.execute({
            newPassword : "1234",
            id: user.userProperty.id
        })
        expect(user.userProperty.password).toEqual("1234")
    })
})