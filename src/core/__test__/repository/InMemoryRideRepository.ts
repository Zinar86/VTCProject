import {RideRepository} from "../../domain/repositories/RideRepository";
import {Ride} from "../../domain/entities/Ride";

export class InMemoryRideRepository implements RideRepository{
    listRide: Ride[] = []
    async save(ride: Ride): Promise<Ride> {
        this.listRide.push(ride);
        return ride;
    }
}