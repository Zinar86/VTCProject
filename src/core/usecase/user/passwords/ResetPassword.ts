import {UserRepository} from "../../../domain/repositories/UserRepository";
import {Password} from "../../../domain/ValueObject/Password";
import {PasswordGateway} from "../../../gateways/PasswordGateway";
export interface ResetPasswordProps {
    newPassword: string;
    id: string;
    securityCode: string;
}
export class ResetPassword {
    userRepository : UserRepository;
    passwordGateway: PasswordGateway
    constructor(userRepository : UserRepository, passwordGateway: PasswordGateway) {
        this.userRepository = userRepository;
        this.passwordGateway= passwordGateway;
    }
    async execute( payload: ResetPasswordProps ){
        const user = await this.userRepository.getById(payload.id)
        const password = new Password(payload.newPassword).value;
        const passwordHash = await this.passwordGateway.encrypt(password);
        await user.resetPassword(payload.securityCode, passwordHash)
        await this.userRepository.update(user);
        return user;
    }
}