import {Usecase} from "../Usecase";
import {Driver} from "../../domain/entities/Driver";
import {User} from "../../domain/entities/User";
import {DriverRepository} from "../../domain/repositories/DriverRepository";
import {CalculateDistanceGateway} from "../../gateways/CalculateDistanceGateway";

export class GetRideAvailableNearby implements Usecase<User, Driver[]>{
    constructor(private driverRepository: DriverRepository,
                private calculateDistance: CalculateDistanceGateway) {

    }
    async execute(user: User): Promise<Driver[]> {
        const allDriver = await this.driverRepository.getAllDriver();
        return undefined;
    }
}