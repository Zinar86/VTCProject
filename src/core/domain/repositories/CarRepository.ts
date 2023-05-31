import {Car} from "../entities/Car";

export interface CarRepository {
    save(car: Car): Promise<Car>;
    getById(id: string): Promise<Car>;
}