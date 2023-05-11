import {CryptPassword} from "../CryptPassword";

describe("Unit - CryptPassword", ()=>{
    it("doit crypté un mot de passe", async ()=>{
        const cryptPassword = new CryptPassword();
        const password: string = "azerty";
        const passCrypt = cryptPassword.execute(password);
        console.log(passCrypt)
    })
})