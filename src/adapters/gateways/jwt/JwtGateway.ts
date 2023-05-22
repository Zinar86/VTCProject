import * as jwt from "jsonwebtoken";
import {JwtGateway} from "../../../core/gateways/JwtGateway";
import {User} from "../../../core/domain/entities/User";
import * as dotenv from 'dotenv';
import {JwtPayload} from "jsonwebtoken";
dotenv.config()
export class Jwt implements JwtGateway {
    //private jwtKey = process.env.JWT_KEY
    private jwtKey = "azerty012345679"
    generate(user: User){
        return jwt.sign({user}, this.jwtKey);
    }

    decoded(token: string): JwtPayload {
        const result = jwt.verify(token, this.jwtKey);
        return result as JwtPayload
    }
}