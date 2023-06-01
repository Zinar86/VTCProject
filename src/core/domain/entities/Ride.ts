import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";
import {v4} from "uuid";
import {RideStatus} from "../ValueObject/RideStatus";

export interface RideProps {
    id: string;
    userId?: string;
    driverId?: string;
    startAddress?: string;
    endAddress?: string;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    status: RideStatus;
    }

export class Ride {
    rideProps: RideProps
    constructor(rideProps: RideProps) {
        this.rideProps= rideProps
    }
    static create(props:{
        userId: string,
        driverId: string,
        startAddress: string,
        endAddress: string,
        priceEstimation: number,
        paymentMethod: PaymentMethod,
        rideType: RideType,
    }){
        return new Ride({
            ...props,
            id : v4(),
            status: RideStatus.pending
        }, )
    }
}