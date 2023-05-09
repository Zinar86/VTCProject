import {UserRepository} from "../repositories/UserRepository";
import {User} from "../entities/User";
import {Address} from "../ValueObject/Address";
import {Car} from "../entities/Car";
import {Role} from "../ValueObject/Role";
export interface SignUpProps{
    firstName: string;
    lastname : string;
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
        return await User.create({
            firstName : payload.firstName,
            lastname : payload.lastname,
            email : payload.email,
            password : payload.password,
            phoneNumber : payload.phoneNumber,
            profilePictures : payload.profilePictures
        });
    }
}
