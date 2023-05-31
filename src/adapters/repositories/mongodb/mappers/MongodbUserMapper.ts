import {Mapper} from "../../../../core/domain/Mapper";
import {User} from "../../../../core/domain/entities/User";
import {Role} from "../../../../core/domain/ValueObject/Role";

export class MongodbUserMapper implements Mapper<any, User>{
    toDomain(raw: any): User {
        return new User({
            email: raw.email,
            password: raw.password,
            phoneNumber: raw.phoneNumber,
            profilePictures: raw.profilePictures,
            lastName: raw.lastName,
            firstName: raw.firstName,
            id: raw.id,
            position: {
                long: raw.position.long,
                lat: raw.position.lat,
                streetAddress: raw.position.streetAddress,
                city: raw.position.city,
                zipCode: raw.position.zipCode
            },
            rating: raw.rating,
            role: raw.type as Role
        });
    }
}