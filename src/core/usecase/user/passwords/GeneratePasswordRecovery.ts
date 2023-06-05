import {UserRepository} from "../../../domain/repositories/UserRepository";
import {EmailGateway} from "../../../gateways/EmailGateway";
import {v4} from "uuid";
import {Usecase} from "../../Usecase";
import { User } from "core/domain/entities/User";
export interface GeneratePasswordRecoveryProps {
    email: string,
    sender: string
}
export class GeneratePasswordRecovery implements Usecase<GeneratePasswordRecoveryProps, string>{
    userRepository : UserRepository;
    emailGateway : EmailGateway;
    constructor(userRepository : UserRepository, emailGateway : EmailGateway) {
        this.userRepository = userRepository;
        this.emailGateway = emailGateway;
    }
    async execute(payload: GeneratePasswordRecoveryProps){
        const user= await this.userRepository.getByEmail(payload.email);
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }

        const securityCode = v4()
        user.update({
            firstName: user.userProperty.firstName,
            lastName: user.userProperty.lastName,
            phoneNumber: user.userProperty.phoneNumber,
            profilePictures: user.userProperty.profilePictures,
            securityCode: securityCode
        })
        await this.userRepository.update(user);
        await this.emailGateway.send({
            from: payload.sender,
            to: payload.email,
            subject: "link for recovery email",
            text: securityCode,
            html: "<strong>VTC_PROJECT</strong>"
        });
        return securityCode;
    }
}