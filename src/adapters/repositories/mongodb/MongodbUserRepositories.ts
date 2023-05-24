import { User } from "../../../core/domain/entities/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import {Role} from "../../../core/domain/ValueObject/Role";

export class MongodbUserRepository implements UserRepository {
    async getById(id: string): Promise<User> {
        const result = await UserModel.findOne({
            id: id
        });
        if (!result){
            throw new Error("USER_NOT_FOUND");
        }
        return new User({
            email: result.email,
            password: result.password,
            phoneNumber: result.phoneNumber,
            profilePictures: result.profilePictures,
            lastName: result.lastName,
            firstName: result.firstName,
            id: result.id,
            position: {
                long: result.position.long,
                lat: result.position.lat,
                streetAddress: result.position.streetAddress,
                city: result.position.city,
                zipCode: result.position.zipCode
            },
            rating: result.rating,
            role: result.type as Role
        });

    }
    async getByEmail(email: string): Promise<User> {
        const result = await UserModel.findOne({
            email: email
        });
        if (!result){
            throw new Error("USER_NOT_FOUND")
        }
        return new User({
            email: result.email,
            password: result.password,
            phoneNumber: result.phoneNumber,
            profilePictures: result.profilePictures,
            lastName: result.lastName,
            firstName: result.firstName,
            id: result.id,
            position: result.position ? {
                long: result.position.long,
                lat: result.position.lat,
                streetAddress: result.position.streetAddress,
                city: result.position.city,
                zipCode: result.position.zipCode
            } : null,
            rating: result.rating,
            role: result.type as Role
        });
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

