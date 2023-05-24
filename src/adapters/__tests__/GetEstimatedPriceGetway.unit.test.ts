import {GetEstimatedPriceGateway} from "../gateways/GetEstimatedPriceGateway";
import {RideType} from "../../core/domain/ValueObject/RideType";
import {GetCalculatedDistanceGateway} from "../gateways/GetCalculatedDistanceGateway";

describe ("Unit - GetEstimatedPriceGateway", () => {

    const estimatePrice = new GetEstimatedPriceGateway(new GetCalculatedDistanceGateway());
    it("Estimer le prix d'un trajet with valid ride type ", async () =>{
        const startAddress =  {
            long: 2.290084,
            lat: 49.897442,
            streetAddress: "8 Boulevard du Port",
            city: "Amiens",
            zipCode: "80000",
        };
        const endAddress = {
            long: 2.408338,
            lat: 48.847671,
            streetAddress: "89 Cours de Vincennes",
            city: "Paris",
            zipCode: "75020"
        }
        const distance = estimatePrice.estimatePrice(RideType.Berline, startAddress, endAddress )

        expect(distance).toEqual(57)
    })
})






