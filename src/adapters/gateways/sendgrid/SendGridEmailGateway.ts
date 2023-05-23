import sgMail from "@sendgrid/mail";
import dotenv from 'dotenv';
import {EmailGateway} from "../../../core/gateways/EmailGateway";
import {Msg} from "../../../core/domain/ValueObject/Msg";

dotenv.config();
const apiKey = "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"
sgMail.setApiKey(apiKey);

export class SendGridEmailGateway implements EmailGateway{
    async send(msg: Msg){
        try{
            await sgMail.send(msg);
        }
        catch{
            throw new Error("SEND_EMAIL_FAILED");
        }

    }
}