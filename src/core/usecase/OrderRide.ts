import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {Address} from "../ValueObject/Address";
import {Ride} from "../entities/Ride";
import {RideType} from "../ValueObject/RideType";
import {InMemoryRideRepository} from "../../adapters/repositories/inmemory/InMemoryRideRepository";
import {RideRepository} from "../repositories/RideRepository";
interface OrderRideInput  {
     id : string,
     userId : string
     startAddress : Address,
     endAddress : Address,
     priceEstimation : number,
     paymentMethod : PaymentMethod,
     rideType : RideType,

}


export class OrderRide {
    rideRepo : RideRepository
    constructor(rideRepo : RideRepository) {
        this.rideRepo = rideRepo
    }

    async execute( payload : OrderRideInput) {

        const ride = await Ride.create({
            userId: payload.userId,
            startAddress: payload.startAddress,
            endAddress: payload.endAddress,
            priceEstimation: payload.priceEstimation,
            paymentMethod: payload.paymentMethod,
            rideType: payload.rideType,
        });
        await this.rideRepo.save(ride);
        return ride;
    }


}


