import {OrderRide} from "../../core/usecase/ride/OrderRide";
import {v4} from "uuid";
import {RideType} from "../../core/domain/ValueObject/RideType";
import {PaymentMethod} from "../../core/domain/ValueObject/PaymentMethod";
import {InMemoryRideRepository} from "../repositories/inmemory/InMemoryRideRepository";


describe ("Unit - OrderRide", () => {

    it("must create a ride", async () => {
        const newRide = {
            id: v4(),
            userId: "marchal",
            startAddress: "44 rue du pont",
            endAddress: "3 boulevard des monts",
            priceEstimation: 115,
            paymentMethod: PaymentMethod.cash,
            rideType: RideType.Eco,
        }
        const rideRepo = new InMemoryRideRepository()
        const ride = new OrderRide(rideRepo);
        expect(newRide.userId).toEqual("marchal");
    });
})