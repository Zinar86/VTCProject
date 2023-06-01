import {Address} from "../ValueObject/Address";

export interface DriverProperty {
    id: string;
    car : string;
    identityId: string,
    driversLicense: string,
    insurance: string,
    kbis: string
    carRegistrationDocument: string;
    position?: Address;
}
export class Driver {
    driverProperty : DriverProperty
  constructor(driverProperty : DriverProperty) {
      this.driverProperty = driverProperty
  }
  static create(props:{
      id: string;
      car: string;
      identityId: string;
      driversLicense: string;
      insurance: string;
      kbis: string;
      carRegistrationDocument: string;
  }){
        return new Driver(props)
  }
  saveCar(id: string){
     this.driverProperty.car = id;
  }
}