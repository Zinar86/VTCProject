import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv'
dotenv.config();
const apiKey = process.env.API_KEY_SENDGRID;
sgMail.setApiKey(apiKey);
export interface Msg {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
}
export class SendGridEmailGateway implements SendGridEmailGateway{
    async send(msg: Msg){
        return await sgMail.send(msg);
    }
}