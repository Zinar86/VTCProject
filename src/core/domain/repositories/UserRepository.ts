import {User,} from "../entities/User";

export interface UserRepository {
    update(user: User): Promise<User>;
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
}