import {Request, Response, Router} from "express";
import {MongodbUserRepository} from "../../adapters/repositories/mongodb/MongodbUserRepositories";
import {BcryptPasswordGateway} from "../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import {SignUp} from "../../core/usecase/user/SignUp";
import {SignIn} from "../../core/usecase/user/SignIn";
import {UpdateUser} from "../../core/usecase/user/UpdateUser";
import {AuthenticatedRequest} from "../config/AuthenticatedRequest";
import {SendGridEmailGateway} from "../../adapters/gateways/sendgrid/SendGridEmailGateway";
import dotenv from 'dotenv'
dotenv.config();
const emailSender = process.env.EMAIL_SENDER;
export const userRouter = Router();

const userRepository = new MongodbUserRepository();
const passwordGateway = new BcryptPasswordGateway();
const signUp = new SignUp(userRepository, passwordGateway);
const signIn = new SignIn(userRepository,passwordGateway);
const updateUser = new UpdateUser(userRepository);
const sendGridEmailGateway = new SendGridEmailGateway();
userRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const user = await signUp.execute({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            profilePictures: req.body.profilePictures,
        });
        await sendGridEmailGateway.send({
            from: emailSender,
            to: user.userProperty.email,
            subject: "Welcome to the next generation",
            text: "Hello ...",
            html: "<strong>VTC_PROJECT</strong>"
        })
        return res.status(201).send(user);
    }
    catch (error){
        return res.status(401).send(error)
    }
})
userRouter.use((req: AuthenticatedRequest, res, next)=>{
    //via token
    req.user =  {
        id: "bb26d3ba-f677-4ac8-9384-701ae9dc5b61",
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
userRouter.put('/update', async (req: AuthenticatedRequest, res: Response) => {
    await updateUser.execute({
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        profilePictures: req.body.profilePictures,
        id: req.user.id,
    })
    return res.status(200).send("user_update");
})
userRouter.get('/getbyid', async (req: Request, res: Response)=>{
    const user = await userRepository.getById(req.body.id);
    if(!user){
        throw new Error("USER_NOT_FOUND")
    }
    return res.status(200).send(user);
})