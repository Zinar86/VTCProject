import {InMemoryCarRepository} from "../../../adapters/repositories/inmemory/InMemoryCarRepository";
import {CreateCar} from "../../usecase/driver/CreateCar";
import {InMemoryDriverRepository} from "../../../adapters/repositories/inmemory/InMemoryDriverRepository";
import {Driver} from "../../domain/entities/Driver";
import { CarRepository } from "core/domain/repositories/CarRepository";
import { DriverRepository } from "core/domain/repositories/DriverRepository";
describe("Unit - CreateCar", () => {
    let carRepo: CarRepository;
    let driverRepo: DriverRepository;
    let driver: Driver;
    beforeAll(async () => {
        carRepo = new InMemoryCarRepository();
        driverRepo = new InMemoryDriverRepository();
        driver = Driver.create({
            userId:"",
            car:"",
            identityId:"",
            kbis:"",
            insurance:"",
            driversLicense:"",
            carRegistrationDocument:""
        })
        driverRepo.save(driver);
    })
    it("Must create a car and save id in DriverRepo", async () => {
        const createCar = new CreateCar( carRepo, driverRepo );
        const carResult = await createCar.execute({
            picture: "",
            registration: "",
            seats: 10,
            model: "",
            driverId: driver.driverProperty.id,
        })
        const driver2 = await driverRepo.getById(driver.driverProperty.id)
        expect(carResult.carProps.seats).toEqual(10);
        expect(driver2.driverProperty.car).toEqual(carResult.carProps.id)
    })
})