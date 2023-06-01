import {InMemoryCarRepository} from "../../../adapters/repositories/inmemory/InMemoryCarRepository";
import {CreateCar} from "../../usecase/driver/CreateCar";
import {InMemoryDriverRepository} from "../../../adapters/repositories/inmemory/InMemoryDriverRepository";
import {Driver} from "../../domain/entities/Driver";
describe("Unit - CreateCar", () => {
    let carRepo;
    let driverRepo;
    let driver;
    beforeEach(async () => {
        carRepo = new InMemoryCarRepository();
        driverRepo = new InMemoryDriverRepository();
        driver = await Driver.create({
            id:"111",
            car:"",
            identityId:"",
            kbis:"",
            insurance:"",
            driversLicense:"",
            carRegistrationDocument:""
        })
        driverRepo.save(driver);
    })
    it("Must create a car", async () => {
        const createCar = new CreateCar( carRepo, driverRepo );
        const result = await createCar.execute({
            picture: "",
            registration: "",
            seats: 10,
            model: "",
            driverId:"111",
        })
    expect(result.carProps.seats).toEqual(10);
    })
})