import {UserRepository} from "../../../domain/repositories/UserRepository";
import {SendGridEmailGateway} from "../../../../adapters/gateways/sendgrid/SendGridEmailGateway";

import dotenv from 'dotenv'
dotenv.config();
const emailSender = process.env.EMAIL_SENDER

export class GeneratePasswordRecovery {
    userRepository : UserRepository;
    sendGridEmailGateway : SendGridEmailGateway;
    constructor(userRepository : UserRepository, sendGridEmailGateway : SendGridEmailGateway) {
        this.userRepository = userRepository;
        this.sendGridEmailGateway = sendGridEmailGateway;
    }
    async execute(email){
        await this.sendGridEmailGateway.send({
            from: emailSender,
            to: email,
            subject: "link for recovery email",
            text: "link",
            html: "<strong>VTC_PROJECT</strong>"
        })
    }
}