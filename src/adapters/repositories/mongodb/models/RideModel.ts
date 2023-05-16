import * as mongoose from 'mongoose'

const rideSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
})