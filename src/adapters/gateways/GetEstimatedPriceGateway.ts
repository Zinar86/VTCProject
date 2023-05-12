import {EstimatePriceGateway} from "../../core/gateways/EstimatePriceGateway";
import {RideType} from "../../core/ValueObject/RideType";
import dotenv from "dotenv"
import {GetCalculatedDistanceGateway} from "./GetCalculatedDistanceGateway";
import {Address} from "../../core/ValueObject/Address";

dotenv.config()


export class GetEstimatedPriceGateway implements EstimatePriceGateway {
    getCalculatedDistanceGateway : GetCalculatedDistanceGateway;
    constructor(getCalculatedDistanceGateway : GetCalculatedDistanceGateway) {
        this.getCalculatedDistanceGateway = getCalculatedDistanceGateway
    }


    estimatePrice(rideType: RideType, startAddress: Address, endAddress: Address): number {
        const distance = this.getCalculatedDistanceGateway.calculateDistance(startAddress, endAddress);
        const ratePerKm = Number(process.env.RATEPERKM);
        switch (rideType) {
            case RideType.Eco :
                return (distance * ratePerKm) + 2;
            case RideType.Berline :
                return (distance * ratePerKm) + 7;
            case RideType.Van :
                return (distance * ratePerKm) + 6;
            case RideType.Green :
                return (distance * ratePerKm);
            case RideType.Comfort :
                return (distance * ratePerKm) + 10;
            default :
                throw new Error("RIDE_TYPE_UNDEFINED")
        }

    }
}