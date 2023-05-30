import {BecomeADriver} from "../../usecase/driver/BecomeADriver";
import {InMemoryDriverRepository} from "../repository/InMemoryDriverRepository";
import {DriverRepository} from "../../domain/repositories/DriverRepository";
describe ("Unit - BecomeADriver", () => {
   it ("Become a driver", async () =>{
       const driverRepository : DriverRepository = new InMemoryDriverRepository()
       const becomeDriver : BecomeADriver = new BecomeADriver(driverRepository)
       const driver = await becomeDriver.execute ({
           id: "86100",
           car: {
               id:"911",
               model:"porshe",
               picture:"photo",
               registration:"BJ-914-KM",
           },
           identityId: "123455667",
           driversLicense: "23564578",
           insurance: "Axa",
           kbis: "kbis76544",
           carRegistrationDocument: "P911BJ914KM",
       })
       expect(driver.driverProperty).toEqual({
           id: "86100",
           car: {
               id:"911",
               model:"porshe",
               picture:"photo",
               registration:"BJ-914-KM",
           },
           identityId: "123455667",
           driversLicense: "23564578",
           insurance: "Axa",
           kbis: "kbis76544",
           carRegistrationDocument: "P911BJ914KM",
       })
   })




})