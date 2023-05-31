import {Mapper} from "../../../../core/domain/Mapper";
import {User} from "../../../../core/domain/entities/User";
import {Role} from "../../../../core/domain/ValueObject/Role";
export interface MongodbUserMapperProps {
    id: string;
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    profilePictures: string;
    rating: number[];
    isAvailable: boolean;
    position?: {
        long:  number,
        lat:  number,
        streetAddress:  string,
        city:  string,
        zipCode:  string
    };
}
export class MongodbUserMapper implements Mapper<User, MongodbUserMapperProps> {
    toDomain(raw: MongodbUserMapperProps): User {
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