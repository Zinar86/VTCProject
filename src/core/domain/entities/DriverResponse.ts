import { Car } from "./Car";

export interface DriverResponse {
    id: string;
    car : string;
    identityId: string,
    driversLicense: string,
    insurance: string,
    kbis: string
    carRegistrationDocument: string
}