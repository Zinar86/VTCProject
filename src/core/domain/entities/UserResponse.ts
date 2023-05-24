import {Address} from "../ValueObject/Address";
import {Role} from "../ValueObject/Role";

export interface UserResponse {
    firstName: string;
    lastName : string;
    email : string;
    id: string;
    position? : Address;
    rating : number[];
    role: Role;
    phoneNumber : string;
    profilePictures : string;
    token: string;
}