
import {Driver} from "../../domain/entities/Driver";
import {DriverRepository} from "../../domain/repositories/DriverRepository";

export interface BecomeDriverInput{
    id: string;
    carId: string;
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
            car: "",
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