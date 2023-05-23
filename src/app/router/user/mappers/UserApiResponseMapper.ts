import {User} from "../../../../core/domain/entities/User";
export class UserApiResponseMapper {
    fromDomain(user: User){
        return {
            email: user.userProperty.email,
            firstName: user.userProperty.firstName,
            lastName: user.userProperty.lastName,
            id: user.userProperty.id,
            position: user.userProperty.position,
            rating: user.userProperty.rating,
            role: user.userProperty.role,
            phoneNumber: user.userProperty.phoneNumber,
            profilePictures: user.userProperty.profilePictures
        }
    }
}