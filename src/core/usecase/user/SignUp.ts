import {UserRepository} from "../../domain/repositories/UserRepository";
import {User} from "../../domain/entities/User";
import {PasswordGateway} from "../../gateways/PasswordGateway";
import {Password} from "../../domain/ValueObject/Password";
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
    passwordGateway : PasswordGateway;
    constructor(userRepository: UserRepository, passwordGateway: PasswordGateway) {
        this.userRepository = userRepository;
        this.passwordGateway = passwordGateway;
    }
    async execute( payload : SignUpProps){
        const password = new Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        const user = User.create({
            firstName : payload.firstName,
            lastName : payload.lastName,
            email : payload.email,
            password : hash,
            phoneNumber : payload.phoneNumber,
            profilePictures : payload.profilePictures
        });
        await this.userRepository.update(user);
        return user;
    }
}
