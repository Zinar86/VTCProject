import {EmailGateway} from "../../gateways/EmailGateway";
import {Msg} from "../../domain/ValueObject/Msg";

export class InMemoryEmailGateway implements EmailGateway{
    async send(msg: Msg): Promise<void> {
        console.log("send in inMemory for __test__")
    }

}