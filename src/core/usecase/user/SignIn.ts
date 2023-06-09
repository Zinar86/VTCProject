import {UserRepository} from "../../domain/repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {Usecase} from "../Usecase";
import {User} from "../../domain/entities/User";
export interface SignInProps{
    email: string,
    password: string
}
export class SignIn implements Usecase<SignInProps, User> {

    userRepository : UserRepository;
    passwordGateway : PasswordGateway;
    constructor(userRepository : UserRepository, passwordGateway: PasswordGateway) {
        this.passwordGateway = passwordGateway;
        this.userRepository = userRepository;
    }
    async execute(payload: SignInProps) {
        const user = await this.userRepository.getByEmail(payload.email);
        const passwordCheck = await this.passwordGateway.compare(payload.password, user.userProperty.password);
        if (passwordCheck) {
            return user;
        }
        throw new Error("Authentication failed");
    }
}