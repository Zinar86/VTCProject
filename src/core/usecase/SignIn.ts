import {UserRepository} from "../repositories/UserRepository";

export interface SignInProps{
    email: string,
    password: string
}
export class SignIn {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(payload: SignInProps) {
        const user = await this.userRepository.getByEmail(payload.email);
        return user.verifyPassword(payload.password);
    }
}