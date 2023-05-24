import {Car} from "./Car";

export interface DriverProperty {
    id: string;
    car : Car;
    identityId: string,
    driversLicense: string,
    insurance: string,
    kbis: string
    carRegistrationDocument: string
}
export class Driver {
    driverProperty : DriverProperty
  constructor(driverProperty : DriverProperty) {
      this.driverProperty = driverProperty
  }
  static create(props:{
      id: string;
      car: Car;
      identityId: string;
      driversLicense: string;
      insurance: string;
      kbis: string;
      carRegistrationDocument: string;
  }){
        return new Driver(props)
  }

}