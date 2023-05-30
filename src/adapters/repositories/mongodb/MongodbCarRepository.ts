import {CarRepository} from "../../../core/domain/repositories/CarRepository";
import {Car} from "../../../core/domain/entities/Car";
import {CarModel} from "./models/CarModel";

export class MongodbCarRepository implements CarRepository{
    async save(car: Car): Promise<Car> {
        await CarModel.findOneAndUpdate(
            {
                id: car.carProps.id
            },
            {
                $set: {
                    registration: car.carProps.registration,
                    model: car.carProps.model,
                    picture : car.carProps.picture,
                    seats: car.carProps.seats
                }
            },
            {
                upsert: true,
            }
        )
        return car
    }

}