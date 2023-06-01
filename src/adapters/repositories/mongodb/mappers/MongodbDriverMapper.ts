import {Driver} from "../../../../core/domain/entities/Driver";
export interface MongoDbDriverModel {
    id: string;
    driversLicense: string;
    kbis: string;
    insurance: string;
    carRegistrationDocument: string;
    identityId: string;
    car: string;
}
export class MongodbDriverMapper {
    toDomain(driver: MongoDbDriverModel): Driver {
        return new Driver({
            id: driver.id,
            driversLicense: driver.driversLicense,
            kbis: driver.kbis,
            insurance: driver.insurance,
            carRegistrationDocument: driver.carRegistrationDocument,
            identityId: driver.identityId,
            car: driver.car
        })
    }
    fromDomain(driver :Driver): MongoDbDriverModel {
        return {
            id: driver.driverProperty.id,
            driversLicense: driver.driverProperty.driversLicense,
            kbis: driver.driverProperty.kbis,
            insurance: driver.driverProperty.insurance,
            carRegistrationDocument: driver.driverProperty.carRegistrationDocument,
            identityId: driver.driverProperty.identityId,
            car: driver.driverProperty.car
        }
    }
}