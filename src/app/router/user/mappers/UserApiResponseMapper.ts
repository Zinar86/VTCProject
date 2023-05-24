import {User} from "../../../../core/domain/entities/User";
import {Mapper} from "../../../../core/domain/Mapper";
import {UserResponse} from "../../../../core/domain/entities/UserResponse";

export class UserApiResponseMapper implements Mapper<User, UserResponse> {
    fromDomain(user: User) : UserResponse {
        return {
            email: user.userProperty.email,
            firstName: user.userProperty.firstName,
            lastName: user.userProperty.lastName,
            id: user.userProperty.id,
            position: user.userProperty.position,
            rating: user.userProperty.rating,
            role: user.userProperty.role,
            phoneNumber: user.userProperty.phoneNumber,
            profilePictures: user.userProperty.profilePictures,
            token: user.userProperty.token,
        }
    }
}