import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    car : {
        type: String,
        required: true,
    },
    identityId: {
        type: String,
        required: true,
        unique: true
    },
    driversLicense: {
       type: String,
        required: true,
        unique: true,
    },
    insurance: {
        type: String,
        required: true,
        unique: true,
    },
    kbis: {
        type: String,
        required: true,
        unique: true,
    },
    carRegistrationDocument: {
        type: String,
        required: true,
        unique: true,
    },
})

export const DriverModel = mongoose.model('driver', driverSchema);