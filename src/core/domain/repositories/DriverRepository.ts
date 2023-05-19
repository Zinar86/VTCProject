import {Driver,} from "../entities/Driver";

export interface DriverRepository {
    save(driver: Driver): Promise<Driver>;
}