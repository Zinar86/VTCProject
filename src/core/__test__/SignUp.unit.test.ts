import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignUp} from "../usecase/user/SignUp";
import {GetUserById} from "../usecase/user/GetUserById";
import {UpdateUser} from "../usecase/user/UpdateUser";
import {InMemoryPasswordGateway} from "./gateways/InMemoryPasswordGateway";

describe ("Unit - SignUp", () => {
    it("doit créé un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signUp = new SignUp(userRepo, passwordGateway);
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