import {Car} from "../entities/Car";

export interface CarRepository {
    create(car: Car): Promise<Car>;
    findById(id : string):Promise<Car>;
    update(car: Car): Promise<Car>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Car[]>;
    findByModel(model: string): Promise<Car[]>;
    findByUserId(userId: string): Promise<Car[]>;
}