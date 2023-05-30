import {CarRepository} from "../../domain/repositories/CarRepository";
import {Car} from "../../domain/entities/Car";

export class InMemoryCarRepository implements CarRepository {
    carList : Car[] = [];
    async save(car: Car): Promise<Car> {
        this.carList.push(car)
        return car;
    }

}