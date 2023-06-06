import {PaymentMethod} from "../../domain/ValueObject/PaymentMethod";
import {RideType} from "../../domain/ValueObject/RideType";
import {RideRepository} from "../../domain/repositories/RideRepository";
import {Usecase} from "../Usecase";
import {Ride} from "../../domain/entities/Ride";

interface OrderRideInput {
     userId?: string,
     driverId?: string,
     startAddress : string,
     endAddress : string,
     priceEstimation : number,
     paymentMethod : PaymentMethod,
     rideType : RideType,
}
export class OrderRide implements Usecase<OrderRideInput, Promise<Ride>>{
    rideRepo : RideRepository
    constructor(rideRepo : RideRepository) {
        this.rideRepo = rideRepo
    }
    async execute( payload : OrderRideInput) {
        const ride =  Ride.create({
            userId: payload.userId,
            driverId: payload.driverId,
            startAddress: payload.startAddress,
            endAddress: payload.endAddress,
            priceEstimation: payload.priceEstimation,
            paymentMethod: payload.paymentMethod,
            rideType: payload.rideType,
        })
        await this.rideRepo.save(ride);
        return ride;
    }
}



