import express from "express";
import { userRouter } from "../router/user/UserRouter";
import request from "supertest";

const app = express();

app.use('/user', userRouter);
describe("e2e - UserRouter", ()=>{
    it("should signup", ()=> {
        request(app)
      .post('/users')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    }) 
})