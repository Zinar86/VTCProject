import {GetEstimatedPriceGateway} from "../gateways/GetEstimatedPriceGateway";
import {RideType} from "../../core/ValueObject/RideType";

describe ("Unit - GetEstimatedPriceGateway", () => {
    const estimatePrice = new GetEstimatedPriceGateway();
    it("Estimer le prix d'un trajet with valid ride type ", async () =>{

        const distance = estimatePrice.estimatePrice(100, RideType.Berline)

        expect(distance).toEqual(57)
    })


    it("doit lever une exception quand le type du ride est invalide", async () =>{

        const distance = estimatePrice.estimatePrice(100, RideType.Green)

        await expect(distance).rejects.toThrow(new Error('UNDEFINED_RIDE_TYPE'));
    })
})






