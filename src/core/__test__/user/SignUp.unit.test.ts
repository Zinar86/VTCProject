import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SignUp} from "../../usecase/user/SignUp";
import {GetUserById} from "../../usecase/user/GetUserById";
import {UpdateUser} from "../../usecase/user/UpdateUser";
import {InMemoryPasswordGateway} from "../gateways/InMemoryPasswordGateway";
import {User} from "../../entities/User";

describe ("Unit - SignUp", () => {
    it("doit créé un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signUp = new SignUp(userRepo, passwordGateway);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "fan@rze4122@@rthytjtjtyj687;:!",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
    })
    it("should return an error if the password is too small", async () =>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signUp = new SignUp(userRepo, passwordGateway);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "01",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        expect(user).toThrow("the password must be greater than eight characters");
    })
    it("should return an error if the email not respect synthax of email", async ()=>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signUp = new SignUp(userRepo, passwordGateway);
        const user = await User.create({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nir",
            password : "01",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        expect(user).toThrow("EMAIL_NO_VALID");
    })
})