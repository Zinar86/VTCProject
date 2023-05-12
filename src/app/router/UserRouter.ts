import {Request, Response, Router} from "express";
import {MongodbUserRepository} from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import {BcryptPasswordGateway} from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import {SignUp} from "../../core/usecase/SignUp";
import {SignIn} from "../../core/usecase/SignIn";
import {UpdateUser} from "../../core/usecase/UpdateUser";
import {AuthenticatedRequest} from "../config/AuthenticatedRequest";

export const userRouter = Router();

const userRepository = new MongodbUserRepository();
const passwordGateway = new BcryptPasswordGateway();
const signUp = new SignUp(userRepository, passwordGateway);
const signIn = new SignIn(userRepository);
const updateUser = new UpdateUser(userRepository);

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
userRouter.use((req: AuthenticatedRequest, res, next)=>{
    //via token
    req.user =  {
        id: "45",
        email: "fgf"
    }
    return next();
})
userRouter.post('/signin', async (req: Request, res: Response) => {
    const result = await signIn.execute({
        email: req.body.email,
        password: req.body.password
    })
    return res.status(200).send(result);
})
userRouter.post('/update', async (req: AuthenticatedRequest, res: Response) => {
    const result = await updateUser.execute({
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        profilePictures: req.body.profilePictures,
        id: req.user.id,
        email: req.body.email
    })
})