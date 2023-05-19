import {PasswordGateway} from "../../gateways/PasswordGateway";
import {genSaltSync} from "bcrypt";

export class InMemoryPasswordGateway implements PasswordGateway{
    async compare(password: string, hash: string): Promise<boolean> {
        return password === hash;
    }
    async encrypt(password: string): Promise<string> {
        return password;
    }

}