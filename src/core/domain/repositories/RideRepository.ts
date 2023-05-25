import {Ride} from "../entities/Ride";
import {RideType} from "../ValueObject/RideType";

export interface RideRepository {
    save(ride: Ride): Promise<Ride>;
    //findById(id: string): Promise<Ride>;
    //update(ride: Ride): Promise<Ride>;
    //delete(id: string): Promise<void>;
    //findAll(): Promise<Ride[]>;
    //findByUserId(userId: string): Promise<Ride[]>;
    //requestRide(userId: string, ride: Ride): Promise<Ride>;
    //suggestRide(userId: string, ride: Ride): Promise<Ride[]>;
    //getAvailableRides(location: Location, rideType: RideType): Promise<Ride[]>;
    //acceptRide(driverId: string, rideId: string): Promise<Ride>;
    //terminateRide(rideId: string): Promise<Ride>;
    //cancelRide(userId: string, rideId: string): Promise<Ride>;
    //joinRide(userId: string, rideId: string): Promise<Ride>;
}