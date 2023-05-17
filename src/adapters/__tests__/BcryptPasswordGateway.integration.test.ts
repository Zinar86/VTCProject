import {BcryptPasswordGateway} from "../gateways/bcrypt/BcryptPasswordGateway";

describe("Integration - BcryptPasswordGateway", ()=>{
    const passwordGateway = new BcryptPasswordGateway();
    it("doit encrypté une chaine de caractére", async ()=>{
        const password = "azerty";
        const result= await passwordGateway.encrypt(password);
        expect(typeof result).toEqual("string");
    })
    it("doit comparé une chaine de caractére avec un chaine de caractére hashé", async ()=>{
        const password = "azerty";
        const hash= await passwordGateway.encrypt(password);
        const result = await passwordGateway.compare(password,hash);
        expect(result).toEqual(true);
    })
})