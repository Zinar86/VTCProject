import {UserRepository} from "../../../domain/repositories/UserRepository";
import {EmailGateway} from "../../../gateways/EmailGateway";
import {v4} from "uuid";
export class GeneratePasswordRecovery {
    userRepository : UserRepository;
    emailGateway : EmailGateway;
    constructor(userRepository : UserRepository, emailGateway : EmailGateway) {
        this.userRepository = userRepository;
        this.emailGateway = emailGateway;
    }
    async execute(payload:{
        email: string,
        sender: string
    }){
        const user = await this.userRepository.getByEmail(payload.email);
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }

        user.userProperty.securityCode = v4();
        await this.userRepository.update(user)

            await this.emailGateway.send({
                from: payload.sender,
                to: payload.email,
                subject: "link for recovery email",
                text: "link",
                html: "<strong>VTC_PROJECT</strong>"
            })
        return user;
    }
}