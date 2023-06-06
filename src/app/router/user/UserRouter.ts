import {Request, Response, Router} from "express";
import * as dotenv from 'dotenv';
import {MongodbUserRepository} from "../../../adapters/repositories/mongodb/MongodbUserRepositories";
import {BcryptPasswordGateway} from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import {SignUp} from "../../../core/usecase/user/SignUp";
import {SignIn} from "../../../core/usecase/user/SignIn";
import {UpdateUser} from "../../../core/usecase/user/UpdateUser";
import {AuthenticatedRequest} from "../../config/AuthenticatedRequest";
import {SendGridEmailGateway} from "../../../adapters/gateways/sendgrid/SendGridEmailGateway";
import {GeneratePasswordRecovery} from "../../../core/usecase/user/passwords/GeneratePasswordRecovery";
import {JwtIdentityGateway} from "../../../adapters/gateways/jwt/JwtGateway";
import {UserApiResponseMapper} from "./mappers/UserApiResponseMapper";
import {ResetPassword} from "../../../core/usecase/user/passwords/ResetPassword";
import {authenticationMiddleware} from "./authentificatedRequestMiddleware";

dotenv.config();
const emailSender = process.env.EMAIL_SENDER;
export const userRouter = Router();

const userRepository = new MongodbUserRepository();
const passwordGateway = new BcryptPasswordGateway();
const signUp = new SignUp(userRepository, passwordGateway);
const signIn = new SignIn(userRepository,passwordGateway);
const updateUser = new UpdateUser(userRepository);
const sendGridEmailGateway = new SendGridEmailGateway();
const generatePasswordRecovery = new GeneratePasswordRecovery(userRepository, sendGridEmailGateway);
const jwt = new JwtIdentityGateway(process.env.JWT_KEY);
const userApiResponseMapper = new UserApiResponseMapper();
const resetPassword = new ResetPassword(userRepository, passwordGateway);

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
        const token = jwt.generate(user);
        const toApiResponse = userApiResponseMapper.fromDomain(user);
        return res.status(201).send({
            ...toApiResponse,
            token
        });
    }
    catch (error){
        console.log(error)
        return res.status(401).send({
            message: error.message
        })
    }
})
userRouter.post('/signin', async (req: Request, res: Response) => {
    try{
        const user = await signIn.execute({
            email: req.body.email,
            password: req.body.password
        })
        const token = jwt.generate(user);
        const toApiResponse = userApiResponseMapper.fromDomain(user);
        return res.status(200).send({
            ...toApiResponse,
            token
        });
    }
    catch(error){
        return res.status(401).send({
            message: error.message
        })
    }
})

userRouter.use(authenticationMiddleware);

userRouter.put('/', async (req: AuthenticatedRequest, res: Response) => {
    const user = await updateUser.execute({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        profilePictures: req.body.profilePictures,
        id: req.user.id,
        securityCode: req.body.securityCode,
    })
    const toApiResponse = userApiResponseMapper.fromDomain(user);
    return res.status(200).send(toApiResponse);
})
userRouter.get('/:id', async (req: Request, res: Response)=>{
    try{
        const user = await userRepository.getById(req.params.id);
        const toApiResponse = userApiResponseMapper.fromDomain(user);
        return res.status(200).send(toApiResponse);
    }
    catch(error){
        return res.status(400).send({
            message: error.message
        })
    }
})
userRouter.post('/password/recovery', async (req: Request, res: Response)=>{
    try{
        const securityCode = await generatePasswordRecovery.execute({
            email: req.body.email,
            sender: emailSender
        })
        return res.status(200).send({securityCode: securityCode});
    }
    catch(error){
        return res.status(401).send({
            message: error.message
        })
    }
})
userRouter.post('/password/reset/', async (req: Request, res: Response)=>{
    try {
        const user = await resetPassword.execute({
            newPassword: req.body.newPassword,
            id: req.body.id,
            securityCode: req.body.securityCode
        })
        const toApiResponse = userApiResponseMapper.fromDomain(user);
        return res.status(200).send(toApiResponse);
    }
    catch(error){
        return res.status(401).send({
            message: error.message
        })
    }
})
