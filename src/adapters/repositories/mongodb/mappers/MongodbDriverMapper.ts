import {Driver} from "../../../../core/domain/entities/Driver";


export class MongodbDriverMapper{
    toDomain(driver){
        return new Driver({
            id: driver.id,
            driversLicense: driver.driversLicense,
            kbis: driver.kbis,
            insurance: driver.insurance,
            carRegistrationDocument: driver.carRegistrationDocument,
            identityId: driver.identityId,
            car: {
                id: driver.car.id,
                model: driver.car.model,
                picture: driver.car.picture,
                registration: driver.car.registration
            }
        })
    }
}