import {RideRepository} from "../../../core/domain/repositories/RideRepository";
import {Ride} from "../../../core/domain/entities/Ride";

export class InMemoryRideRepository implements RideRepository{
    listRide: Ride[] = []
    async save(ride: Ride): Promise<Ride> {
        this.listRide.push(ride);
        return ride;
    }
}