import {UserRepository} from "../../repositories/UserRepository";
import {User} from "../../entities/User";

export class InMemoryUserRepository implements UserRepository{
    listUser: User[] = [];
    async save(user: User): Promise<User> {
        this.listUser.push(user)
        return user;
    }
    async getByEmail(email: string): Promise<User> {
        const user = this.listUser.find(user=>
            user.userProperty.email === email
        )
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }
        return user;
    }
    async getById(id: string): Promise<User> {
        const user = this.listUser.find(user=>
            user.userProperty.id === id
        )
        if (!user){
            throw new Error("USER_NOT_FOUND")
        }
        return user;
    }
    async update(user: User): Promise<User> {
        return user;
    }

}