import {OrderRide} from "../../usecase/ride/OrderRide";
import {RideType} from "../../domain/ValueObject/RideType";
import {PaymentMethod} from "../../domain/ValueObject/PaymentMethod";
import {InMemoryRideRepository} from "../../../adapters/repositories/inmemory/InMemoryRideRepository";
import { EstimateRide } from "../../usecase/ride/EstimateRide";
import { GetEstimatedPriceGateway } from "../../../adapters/gateways/estimateRide/GetEstimatedPriceGateway";
import { GetCalculatedDistanceGateway } from "../../../adapters/gateways/estimateRide/GetCalculatedDistanceGateway";
describe ("Unit - OrderRide", () => {
    let estimateRide: EstimateRide;
    let estimatePriceGateway : GetEstimatedPriceGateway;
    let getCalculatedDistanceGateway : GetCalculatedDistanceGateway;
    let startAddress;
    let endAddress;
    beforeAll(() => {
        getCalculatedDistanceGateway = new GetCalculatedDistanceGateway()
        estimatePriceGateway = new GetEstimatedPriceGateway(getCalculatedDistanceGateway)
        estimateRide = new EstimateRide(estimatePriceGateway);
        startAddress = {
            long: 10,
            lat: 1,
            streetAddress: "string",
            city: "string",
            zipCode: "string",
        }
        endAddress = {
            long: 1.1,
            lat: 1,
            streetAddress: "string",
            city: "string",
            zipCode: "string",
        }
    })
    it("must create a ride", async () => {
        const rideRepo = new InMemoryRideRepository()
        const orderRide = new OrderRide(rideRepo);
        const ride = await orderRide.execute({
            userId: "marchal",
            startAddress: "44 rue du pont",
            endAddress: "3 boulevard des monts",
            priceEstimation: estimateRide.execute({
                endAddress: endAddress,
                rideType: RideType.Eco ,
                startAddress: startAddress,
            }),
            paymentMethod: PaymentMethod.cash,
            rideType: RideType.Eco,
        })
        await rideRepo.save(ride);
        console.log("PRICE ESTIMATION ===>", ride.rideProps.priceEstimation)
        expect(ride.rideProps.userId).toEqual("marchal");
    });
})