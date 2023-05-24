import {DriverRepository} from "../../../core/repositories/DriverRepository";
import {Driver} from "../../../core/entities/Driver";
import {DriverModel} from "./models/DriverModel";
import {MongodbDriverMapper} from "./mappers/MongodbDriverMapper";

export class MongodbDriverRepository implements DriverRepository {
    driverMapper = new MongodbDriverMapper()
    async getById(id: string): Promise<Driver> {
        const result = await DriverModel.findOne({
            id: id
        });
        if (!result){
            throw new Error("DRIVER_NOT_FOUND");
        }
        return this.driverMapper.toDomain(result)
    }
    async save(driver: Driver): Promise<Driver> {
        await DriverModel.findOneAndUpdate(
            {
                id: driver.driverProperty.id
            },
            {
                $set: {
                    id: driver.driverProperty.id,
                    driversLicense: driver.driverProperty.driversLicense,
                    kbis: driver.driverProperty.kbis,
                    insurance: driver.driverProperty.insurance,
                    carRegistrationDocument: driver.driverProperty.carRegistrationDocument,
                    identityId: driver.driverProperty.identityId,
                    car: driver.driverProperty.car,
                }
            },
            {
                upsert: true,
            }
        )


        return driver;
    }


}