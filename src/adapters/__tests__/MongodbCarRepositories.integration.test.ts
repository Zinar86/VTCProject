import {Connection} from "mongoose";
import mongoose from "mongoose";
import {MongodbCarRepository} from "../repositories/mongodb/MongodbCarRepository";
import {CarRepository} from "../../core/domain/repositories/CarRepository";
import {Car} from "../../core/domain/entities/Car";
import {MongoMemoryServer} from "mongodb-memory-server";
describe("Integration - MongodbCarRepository", () => {
    let carRepository: CarRepository;
    let connection: Connection;
    beforeAll(async () => {
        carRepository = new MongodbCarRepository();
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        console.log(uri)
        await mongoose.connect(`${uri}VTCProject`)
        connection = await mongoose.createConnection(`${uri}VTCProject`)
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