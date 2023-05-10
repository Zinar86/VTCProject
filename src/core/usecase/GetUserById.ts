import {UserRepository} from "../repositories/UserRepository";

export class GetUserById {
    userRepository : UserRepository;
    constructor(userRepository : UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(id: string){
        const user= this.userRepository.getById(id);
        return await user;
    }
}