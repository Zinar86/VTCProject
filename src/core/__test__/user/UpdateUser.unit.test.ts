import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {UpdateUser} from "../../usecase/user/UpdateUser";
import {User} from "../../domain/entities/User";

describe("Unit - UpdateUser", () =>{
    it ("doit modifier un user", async () => {
        const userRepo = new InMemoryUserRepository();
        const updateUser = new UpdateUser(userRepo);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await userRepo.update(user);
        await updateUser.execute({
            id: user.userProperty.id,
            firstName: "Marc",
            lastName : "tanguy",
            password : "1234",
            phoneNumber : user.userProperty.phoneNumber,
            profilePictures : user.userProperty.profilePictures,
            securityCode:null
        })
        expect(user.userProperty.password).toEqual("1234")
    })
})