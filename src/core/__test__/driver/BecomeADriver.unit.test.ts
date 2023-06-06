import {BecomeADriver} from "../../usecase/driver/BecomeADriver";
import {InMemoryDriverRepository} from "../../../adapters/repositories/inmemory/InMemoryDriverRepository";
import {DriverRepository} from "../../domain/repositories/DriverRepository";
import { User } from "../../domain/entities/User";
import { Car } from "../../domain/entities/Car";
describe ("Unit - BecomeADriver", () => {
    let driverRepository: DriverRepository;
    let becomeDriver: BecomeADriver;
    let user: User;
    let car : Car;
    beforeAll(()=>{
        driverRepository = new InMemoryDriverRepository()
        becomeDriver = new BecomeADriver(driverRepository)
        user = User.create({
            email:"azerty@outl.com",
            firstName:"",
            lastName:"",
            password:"azerty123456ABC",
            phoneNumber:"",
            profilePictures:"",
        })
        car = Car.create({
            model:"",
            picture:"",
            registration:"",
            seats:0,
        })
    })
   it ("Become a driver", async () =>{
       const driver = await becomeDriver.execute ({
            userId: user.userProperty.id,
            carId: car.carProps.id,
            identityId: "123455667",
            driversLicense: "23564578",
            insurance: "Axa",
            kbis: "kbis76544",
            carRegistrationDocument: "P911BJ914KM",
       })
       expect(driver.driverProperty.kbis).toEqual("kbis76544")
   })
})