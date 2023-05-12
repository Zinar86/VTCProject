import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignUp} from "../usecase/SignUp";
import {GetUserById} from "../usecase/GetUserById";
import {UpdateUser} from "../usecase/UpdateUser";

describe ("Unit - CreateUser", () => {
    it("doit créé un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
    })
})