import {BecomeADriver} from "../../usecase/driver/BecomeADriver";
import {DriverRepository} from "../../repositories/DriverRepository";
import {InMemoryDriverRepository} from "../repository/InMemoryDriverRepository";
import {Driver} from "../../entities/Driver";

describe ("Unit - BecomeADriver", () => {
   it ("devenir un Driver", async () =>{
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
       //expect(driver.driverProperty.driversLicense).toEqual("23564578")
       /*expect(driver.driverProperty.car).toEqual({
           id:"911",
           model:"porshe",
           picture:"photo",
           registration:"BJ-914-KM",
       })*/
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