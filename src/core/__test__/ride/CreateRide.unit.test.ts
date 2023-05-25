import {InMemoryRideRepository} from "../repository/InMemoryRideRepository";
import {CreateRide} from "../../usecase/ride/CreateRide";
import {Ride} from "../../domain/entities/Ride";
import {PaymentMethod} from "../../domain/ValueObject/PaymentMethod";
import {RideType} from "../../domain/ValueObject/RideType";

describe ("Unit - CreateRide", ()=>{
    it("should be able to create a ride", async ()=>{
        const rideRepo = new InMemoryRideRepository();
        const createRide = new CreateRide(rideRepo);
        const ride : Ride = await createRide.execute({
            userId: "string",
            startAddress: {
                city: "paris",
                lat: 0,
                long: 0,
                streetAddress:"",
                zipCode:"93200"
            },
            endAddress: {
                city: "paris",
                lat: 0,
                long: 0,
                streetAddress:"",
                zipCode:"75000"
            },
            priceEstimation: 0,
            paymentMethod: PaymentMethod.cash,
            rideType: RideType.Green,
        })
        expect(ride.rideProps.userId).toEqual("string")
    })
})