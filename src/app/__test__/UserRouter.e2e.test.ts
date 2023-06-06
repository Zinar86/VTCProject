import "./__mocks__/sendGrid.mock";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "../router/user/UserRouter";
import request from "supertest";
import mongoose from "mongoose";
import {User} from "../../core/domain/entities/User";
import {MongodbUserRepository} from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import {JwtIdentityGateway} from "../../adapters/gateways/jwt/JwtGateway";
import { UserRepository } from "core/domain/repositories/UserRepository";
import { PasswordGateway } from "core/gateways/PasswordGateway";
import { SignUp } from "../../core/usecase/user/SignUp";
import { BcryptPasswordGateway } from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', userRouter);
jest.setTimeout(10000000);
describe("e2e - UserRouter", ()=> {
    let userId: string;
    let token: string;
    let user: User;
    let emailSender: string;
    let mongoDbUserRepo: UserRepository;
    let jwtGateway: JwtIdentityGateway;
    let signUp;
    let passwordGateway: PasswordGateway;
    beforeAll(async () =>{
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');
        await mongoose.connection.dropDatabase();
        mongoDbUserRepo = new MongodbUserRepository();
        passwordGateway = new BcryptPasswordGateway()
        signUp = new SignUp(mongoDbUserRepo, passwordGateway)
        jwtGateway = new JwtIdentityGateway(process.env.JWT_KEY);
        emailSender = process.env.EMAIL_SENDER;
        user = await signUp.execute({
            email: "john@doe.com",
            lastName: "john",
            password: "azerty1234569787AZE",
            firstName: "john",
            phoneNumber: "01245877",
            profilePictures: "www.picture.com",
        })
        user.update({
            securityCode: user.userProperty.securityCode,
            firstName: user.userProperty.firstName,
            lastName: user.userProperty.lastName,
            phoneNumber: user.userProperty.phoneNumber,
            profilePictures: user.userProperty.profilePictures,
        })
        await mongoDbUserRepo.update(user);
        userId = user.userProperty.id;
        token = jwtGateway.generate(user);
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });
    it("should signup", async () => {
        await request(app)
            .post('/user/signup')
            .send({
                email: "gerad@boulard.fr",
                password: "azerty2154",
                firstName: "gerad",
                lastName: "boulard",
                phoneNumber: "0458652145",
                profilePictures: "www.picture.fr",
            })
            .expect(201)
            .expect(response => {
                console.log("SIGNUP ===>",  response.body)
            })
    });
    it ("should signin", async() => {
        await request(app)
            .post('/user/signin')
            .send({
                email: "john@doe.com",
                password: "azerty1234569787AZE",
            })
            .expect(200)
            .expect(response => {
                console.log("SIGNIN ===>",  response.body)
            })
    });
    it("should return a user by is ID", async () => {
        await request(app)
            .get(`/user/${userId}`)
            .set("access_key",token)
            .expect(200)
            .expect(response => {
                console.log("GETBYID =====>",  response.body);
            })
    })
    it("should update a user", async () => {
        await request(app)
            .put("/user/")
            .set("access_key",token)
            .send({
                password: user.userProperty.password,
                firstName: "kouloued",
                lastName: "Maniak",
                phoneNumber: "03587156",
                profilePictures: "www.picture.com",
                id: userId,
                securityCode: user.userProperty.securityCode
            })
            .expect(200)
            .expect(response => {
                console.log("UPDATE =====>",  response.body);
            })
    })
    it("should return a security code for recovery password", async () => {
        await request(app)
            .post("/user/password/recovery")
            .set("access_key", token)
            .send({
                email: "john@doe.com",
                sender: emailSender
            })
            .expect(200)
            .expect(response => {
                console.log("PASSWORD RECOVERY ====>", response.body);
            })      
    })
    it("should reset the password of a user with a security code", async () => {
        user = await mongoDbUserRepo.getById(userId)
        await request(app)
            .post(`/user/password/reset/`)
            .set("access_key",token)
            .send({
                newPassword: "poi8Atyu145241AQSS",
                id: user.userProperty.id,
                securityCode: user.userProperty.securityCode
            })
            .expect(200)
            .expect(response => {
                console.log("RESET PASSWORD =====>", response.body);
            })
    })
})