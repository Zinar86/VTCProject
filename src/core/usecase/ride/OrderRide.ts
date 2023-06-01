import {PaymentMethod} from "../../domain/ValueObject/PaymentMethod";
import {Address} from "../../domain/ValueObject/Address";
import {RideType} from "../../domain/ValueObject/RideType";
import {RideRepository} from "../../domain/repositories/RideRepository";
import {Usecase} from "../Usecase";
import {Ride} from "../../domain/entities/Ride";

interface OrderRideInput {
     id : string,
     userId?: string,
     driverId?: string,
     startAddress : Address,
     endAddress : Address,
     priceEstimation : number,
     paymentMethod : PaymentMethod,
     rideType : RideType,
}
export class OrderRide implements Usecase<any, any>{
    rideRepo : RideRepository
    constructor(rideRepo : RideRepository) {
        this.rideRepo = rideRepo
    }
    async execute( payload : OrderRideInput) {
        return Ride.create({
            userId: payload.userId,
            startAddress: payload.startAddress,
            endAddress: payload.endAddress,
            priceEstimation: payload.priceEstimation,
            paymentMethod: payload.paymentMethod,
            rideType: payload.rideType,
            driverId: payload.driverId
        })
    }
}



