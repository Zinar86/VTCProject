import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
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
            password : "1235abcdef55",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
        expect(user.userProperty.password).toEqual("1235abcdef55")
    })
    it("should return an error if the password is not contain Minimum eight characters, at least one letter and one number", async () =>{
        const user: Promise<User> = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "0123456789",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("Minimum eight characters, at least one letter and one number");
    })
    it("should return an error if the email not respect synthax of email", async ()=>{
        const user = signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico",
            password : "1235abcdef55",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("EMAIL_NO_VALID");
    })
})