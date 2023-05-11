import {EstimatePriceGateway} from "../../core/gateways/EstimatePriceGateway";
import {RideType} from "../../core/ValueObject/RideType";

export class GetEstimatedPriceGateway implements EstimatePriceGateway {
    estimatePrice(distance: number, rideType: RideType): number {
        const ratePerKm = Number(process.env.RATEPERKM)
        if (rideType == "eco") {
            return (distance * ratePerKm) + 2 }
        if (rideType == "comfort") {
            return (distance * ratePerKm) + 10 }
        if (rideType == "berline") {
            return (distance * ratePerKm) + 7}
        if (rideType == "van") {
            return (distance * ratePerKm) + 6 }
        if (rideType == "green") {
            return (distance * ratePerKm) }
        else throw new Error("UNDEFINED_RIDE_TYPE")

    }
}