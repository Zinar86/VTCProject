
import {Driver} from "../../entities/Driver";
import {DriverRepository} from "../../repositories/DriverRepository";
import {Car} from "../../entities/Car";

export interface BecomeDriverInput{
    id: string;
    car: Car;
    identityId: string;
    driversLicense: string;
    insurance: string;
    kbis: string;
    carRegistrationDocument: string;
}
export class BecomeADriver {
    driverRepository : DriverRepository
    constructor(driverRepository: DriverRepository) {
        this.driverRepository = driverRepository
    }
    async execute(input:BecomeDriverInput) :Promise<Driver> {
        const driver: Driver = Driver.create({
            id: input.id,
            car: input.car,
            identityId: input.identityId,
            driversLicense: input.driversLicense,
            insurance: input.insurance,
            kbis: input.kbis,
            carRegistrationDocument: input.carRegistrationDocument,
        })
        await this.driverRepository.save(driver);
        return driver;
    }
}