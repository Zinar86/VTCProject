import * as mongoose from 'mongoose'

const rideSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    userId : {
        type: String,
        required: true,
        unique: true,
    },
    startAddress : {
        long: Number,
        lat: Number,
        streetAddress: String,
        city: String,
        zipCode: String,
    },
    endAddress : {
        long: Number,
        lat: Number,
        streetAddress: String,
        city: String,
        zipCode: String,
    },
    priceEstimation : {
        type : Number,
        required : true,
    },
    paymentMethod : {
        type : Number,
        enum : ['cash'],
        default : 'cash',
    },
    rideType : {
        type : String,
        enum : ['eco', 'comfort', 'berline', 'van', 'green']
    },
})

export const RideModel = mongoose.model('ride', rideSchema);