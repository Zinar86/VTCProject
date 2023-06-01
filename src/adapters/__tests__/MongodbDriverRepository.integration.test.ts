import {Driver} from "../../core/domain/entities/Driver";
import {MongodbDriverRepository} from "../repositories/mongodb/MongodbDriverRepository";
import {DriverRepository} from "../../core/domain/repositories/DriverRepository";
import mongoose, {Connection} from "mongoose";

describe('Integration - MongodbDriverRepository', () => {
    let driverRepo: DriverRepository;
    let connection: Connection;
    beforeAll(async ()=>{
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject')
        connection = await mongoose.createConnection('mongodb://127.0.0.1:27017/user')
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