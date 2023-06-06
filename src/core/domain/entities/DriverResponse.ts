import { Car } from "./Car";

export interface DriverResponse {
    userId: string;
    car : string;
    identityId: string,
    driversLicense: string,
    insurance: string,
    kbis: string
    carRegistrationDocument: string
}