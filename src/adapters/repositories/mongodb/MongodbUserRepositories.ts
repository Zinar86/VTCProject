import { User } from "../../../core/entities/User";
import { UserRepository } from "../../../core/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import {Role} from "../../../core/ValueObject/Role";

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
            car: result.car.map((car)=>{
                return {
                    id: car.id,
                    model: car.model,
                    picture: car.picture,
                    registration: car.registration
                };
            }),
            id: result.id,
            position: {
                long: result.position.long,
                lat: result.position.lat,
                streetAddress: result.position.streetAddress,
                city: result.position.city,
                zipCode: result.position.zipCode
            },
            isAvailable: result.isAvailable,
            rating: result.rating,
            type: result.type as Role
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
            car: result.car.map((car)=>{
                return {
                    id: car.id,
                    model: car.model,
                    picture: car.picture,
                    registration: car.registration
                };
            }),
            id: result.id,
            position: {
                long: result.position.long,
                lat: result.position.lat,
                streetAddress: result.position.streetAddress,
                city: result.position.city,
                zipCode: result.position.zipCode
            },
            isAvailable: result.isAvailable,
            rating: result.rating,
            type: result.type as Role
        });
    }
    async save(user: User): Promise<User> {
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
                }
            },
            {
                upsert: true,
            }
        )


        return user
    }

}

