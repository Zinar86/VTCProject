import {DriverRepository} from "../../../core/domain/repositories/DriverRepository";
import {Driver} from "../../../core/domain/entities/Driver";


export class InMemoryDriverRepository implements DriverRepository{
    listDriver: Driver[] = [];
    async save(driver: Driver): Promise<Driver> {
        this.listDriver.push(driver)
        return driver;
    }
    async getById(id: string): Promise<Driver> {
        const driver = this.listDriver.find(driver=>
            driver.driverProperty.id === id
        )
        if (!driver){
            throw new Error("DRIVER_NOT_FOUND")
        }
        return driver;
    }
    async getAllDriver(): Promise<Driver[]> {
        return this.listDriver;
    }
}