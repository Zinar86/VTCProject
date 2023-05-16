import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";
import {v4} from "uuid";

export interface RideProperty {
    id: string;
    userId: string,
    startAddress: Address;
    endAddress: Address;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    }

export class Ride {
    rideProperty: RideProperty;

    constructor(rideProperties: RideProperty) {
        this.rideProperty = rideProperties;
    }

    static async create(props: {
        userId: string,
        startAddress: Address,
        endAddress: Address,
        paymentMethod: PaymentMethod,
        rideType: RideType,
        priceEstimation : number,
    }) : Promise<Ride> {
        return new Ride({
            ...props,
            id: v4(),

        })
    }
}
