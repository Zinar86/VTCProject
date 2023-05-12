import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";

export interface EstimatePriceGateway{
    estimatePrice(rideType : RideType, startAddress: Address, endAddress: Address): number
}