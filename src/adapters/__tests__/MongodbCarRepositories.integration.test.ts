import {Connection} from "mongoose";
import mongoose from "mongoose";
import {MongodbCarRepository} from "../repositories/mongodb/MongodbCarRepository";
import {CarRepository} from "../../core/domain/repositories/CarRepository";
import {Car} from "../../core/domain/entities/Car";
describe("Integration - MongodbCarRepository", () => {
    let carRepository: CarRepository;
    let connection: Connection;
    beforeAll(async () => {
        carRepository = new MongodbCarRepository();
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject');
        connection = await mongoose.createConnection('mongodb://127.0.0.1:27017/VTCProject');
    })
    afterAll(async () => {
        await connection.dropDatabase();
    });
    it ("must save car in mongodb repository", async () => {
        const car = Car.create({
            model: "",
            picture: "",
            seats: 8,
            registration:"454fdfe"
        })
        await carRepository.save(car);
    })

})