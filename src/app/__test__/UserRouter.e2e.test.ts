import "./__mocks__/sendGrid.mock";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "../router/user/UserRouter";
import request from "supertest";
import mongoose, {connection} from "mongoose";
dotenv.config();
const app = express();
app.use(express.json());
app.use('/user', userRouter);
jest.setTimeout(10000000);
mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');

describe("e2e - UserRouter", ()=>{
    afterAll(async () => {
        await connection.dropDatabase();
    });
    it("should signup", async ()=> {
        await request(app)
            .post('/user/signup')
            .send({
                email: "jonh@doe.fr",
                password: "@!:abcdefgh@@%",
                firstName: "Jonh",
                lastName: "Doe",
                phoneNumber: "0458652145",
                profilePictures: "www.picture.fr",
            })
            .expect(201)
    })
})