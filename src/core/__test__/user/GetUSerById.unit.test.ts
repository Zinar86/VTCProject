import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
import {GetUserById} from "../../usecase/user/GetUserById";
import {User} from "../../domain/entities/User";

describe ("Unit - GetUserById", () => {
    it("doit recupéré un User via l'Id", async () =>{
        const userRepo = new InMemoryUserRepository();
        const getUserById = new GetUserById(userRepo);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await userRepo.update(user);
        const userId = user.userProperty.id;
        const userCheck = await getUserById.execute({
            userId:userId
        });
        expect(userId).toEqual(userCheck.userProperty.id)
    })
})