import {Usecase} from "../Usecase";
import {Car} from "../../domain/entities/Car";
import {CarRepository} from "../../domain/repositories/CarRepository";
import {DriverRepository} from "../../domain/repositories/DriverRepository";
export interface CreateCarProps {
    registration : string;
    model: string;
    picture : string;
    seats?: number;
    driverId: string;
}
export class CreateCar implements Usecase<CreateCarProps, Car> {
    constructor(private carRepository: CarRepository,
                private driverRepository: DriverRepository) {
    }
    async execute(payload:CreateCarProps) {
        const car =Car.create({
            model: payload.model,
            seats: payload.seats,
            picture: payload.picture,
            registration: payload.registration,
        })
        await this.carRepository.save(car);
        const driver = await this.driverRepository.getById(payload.driverId)
        driver.saveCar(car.carProps.id);
        await this.driverRepository.save(driver);
        return car;
    }

}