import {UserProperty} from "../entities/User";
import {UserRepository} from "../repositories/UserRepository";

export interface GetUserByIdProps {

}

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