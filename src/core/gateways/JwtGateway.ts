import {JwtPayload} from "jsonwebtoken";
import {User} from "../domain/entities/User";

export interface IdentityGateway {
    generate(user: User) : string;
    decoded(token: string): JwtPayload;
}