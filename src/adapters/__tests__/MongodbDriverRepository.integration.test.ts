import {Driver} from "../../core/domain/entities/Driver";
import {MongodbDriverRepository} from "../repositories/mongodb/MongodbDriverRepository";
import {DriverRepository} from "../../core/domain/repositories/DriverRepository";
import mongoose, {Connection} from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";

describe('Integration - MongodbDriverRepository', () => {
    let driverRepo: DriverRepository;
    let connection: Connection;
    beforeAll(async ()=>{
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        console.log(uri)
        await mongoose.connect(`${uri}VTCProject`)
        connection = await mongoose.createConnection(`${uri}VTCProject`)
        const driver =  Driver.create({
            car:"azerty",
            identityId:'',
            driversLicense:'',
            kbis:"",
            carRegistrationDocument:'',
            insurance:""
        })
        driverRepo = new MongodbDriverRepository();
        await driverRepo.save(driver)
    })
    afterAll(async () => {
        await connection.dropDatabase();
    });
    it ('Should return all driver', async () => {
        const allDriver = await driverRepo.getAllDriver();
        expect(allDriver[0].driverProperty.car).toEqual("azerty")
    })
})