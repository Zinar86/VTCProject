import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';
import {SendGridGateway} from "../../../core/gateways/SendGridGateway";

dotenv.config();
const apiKey = process.env.JWT_KEY
sgMail.setApiKey(apiKey);
export interface Msg {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}
export class SendGridEmailGateway implements SendGridGateway{
    async send(msg: Msg){
        try{
            await sgMail.send(msg);
        }
        catch{
            throw new Error("SEND_EMAIL_FAILED");
        }

    }
}