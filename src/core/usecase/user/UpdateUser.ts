import {UserRepository} from "../../repositories/UserRepository";

export interface UpdateUserInput {
    id: string;
    firstName: string;
    lastName : string;
    password : string;
    phoneNumber : string;
    profilePictures : string;
}
export class UpdateUser {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(input: UpdateUserInput){
        const user = await this.userRepository.getById(input.id);

        user.update({
            firstName: input.firstName,
            lastName: input.lastName,
            password : input.password,
            phoneNumber : input.phoneNumber,
            profilePictures : input.profilePictures,
        });
        await this.userRepository.save(user);
    }
}
