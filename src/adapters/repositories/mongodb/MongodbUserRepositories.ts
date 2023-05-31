import { User } from "../../../core/domain/entities/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import {MongodbUserMapper} from "./mappers/MongodbUserMapper";

export class MongodbUserRepository implements UserRepository {
    private mongodbUserMapper = new MongodbUserMapper();
    async getById(id: string): Promise<User> {
        const result = await UserModel.findOne({
            id: id
        });
        if (!result){
            throw new Error("USER_NOT_FOUND");
        }
        return this.mongodbUserMapper.toDomain(result);
    }
    async getByEmail(email: string): Promise<User> {
        const result = await UserModel.findOne({
            email: email
        });
        if (!result){
            throw new Error("USER_NOT_FOUND")
        }
        return this.mongodbUserMapper.toDomain(result);
    }
    async update(user: User): Promise<User> {
        await UserModel.findOneAndUpdate(
            {
                id: user.userProperty.id
            },
            {
                $set: {
                    id: user.userProperty.id,
                    firstName: user.userProperty.firstName,
                    lastName: user.userProperty.lastName,
                    email: user.userProperty.email,
                    password: user.userProperty.password,
                    phoneNumber: user.userProperty.phoneNumber,
                    profilePictures: user.userProperty.profilePictures,
                    rating : user.userProperty.rating,
                    position : user.userProperty.position,
                    type : user.userProperty.role,
                }
            },
            {
                upsert: true,
            }
        )
        return user
    }
}

