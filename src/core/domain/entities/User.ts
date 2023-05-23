import {Car} from "./Car";
import {Address} from "../ValueObject/Address";
import {Role} from "../ValueObject/Role";
import {v4} from "uuid";
import {Email} from "../ValueObject/Email";

export interface UserProperty {
    firstName: string;
    lastName : string;
    email : string;
    id: string;
    password : string;
    position? : Address;
    rating : number[];
    car : Car[];
    role: Role;
    phoneNumber : string;
    profilePictures : string;
    securityCode?: string;
}
export class User {
    userProperty : UserProperty;
    constructor(userProperty : UserProperty) {
        this.userProperty = userProperty;
    }
    static create(props:{
        firstName: string;
        lastName : string;
        email : string;
        password : string;
        phoneNumber : string;
        profilePictures : string;
    })
    {
        return new User ({
            ...props,
            email : new Email(props.email).value,
            id : v4(),
            rating : [],
            position : null,
            car : [],
            role: Role.client,
            securityCode: null
        })
    }

    update(props: {
        firstName: string,
        lastName: string,
        password: string,
        phoneNumber: string,
        profilePictures: string,
        securityCode: string
    })
    {
       this.userProperty.firstName = props.firstName;
       this.userProperty.lastName = props.lastName;
       this.userProperty.password = props.password;
       this.userProperty.phoneNumber = props.phoneNumber;
       this.userProperty.profilePictures = props.profilePictures;
       this.userProperty.securityCode = props.securityCode
    }

}
