import {CarRepository} from "../../../core/domain/repositories/CarRepository";
import {Car} from "../../../core/domain/entities/Car";

export class InMemoryCarRepository implements CarRepository {
    carList : Car[] = [];
    async save(car: Car): Promise<Car> {
        this.carList.push(car)
        return car;
    }
    getById(id: string): Promise<Car> {
        return Promise.resolve(undefined);
    }

}