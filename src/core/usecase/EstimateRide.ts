import {GetEstimatedPriceGateway} from "../../adapters/gateways/GetEstimatedPriceGateway";
import {RideType} from "../domain/ValueObject/RideType";
import {Address} from "../domain/ValueObject/Address";

export interface EstimateRideProps {
        startAddress: Address;
        endAddress: Address;
        rideType : RideType;
}

export class EstimateRide {
    estimatePriceGateway : GetEstimatedPriceGateway;
    constructor(estimatePriceGateway : GetEstimatedPriceGateway){
        this.estimatePriceGateway = estimatePriceGateway
    }
    execute( payload: EstimateRideProps ){
        return Math.round(this.estimatePriceGateway.estimatePrice(payload.rideType, payload.startAddress, payload.endAddress)*100)/100;
    }
}