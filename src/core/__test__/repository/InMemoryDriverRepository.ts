import{DriverRepository} from "../../repositories/DriverRepository";
import {Driver} from "../../entities/Driver";
import {BecomeADriver} from "../../usecase/driver/BecomeADriver";

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
            throw new Error("USER_NOT_FOUND")
        }
        return driver;
    }
}