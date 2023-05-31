import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SignUp} from "../../usecase/user/SignUp";
import {PasswordGateway} from "../gateways/PasswordGateway";
import {User} from "../../domain/entities/User";

describe ("Unit - SignUp", () => {
    let signUp: SignUp;
    beforeAll(()=>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new PasswordGateway();
        signUp = new SignUp(userRepo, passwordGateway);
    })
    it("doit créé un user", async () =>{
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "@!:abcdefgh@@%",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
        expect(user.userProperty.password).toEqual("@!:abcdefgh@@%")
    })
    it("should return an error if the password is not contain special character", async () =>{
        const user: Promise<User> = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "0123456789",
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
            password : "@!:abcdefgh@@%",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("EMAIL_NO_VALID");
    })
    it("should return an error if the password contain under 8 character", async ()=>{
        const user = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico",
            password : "@!:",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("PASSWORD_MUST_CONTAIN_8_CHARACTER_MINIMUM");
    })
})