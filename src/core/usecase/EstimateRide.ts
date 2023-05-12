import {GetEstimatedPriceGateway} from "../../adapters/gateways/GetEstimatedPriceGateway";
import {RideType} from "../ValueObject/RideType";

export interface EstimateRideProps {
        distance : number
        rideType : RideType
}

export class EstimateRide {
    estimatePriceGateway : GetEstimatedPriceGateway
    constructor(estimatePriceGateway : GetEstimatedPriceGateway){
        this.estimatePriceGateway = estimatePriceGateway
    }
    execute( payload: EstimateRideProps ){
        this.estimatePriceGateway.estimatePrice(payload.distance, payload.rideType)
    }
}