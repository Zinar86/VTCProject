import {Address} from "../../domain/ValueObject/Address";
import {PaymentMethod} from "../../domain/ValueObject/PaymentMethod";
import {RideType} from "../../domain/ValueObject/RideType";
import {Usecase} from "../Usecase";
import {Ride} from "../../domain/entities/Ride";
import {RideRepository} from "../../domain/repositories/RideRepository";
export interface CreateRideProps{
    userId: string,
    startAddress: Address,
    endAddress: Address,
    priceEstimation: number,
    paymentMethod: PaymentMethod,
    rideType: RideType
}
export class CreateRide implements Usecase<CreateRideProps, Ride> {
    constructor(private rideRepository: RideRepository) {}

    async execute(payload: CreateRideProps) {
        const ride = Ride.create(payload);
        await this.rideRepository.save(ride);
        return ride;
    }
}