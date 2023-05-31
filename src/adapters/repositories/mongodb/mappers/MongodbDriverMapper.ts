import {Driver} from "../../../../core/domain/entities/Driver";
import {Car} from "../../../../core/domain/entities/Car";
export class MongodbDriverMapper {
    toDomain(driver){
        return new Driver({
            id: driver.id,
            driversLicense: driver.driversLicense,
            kbis: driver.kbis,
            insurance: driver.insurance,
            carRegistrationDocument: driver.carRegistrationDocument,
            identityId: driver.identityId,
            car: new Car({
                id: driver.car.id,
                model: driver.car.model,
                picture: driver.car.picture,
                registration: driver.car.registration,
                seats: driver.car.seats
            })
        })
    }
}