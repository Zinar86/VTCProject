import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignUp} from "../usecase/SignUp";
import {GetUserById} from "../usecase/GetUserById";
import {User} from "../entities/User";

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
        await userRepo.save(user);
        const userId = user.userProperty.id;
        const userCheck = await getUserById.execute(userId);
        expect(userId).toEqual(userCheck.userProperty.id)
    })
})