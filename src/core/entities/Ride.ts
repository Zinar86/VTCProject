import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";

export interface Ride {
    id: string;
    startAddress: Address;
    endAddress: Address;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    };