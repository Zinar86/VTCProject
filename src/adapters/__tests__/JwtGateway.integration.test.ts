import {User} from "../../core/domain/entities/User";
import {JwtIdentityGateway} from "../gateways/jwt/JwtGateway";

jest.mock("jsonwebtoken", ()=>{
    return {
        sign: jest.fn().mockImplementation(()=>{
            return "aaaa"
        }),
        verify: jest.fn().mockImplementation( ()=>{
            return {firstName : "John",
                lastName : "dooo",
                email : "johndo@outlook.com",
                password : "@!:arafezfe,:;!",
                phoneNumber : "0231458745",
                profilePictures : "www.picture.com"}
        })
    }
});

describe("Integration - JwtGateway", () =>{
    let user: User;
    let jwt : JwtIdentityGateway;
    beforeAll(()=>{
        user = User.create({
            firstName : "John",
            lastName : "dooo",
            email : "johndo@outlook.com",
            password : "@!:arafezfe,:;!",
            phoneNumber : "0231458745",
            profilePictures : "www.picture.com"
        })
        jwt = new JwtIdentityGateway("azerty123045");
    })
    it("should generate jwt token", async () =>{
        const token = jwt.generate(user)
        expect(typeof token).toEqual("string")
    })
    it("should decoded a token", async ()=>{
        const token = jwt.generate(user);
        const result = jwt.decoded(token);
        expect(result.email).toEqual(user.userProperty.email);
    })
})
