//import "../__mocks__/bcrypt.mock";
import {InMemoryUserRepository} from "../../../adapters/repositories/inmemory/InMemoryUserRepository";
import {SignIn} from "../../usecase/user/SignIn";
import {User} from "../../domain/entities/User";
import {BcryptPasswordGateway} from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import {UserRepository} from "../../domain/repositories/UserRepository";
import {SignUp} from "../../usecase/user/SignUp";
describe("Unit - SignIn", () =>{
    let user: User;
    let userRepo: UserRepository;
    let signUp;
    let signIn;
    let bcryptPasswordGateway: BcryptPasswordGateway;
    beforeAll(async ()=>{
        userRepo = new InMemoryUserRepository();
        bcryptPasswordGateway = new BcryptPasswordGateway();
        signUp = new SignUp(userRepo, bcryptPasswordGateway);
        signIn = new SignIn(userRepo, bcryptPasswordGateway);
        user = await signUp.execute({
            firstName : "dede",
            lastName : "lolo",
            email : "dede.lolo@conf.fr",
            password : "1235abcdef55",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await userRepo.update(user);
    })
    it("must verify if password is valid",async ()=>{
        const result: User = await signIn.execute({
            email: "dede.lolo@conf.fr",
            password: "1235abcdef55"
        })
        console.log(user)
        expect(result).toEqual(user);
    })
    it("must return an error if the password is invalid", async ()=>{
        const result= signIn.execute({
            email: "dede.lolo@conf.fr",
            password: "123"
        })
        await expect(result).rejects.toThrow("Authentication failed");
    })
})