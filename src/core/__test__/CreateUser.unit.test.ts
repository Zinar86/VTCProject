import {InMemoryUserRepository} from "./repository/InMemoryUserRepository";
import {SignUp} from "../usecase/SignUp";
import {GetUserById} from "../usecase/GetUserById";
import {UpdateUser} from "../usecase/UpdateUser";

describe ("Unit - CreateUser", () => {
    it("doit créé un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        expect(user.userProperty.firstName).toEqual("Nico")
    })
    it ("doit recupéré un user via l'Id", async ()=>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const getUserById = new GetUserById(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        const id = user.userProperty.id;
        const userCheck = await getUserById.execute(id)
        expect(userCheck.userProperty.email).toEqual("nico@heuttt.fr")
    })
    it ("doit modifier un user", async () =>{
        const userRepo = new InMemoryUserRepository();
        const signUp = new SignUp(userRepo);
        const updateUser = new UpdateUser(userRepo);
        const user = await signUp.execute({
            firstName : "Nico",
            lastName : "Heeut",
            email : "nico@heuttt.fr",
            password : "azerty",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        await updateUser.execute({
            id: user.userProperty.id,
            firstName: "Marc",
            lastName : "tanguy",
            email :user.userProperty.email,
            password : "1234",
            phoneNumber : user.userProperty.phoneNumber,
            profilePictures : user.userProperty.profilePictures,
        })
        expect(user.userProperty.password).toEqual("1234")
    })
})