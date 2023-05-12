import {DataGouvAddressGateway} from "../gateways/DataGouvAddressGateway";
import {GetCalculatedDistanceGateway} from "../gateways/GetCalculatedDistanceGateway";

describe ("Unit - GetCalculatedDistanceGetway", () => {
    const calculerDistance = new GetCalculatedDistanceGateway();
    it("calculer la distances entre deux coordonnées ", async () =>{

        const distance = calculerDistance.calculateDistance(
            {
                long: 2.290084,
                lat: 49.897442,
                streetAddress: "8 Boulevard du Port",
                city: "Amiens",
                zipCode: "80000",
            },
            {
                long: 2.408338,
                lat: 48.847671,
                streetAddress: "89 Cours de Vincennes",
                city: "Paris",
                zipCode: "75020"
            }
        )

        expect(distance).toEqual(117.04274957915962)
    })
})