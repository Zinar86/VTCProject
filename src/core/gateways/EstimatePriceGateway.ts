import {RideType} from "../ValueObject/RideType";

export interface EstimatePriceGateway{
    estimatePrice(distance : number, rideType : RideType): number
}