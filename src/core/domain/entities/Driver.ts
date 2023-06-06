import {Address} from "../ValueObject/Address";
import {v4} from "uuid";

export interface DriverProperty {
    id: string;
    userId: string;
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
      car: string;
      identityId: string;
      driversLicense: string;
      insurance: string;
      kbis: string;
      carRegistrationDocument: string;
      userId: string;
  }){
        return new Driver({
            ...props,
        id: v4()})
  }
  saveCar(id: string){
     this.driverProperty.car = id;
  }
}