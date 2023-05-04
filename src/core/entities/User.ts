import {Car} from "./Car";
import {Address} from "./Address";
import {Role} from "./Role";

export interface User {
    email : string;
    lastname : string;
    id: string;
    password : string;
    position : Address;
    rating : number;
    car : Car;
    isAvailable: boolean;
    type: Role;
    phoneNumber : string;
    profilePictures : string;
}