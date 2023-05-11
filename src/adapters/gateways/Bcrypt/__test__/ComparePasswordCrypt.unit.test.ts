import { genSaltSync, hashSync } from 'bcrypt';
import {ComparePasswordCryptPassword} from "../ComparePasswordCrypt";
describe("Unit - CryptPassword", ()=>{
    it("doit crypté un mot de passe", async ()=>{
        const comparePasswordCrypt = new ComparePasswordCryptPassword()
        const password: string = "azerty";
        const passHash = hashSync(password, 10);
        const result = comparePasswordCrypt.execute(password,passHash);
        expect(result).toEqual(true)
    })
})