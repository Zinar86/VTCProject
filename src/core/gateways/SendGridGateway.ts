import {Msg} from "../../adapters/gateways/sendgrid/SendGridEmailGateway";

export interface SendGridGateway {
    send(msg: Msg): Promise<void>;
}