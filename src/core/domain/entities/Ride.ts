import {PaymentMethod} from "../ValueObject/PaymentMethod";
import {RideType} from "../ValueObject/RideType";
import {Address} from "../ValueObject/Address";
import {v4} from "uuid";
export interface RideProps {
    id: string;
    userId: string,
    startAddress?: Address;
    endAddress?: Address;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    }

export class Ride {
    rideProps: RideProps
    constructor(rideProps: RideProps) {
        this.rideProps= rideProps
    }
    static create(props:{
        userId: string,
        startAddress: Address,
        endAddress: Address,
        priceEstimation: number,
        paymentMethod: PaymentMethod,
        rideType: RideType,
    }){
        return new Ride({
            ...props,
            id : v4(),
        }, )
    }
}