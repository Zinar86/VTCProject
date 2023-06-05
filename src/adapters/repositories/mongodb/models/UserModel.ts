import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    profilePictures : {
        type: String,
        required: true, 
    },
    rating :[ {
        type:Number,
    }],
    isAvailable: {
        type: Boolean,
        required: true,
    },
    position : {
        long: {
            type: Number,
            required: false,
        },
        lat: {
            type: Number,
            required: false,
        },
        streetAddress: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        zipCode: {  
            type: String,
            required: false,
        }
    },
    car : {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
    securityCode: {
        type: String,
        required: false,
    }
})

export const UserModel = mongoose.model('users', userSchema);
