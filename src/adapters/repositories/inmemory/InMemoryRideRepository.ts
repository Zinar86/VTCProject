import {RideRepository} from "../../../core/domain/repositories/RideRepository";
import {Ride} from "../../../core/domain/entities/Ride";

export class InMemoryRideRepository implements RideRepository {
    rideList : Ride[] = [];

    async save(ride: Ride): Promise<Ride> {
        this.rideList.push(ride);
        return ride;
    }
    async findById(id: string): Promise<Ride>{
        return
    };
    async update(ride: Ride): Promise<Ride>{
        return ride
    };
    async delete(id: string): Promise<void>{
        return
    };
    async findAll(): Promise<Ride[]>{
        return
    };
    async findByUserId(userId: string): Promise<Ride[]>{
        return
    };
}