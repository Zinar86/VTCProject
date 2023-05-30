import {Usecase} from "../Usecase";
import {Car} from "../../domain/entities/Car";
import {CarRepository} from "../../domain/repositories/CarRepository";
export interface CreateCarProps {
    registration : string;
    model: string;
    picture : string;
    seats?: number;
}
export class CreateCar implements Usecase<CreateCarProps, Car> {
    constructor(private carRepository: CarRepository) {
    }
    async execute(payload:CreateCarProps) {
        const car =Car.create({
            model: payload.model,
            seats: payload.seats,
            picture: payload.picture,
            registration: payload.registration,
        })
        await this.carRepository.save(car);
        return car;
    }

}