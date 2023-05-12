import {PasswordGateway} from "../../../core/gateways/PasswordGateway";
import {compareSync, genSaltSync, hashSync} from "bcrypt";

export class BcryptPasswordGateway implements PasswordGateway {
    private saltRounds: string = genSaltSync(10);
    async compare(password: string, hash: string): Promise<boolean> {
        return compareSync(password, hash);
    }

    async encrypt(password: string): Promise<string> {
        return hashSync(password, this.saltRounds);
    }
}