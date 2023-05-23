import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SignIn} from "../../usecase/user/SignIn";
import {User} from "../../domain/entities/User";
import {InMemoryPasswordGateway} from "../gateways/InMemoryPasswordGateway";

describe("Unit - SignIn", () =>{
    it("must verify if password is valid",async ()=>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signIn = new SignIn(userRepo, passwordGateway);
        const user = await User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        });
        await userRepo.update(user);
        const result = await signIn.execute({
            email: "az@er.fr",
            password: "azerty"
        })
        expect(result).toEqual(user);
    })
    it("must return an error if the password is invalid", async ()=>{
        const userRepo = new InMemoryUserRepository();
        const passwordGateway = new InMemoryPasswordGateway();
        const signIn = new SignIn(userRepo, passwordGateway);
        const user: User = User.create({
            firstName : "dede",
            lastName : "lolo",
            email : "az@er.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        });
        await userRepo.update(user);
        const result= signIn.execute({
            email: "az@er.fr",
            password: "123"
        })
        await expect(result).rejects.toThrow("Authentication failed");
    })
})