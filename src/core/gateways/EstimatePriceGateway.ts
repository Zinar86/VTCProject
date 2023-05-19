import {RideType} from "../domain/ValueObject/RideType";
import {Address} from "../domain/ValueObject/Address";

export interface EstimatePriceGateway{
    estimatePrice(rideType : RideType, startAddress: Address, endAddress: Address): number
}