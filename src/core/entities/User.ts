import {Car} from "./Car";
import {Address} from "../ValueObject/Address";
import {Role} from "../ValueObject/Role";
import {UserRepository} from "../repositories/UserRepository";
import {v4} from "uuid";

export interface UserProperty {
    firstName: string;
    lastname : string;
    email : string;
    id: string;
    password : string;
    position : Address;
    rating : number;
    car : Car[];
    isAvailable: boolean;
    type: Role;
    phoneNumber : string;
    profilePictures : string;
}
export class User {
    userProperty : UserProperty;
    constructor(userProperty : UserProperty) {
        this.userProperty = userProperty;
    }
    static async create(props:{
        firstName: string;
        lastname : string;
        email : string;
        password : string;
        phoneNumber : string;
        profilePictures : string;
    })
    {
        return new User ({
            ...props,
            id : v4(),
            rating : 5,
            isAvailable: true,
            position : {
                long: 0,
                lat: 0,
                streetAddress: "",
                city: "",
                zipCode: 0
                },
            car : [],
            type: Role.client,
        })
    }
}
