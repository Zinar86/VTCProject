import "./__mocks__/sendGrid.mock";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "../router/user/UserRouter";
import request from "supertest";
import mongoose from "mongoose";
import {User} from "../../core/domain/entities/User";
import {MongodbUserRepository} from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import {Jwt} from "../../adapters/gateways/jwt/JwtGateway";
dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', userRouter);
jest.setTimeout(10000000);
describe("e2e - UserRouter", ()=>{
    let userId: string;
    let token;
    beforeAll(async () =>{
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');
        const user = User.create({
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
        const jwtGateway = new Jwt(process.env.JWT_KEY);
        token = jwtGateway.generate(user);
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
                console.log(response.body)
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
    });
    it("should return a user by is ID", async () => {
        await request(app)
            .get(`/user/${userId}`)
            .set("access_key", token)
            .expect(200)
    })
})