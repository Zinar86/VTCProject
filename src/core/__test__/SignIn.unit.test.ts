import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignIn} from "../usecase/SignIn";
import {User} from "../entities/User";

describe("Unit - SignIn", () =>{
    it("doit verifier si le mot de passe est valide",async ()=>{
        const userRepo = new InMemoryUserRepository();
        const signIn = new SignIn(userRepo);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        });
        await userRepo.save(user);
        const result = await signIn.execute({
            email: "az@er.fr",
            password: "azerty"
        })
        expect(result).toEqual(true);
    })
})