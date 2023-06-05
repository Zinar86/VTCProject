import {UserRepository} from "../../domain/repositories/UserRepository";
import {Usecase} from "../Usecase";
import {User} from "../../domain/entities/User";

export interface UpdateUserInput {
    id: string;
    firstName: string;
    lastName : string;
    phoneNumber : string;
    profilePictures : string;
    securityCode: string;
}
export class UpdateUser implements Usecase<UpdateUserInput, User>{
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(input: UpdateUserInput): Promise<User>{
        const user = await this.userRepository.getById(input.id);
        user.update({
            firstName: input.firstName,
            lastName: input.lastName,
            phoneNumber : input.phoneNumber,
            profilePictures : input.profilePictures,
            securityCode: input.securityCode
        });
        await this.userRepository.update(user);
        return user;
    }
}
