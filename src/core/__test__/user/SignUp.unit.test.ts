import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SignUp} from "../../usecase/user/SignUp";
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
            password : "@!:",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
        expect(user.userProperty.password).toEqual("@!:")
    })
    it("should return an error if the password is not contain special character", async () =>{
        const user: User = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "01",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("PASSWORD_MUST_CONTAIN_3_SPECIAL_CHARACTER");
    })
    it("should return an error if the email not respect synthax of email", async ()=>{
        const user = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico",
            password : "@!:",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow(Error);
    })
})