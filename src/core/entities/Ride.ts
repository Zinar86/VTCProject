export interface Ride {
    id: string;
    startAddress: Adress;
    endAddress: Adress;
    priceEstimation: number;
    paymentMethod: PaymentMethod;
    rideType: RideType;
    };