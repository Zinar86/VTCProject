import * as jwt from "jsonwebtoken";
import {JwtGateway} from "../../../core/gateways/JwtGateway";
import {User} from "../../../core/domain/entities/User";
import {JwtPayload} from "jsonwebtoken";

export class Jwt implements JwtGateway {
    constructor(
        private jwtKey: string
    ){}
    generate(user: User){
        return jwt.sign({
            email: user.userProperty.email,
            id: user.userProperty.id,
            role: user.userProperty.role
        }, this.jwtKey, {
            expiresIn: '1d'
        });
    }
    decoded(token: string): JwtPayload {
        const result = jwt.verify(token, this.jwtKey);
        return result as JwtPayload
    }
}