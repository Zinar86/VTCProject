import {UserRepository} from "../../domain/repositories/UserRepository";
import {Usecase} from "../Usecase";
import {User} from "../../domain/entities/User";
export interface GetUserByIdCommand {
    userId: string
}
export class GetUserById implements Usecase<GetUserByIdCommand, User> {
    constructor(private userRepository : UserRepository) {
    }
    async execute(payload: GetUserByIdCommand): Promise<User>{
        const { userId } = payload
        return await this.userRepository.getById(userId);
    }
}