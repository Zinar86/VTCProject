import {UserRepository} from "../../../repositories/UserRepository";
export interface ResetPasswordProps {
    newPassword: string;
    id: string;
}
export class ResetPassword {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute( payload: ResetPasswordProps ){
        const user = await this.userRepository.getById(payload.id)
        user.update({
            password : payload.newPassword,
            lastName: user.userProperty.lastName,
            phoneNumber: user.userProperty.phoneNumber,
            profilePictures: user.userProperty.profilePictures,
            firstName: user.userProperty.firstName
        })
    }
}