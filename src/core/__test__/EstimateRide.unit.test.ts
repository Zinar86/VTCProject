import {EstimateRide} from "../usecase/EstimateRide";
import {GetEstimatedPriceGateway} from "../../adapters/gateways/GetEstimatedPriceGateway";
import {RideType} from "../domain/ValueObject/RideType";
import {GetCalculatedDistanceGateway} from "../../adapters/gateways/GetCalculatedDistanceGateway";

describe("Unit - EstimatePrice", () => {
    it("doit retourner une estimation du prix d'une course d'un point A a un point B", async ()=>{
        const startAddress ={
            long: 2.290084,
            lat: 49.897443,
            streetAddress: "8 Boulevard du Port",
            city: "Amiens",
            zipCode: "80000",
        };
        const endAddress ={
            long: 2.408338,
            lat: 48.847671,
            streetAddress: "89 Cours de Vincennes",
            city: "Paris",
            zipCode: "75020",
        };
        const rideType = RideType.Green;
        const getCalculatedDistanceGateway = new GetCalculatedDistanceGateway()
        const estimatePriceGateway = new GetEstimatedPriceGateway(getCalculatedDistanceGateway);
        const estimateRide = new EstimateRide(estimatePriceGateway);
        const result = estimateRide.execute({
            rideType:rideType,
            startAddress:startAddress,
            endAddress:endAddress
        })
        expect(result).toEqual(50 )
    })
})