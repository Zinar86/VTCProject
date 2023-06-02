import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
import {SignUp} from "../../usecase/user/SignUp";
import {User} from "../../domain/entities/User";
import {BcryptPasswordGateway} from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {PasswordGateway} from "../gateways/PasswordGateway";

describe ("Unit - SignUp", () => {
    let signUp: SignUp;
    let userRepo: UserRepository;
    let passwordGateway: PasswordGateway;
    beforeAll(()=>{
        userRepo = new InMemoryUserRepository();
        passwordGateway = new BcryptPasswordGateway();
        signUp = new SignUp(userRepo, passwordGateway);
    })
    it("Should create a user", async () =>{
        const user = await signUp.execute({
            firstName : "John",
            lastName : "Doe",
            email : "john@doe.fr",
            password : "1235abcdef55",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        await userRepo.update(user)
        expect(user.userProperty.firstName).toEqual("John")
    })
    it("should return an error if the password does not contain Minimum eight characters, at least one letter and one number", async () =>{
        const user: Promise<User> = signUp.execute({
            firstName : "John",
            lastName : "Doe",
            email : "john@doe.fr",
            password : "1",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("Minimum eight characters, at least one letter and one number");
    })
    it("should return an error if the email not respect synthax of email", async ()=>{
        const user = signUp.execute({
            firstName : "John",
            lastName : "Doe",
            email : "j",
            password : "1235abcdef55",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        await expect(user).rejects.toThrow("EMAIL_NO_VALID");
    })
    it ("Should hash the password after user input",  async () => {
        const user = await signUp.execute({
            firstName : "John",
            lastName : "Doe",
            email : "john@doe.fr",
            password : "1235abcdef55",
            phoneNumber : "02314587450124578657",
            profilePictures : "www.picture.com"
        })
        console.log(user.userProperty.password)
    })
})