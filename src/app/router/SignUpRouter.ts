import { MongodbUserRepository } from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import { SignUp } from "../../core/usecase/SignUp";
import { Request, Response, Router } from "express";


const userRouter = Router();

const userRepository = new MongodbUserRepository();

const signUp = new SignUp(userRepository);

userRouter.post('/signup', async (req: Request, res: Response) => {
    const result = await signUp.execute({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        profilePictures: req.body.profilePictures,
    });
    return res.status(201).send(result);
})

export {userRouter};