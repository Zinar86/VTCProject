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
        if (payload.securityCode !== user.userProperty.securityCode){
            throw new Error("INVALID_SECURITY_CODE")
        }
        const password = new Password(payload.newPassword).value;
        user.userProperty.password = await this.passwordGateway.encrypt(password);
        user.userProperty.securityCode = null;
        await this.userRepository.update(user);
        return user;
    }
}