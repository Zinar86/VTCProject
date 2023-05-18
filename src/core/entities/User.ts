import {Car} from "./Car";
import {Address} from "../ValueObject/Address";
import {Role} from "../ValueObject/Role";
import {v4} from "uuid";

export interface UserProperty {
    firstName: string;
    lastName : string;
    email : string;
    id: string;
    password : string;
    position : Address;
    rating : number[];
    car : Car[];
    type: Role;
    phoneNumber : string;
    profilePictures : string;
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
        const emailValidate: boolean = User.emailValid(props.email)
        if (!emailValidate){
            throw new Error("EMAIL_NO_VALID");
        }
        const passwordValidate: boolean = User.passwordValid(props.password)
        if(!passwordValidate){
            throw new Error("PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER")
        }
        return new User ({
            ...props,
            id : v4(),
            rating : [],
            position : {
                long: 0,
                lat: 0,
                streetAddress: "",
                city: "",
                zipCode: "0"
                },
            car : [],
            type: Role.client,
        })
    }

    update(props: {
        firstName: string,
        lastName: string,
        password : string,
        phoneNumber : string,
        profilePictures : string,
    })
    {
       this.userProperty.firstName = props.firstName;
       this.userProperty.lastName = props.lastName;
       this.userProperty.password = props.password;
       this.userProperty.phoneNumber = props.phoneNumber;
       this.userProperty.profilePictures = props.profilePictures;
    }
    static emailValid(email: string){
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);

    }
    static passwordValid(password){
        const regexp = new RegExp(/^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{3}$/m);
        return regexp.test(password)
    }
}
