import {User} from "../entities/User";

export interface UserRepository {
    save(user: User): Promise<User>;
    verifyEmail(email: string): Promise<User>;
    update(user: User): Promise<User>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
}