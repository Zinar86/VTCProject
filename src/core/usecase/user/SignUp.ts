import {UserRepository} from "../../domain/repositories/UserRepository";
import {User} from "../../domain/entities/User";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {Password} from "../../domain/ValueObject/Password";
import {Usecase} from "../Usecase";
export interface SignUpProps{
    firstName: string;
    lastName : string;
    email : string;
    password : string;
    phoneNumber : string;
    profilePictures : string;
}
export class SignUp implements Usecase<SignUpProps, User> {
    constructor(
        private userRepository: UserRepository,
        private passwordGateway: PasswordGateway) {
    }
    async execute( payload : SignUpProps){
        const password = new Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        const { firstName, lastName, email, phoneNumber, profilePictures } = payload;
        const user = User.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hash,
            phoneNumber : phoneNumber,
            profilePictures : profilePictures
        });
        await this.userRepository.update(user);
        return user;
    }
}
