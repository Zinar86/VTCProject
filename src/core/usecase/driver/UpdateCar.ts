import {Usecase} from "../Usecase";
import {CarRepository} from "../../domain/repositories/CarRepository";
import {Car} from "../../domain/entities/Car";
export interface UpdateCarProps {
    id : string;
    registration : string;
    model: string;
    picture : string;
    seats?: number;
}
export class UpdateCar implements Usecase<UpdateCarProps, Car> {
    constructor(private carRepository: CarRepository) {
    }
    async execute(payload: UpdateCarProps): Promise<Car> {
        const car = await this.carRepository.getById(payload.id);
        car.update({
            registration: payload.registration,
            model: payload.model,
            picture: payload.picture,
            seats: payload.seats
        })
        await this.carRepository.save(car)
        return car
    }
}