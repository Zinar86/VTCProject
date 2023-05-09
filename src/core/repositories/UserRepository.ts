import {User} from "../entities/User";

export interface UserRepository {
    save(user: User): Promise<User>
    update(user: User): Promise<User>;
    getById(id: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
}