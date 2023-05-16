import {UserRepository} from "../repositories/UserRepository";
import {BcryptPasswordGateway} from "../gateways/bcrypt/BctyptPasswordGateway";

export interface SignInProps{
    email: string,
    password: string
}
export class SignIn {
    userRepository : UserRepository;
    passwordGateway : BcryptPasswordGateway;
    constructor(userRepository : UserRepository, passwordGateway: BcryptPasswordGateway,) {
        this.passwordGateway = passwordGateway;
        this.userRepository = userRepository;
    }
    async execute(payload: SignInProps) {

        const user = await this.userRepository.getByEmail(payload.email);
        const passwordCheck = await this.passwordGateway.compare(payload.password, user.userProperty.password);
        if (passwordCheck) {
            return user;//Riadh <3 <3
        }
        throw new Error("Authentication failed");
    }
}