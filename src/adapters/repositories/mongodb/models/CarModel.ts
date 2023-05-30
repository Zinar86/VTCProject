import * as mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true,
    },
    registration :{
    type: String,
    required: true,
    unique: true,
    },
    model : {
        type: String,
        required: true,
    },
    picture : {
        type: String
    }
})
export const CarModel = mongoose.model('car', carSchema);