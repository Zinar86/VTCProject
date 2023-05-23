import {Msg} from "../domain/ValueObject/Msg";
export interface EmailGateway {
    send(msg: Msg): Promise<void>;
}