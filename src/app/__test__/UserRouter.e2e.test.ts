import "./__mocks__/sendGrid.mock";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "../router/user/UserRouter";
import request from "supertest";
import mongoose from "mongoose";
import {User} from "../../core/domain/entities/User";
import {MongodbUserRepository} from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import {JwtIdentityGateway} from "../../adapters/gateways/jwt/JwtGateway";
dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', userRouter);
jest.setTimeout(10000000);
describe("e2e - UserRouter", ()=>{
    let userId: string;
    let token: string;
    let user: User;
    let emailSender: string;
    let securityCode: string;
    beforeAll(async () =>{
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');
        user = User.create({
            email: "john@doe.com",
            lastName: "john",
            password: "azerty1234569787AZE",
            firstName: "john",
            phoneNumber: "01245877",
            profilePictures: "www.picture.com"
        })
        const mongoDbUserRepo = new MongodbUserRepository();
        await mongoDbUserRepo.update(user);
        userId = user.userProperty.id;
        const jwtGateway = new JwtIdentityGateway(process.env.JWT_KEY);
        token = jwtGateway.generate(user);
        emailSender = process.env.EMAIL_SENDER;
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });
    it("should signup", async ()=> {
        await request(app)
            .post('/user/signup')
            .send({
                email: "jonh@doe.fr",
                password: "azerty2154",
                firstName: "Jonh",
                lastName: "Doe",
                phoneNumber: "0458652145",
                profilePictures: "www.picture.fr",
            })
            .expect(201)
            .expect(response => {
                console.log("SIGNUP ===>", response.body)
            })
    });
    it ("should signin", async() => {
        await request(app)
            .post('/user/signin')
            .send({
                email: "jonh@doe.fr",
                password: "azerty2154",
            })
            .expect(200)
            .expect(response => {
                console.log("SIGNIN ===>", response.body)
            })
    });
    it("should return a user by is ID", async () => {
        await request(app)
            .get(`/user/${userId}`)
            .set("access_key",token)
            .expect(200)
    })
    it("should update a user", async () => {
        await request(app)
            .put("/user/")
            .set("access_key",token)
            .send({
                password: user.userProperty.password,
                firstName: "Gerard",
                lastName: "Maniak",
                phoneNumber: "03587156",
                profilePictures: "www.picture.com",
                id: userId,
                securityCode: null,
            })
            .expect(200)
            .expect(response => {
                console.log("UPDATE =====>", response.body);
            })
    })
    it("should return a security code for recovery password", async () => {
        await request(app)
            .post("/user/password/recovery")
            .set("access_key",token)
            .send({
                email: "jonh@doe.fr",
                sender: emailSender
            })
            .expect(200)
            .expect(response => {
                console.log("SECURITY CODE =====>", response.body.securityCode);
                securityCode = response.body.securityCode;
            })
    })
    it("should reset the password of a user with a security code", async () => {
        console.log("USER SECURITY CODE===>", user.userProperty.securityCode)
        console.log("SECURITY CODE =====>", securityCode);
        await request(app)
            .post(`/user/password/reset/${userId}`)
            .set("access_key",token)
            .send({
                newPassword: "qsdfgh12364MM",
                securityCode: securityCode
            })
            .expect(200)
            .expect(response => {
                console.log("RESET PASSWORD =====>", response.body);
            })
    })
})