import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';
import {EmailGateway} from "../../../core/gateways/EmailGateway";
import {Msg} from "../../../core/domain/ValueObject/Msg";
dotenv.config();
const apiKey = process.env.API_KEY_SENDGRID
sgMail.setApiKey(apiKey);
export class SendGridEmailGateway implements EmailGateway {
    async send(msg: Msg){
        try{
            await sgMail.send(msg);
        }
        catch{
            throw new Error("SEND_EMAIL_FAILED");
        }
    }
}