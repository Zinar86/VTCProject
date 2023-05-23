import {UserRepository} from "../../../domain/repositories/UserRepository";
export interface ResetPasswordProps {
    newPassword: string;
    id: string;
    securityCode: string;
}
export class ResetPassword {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute( payload: ResetPasswordProps ){
        const user = await this.userRepository.getById(payload.id)
        if (payload.securityCode !== user.userProperty.securityCode){
            throw new Error("INVALID_SECURITY_CODE")
        }
        user.userProperty.password = payload.newPassword;
        user.userProperty.securityCode = null;
        await this.userRepository.update(user);
    }
}