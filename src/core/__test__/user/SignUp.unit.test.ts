import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SignUp} from "../../usecase/user/SignUp";
import {GetUserById} from "../../usecase/user/GetUserById";
import {UpdateUser} from "../../usecase/user/UpdateUser";
import {InMemoryPasswordGateway} from "../gateways/InMemoryPasswordGateway";
import {User} from "../../domain/entities/User";

describe ("Unit - SignUp", () => {
    let signUp;
    beforeAll(()=>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        signUp = new SignUp(userRepo, passwordGateway);
    })
    it("doit créé un user", async () =>{
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
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "01",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER");
    })
    it("should return an error if the email not respect synthax of email", async ()=>{
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico",
            password : "fan@rze4122@@rthytjtjtyj687;:!",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("EMAIL_NO_VALID");
    })
})