import {UserRepository} from "../repositories/UserRepository";
import {User} from "../entities/User";
export interface SignUpProps{
    firstName: string;
    lastName : string;
    email : string;
    password : string;
    phoneNumber : string;
    profilePictures : string;
}
export class SignUp {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute( payload : SignUpProps){
        const user = await User.create({
            firstName : payload.firstName,
            lastName : payload.lastName,
            email : payload.email,
            password : payload.password,
            phoneNumber : payload.phoneNumber,
            profilePictures : payload.profilePictures
        });
        await this.userRepository.save(user);
        return user;
    }
}
