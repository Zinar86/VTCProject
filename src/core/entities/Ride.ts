import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";
import {v4} from "uuid";

export interface Ride {
    id: string;
    userId: string,
    startAddress: Address;
    endAddress: Address;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    }