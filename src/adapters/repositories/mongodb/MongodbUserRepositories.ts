import { User } from "../../../core/entities/User";
import { UserRepository } from "../../../core/repositories/UserRepository";
import { UserModel } from "./models/UserModel";

export class MongodbUserRepository implements UserRepository {
    getById(id: string): Promise<User> {
        const user = UserModel.findById(id);

        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
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
        const userModel = new UserModel();
        userModel.id = user.userProperty.id;
        userModel.firstName = user.userProperty.firstName;
        userModel.lastName = user.userProperty.lastName;
        userModel.email = user.userProperty.email;
        userModel.password = user.userProperty.password;
        userModel.phoneNumber = user.userProperty.phoneNumber;
        userModel.profilePictures = user.userProperty.profilePictures;
        userModel.rating = user.userProperty.rating;
        userModel.isAvailable = user.userProperty.isAvailable;
        userModel.position = user.userProperty.position;
        userModel.car = user.userProperty.car;
        userModel.type = user.userProperty.type;
        return user;
    }
}

