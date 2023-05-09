import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignUp} from "../usecase/SignUp";
import {GetUserById} from "../usecase/GetUserById";

describe ("Unit - CreateUser", () => {
    it("doit créé un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastname : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await userRepo.save(user);
        expect(user.userProperty.firstName).toEqual("Nico")
    })
    it ("doit recupéré un user via l'Id", async ()=>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const getUserById = new GetUserById(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastname : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await userRepo.save(user);
        const id = user.userProperty.id;
        const userCheck = await getUserById.execute(id)
        expect(userCheck.userProperty.email).toEqual("nico@heuttt.fr")
    })
})