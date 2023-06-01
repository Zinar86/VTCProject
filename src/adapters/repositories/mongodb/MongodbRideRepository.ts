import {RideRepository} from "../../../core/domain/repositories/RideRepository";
import {Ride} from "../../../core/domain/entities/Ride";
import {RideModel} from "./models/RideModel";

export class MongodbRideRepository implements RideRepository {
    async save(ride: Ride): Promise<Ride> {
        await RideModel.findOneAndUpdate(
            {
                id: ride.rideProps.id
            },
            {
                $set:{
                    id: ride.rideProps.id,
                    userId: ride.rideProps.userId,
                    driverId: ride.rideProps.driverId,
                    startAddress: ride.rideProps.startAddress,
                    endAddress: ride.rideProps.endAddress,
                    priceEstimation: ride.rideProps.priceEstimation,
                    paymentMethod: ride.rideProps.paymentMethod,
                    rideType: ride.rideProps.rideType,
                    status: ride.rideProps.status
                }
            },
            {
                upsert: true,
            }
        )
        return ride;
    }

}