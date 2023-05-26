import {BcryptPasswordGateway} from "../gateways/bcrypt/BcryptPasswordGateway";
import {genSaltSync} from "bcrypt";
jest.mock("bcrypt", ()=>{
    return {
        genSaltSync: jest.fn().mockImplementation(()=>{
            return "123457889"
        }),
        compareSync: jest.fn().mockImplementation(()=>{
            return true
        }),
        hashSync: jest.fn().mockImplementation( ()=>{
            return "azerty"
        })
    }
});
describe("Integration - BcryptPasswordGateway", ()=>{
    const passwordGateway = new BcryptPasswordGateway();
    it("should encrypt a string", async ()=>{
        const password = "azerty";
        const result= await passwordGateway.encrypt(password);
        expect(typeof result).toEqual("string");
    })
    it("must compare a string with a password hash", async ()=>{
        const password = "azerty";
        const hash= await passwordGateway.encrypt(password);
        const result = await passwordGateway.compare(password,hash);
        expect(result).toEqual(true);
    })
})