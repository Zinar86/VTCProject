import {DataGouvAddressGateway} from "../gateways/DataGouvAddressGateway";
import axios from "axios";

describe ("Unit - DataGouvAddressGateway", () => {
    const dataGouvAddressGateway = new DataGouvAddressGateway()

    it("recupérer les données d'une adresse ", async () => {

        const expectedAddress = {
            long: 2.25887,
            lat: 48.887541,
            streetAddress: 'Rue du Pont',
            city: 'Neuilly-sur-Seine',
            zipCode: '92200',
        };

        const result = await dataGouvAddressGateway.getAddress('8 rue du pont Neuilly sur seine 92200');
        expect(result).toEqual(expectedAddress);
    });
})