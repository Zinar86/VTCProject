import { Car } from "./Car";

export interface DriverResponse {
    id: string;
    car : Car;
    identityId: string,
    driversLicense: string,
    insurance: string,
    kbis: string
    carRegistrationDocument: string
}