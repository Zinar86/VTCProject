import {DataGouvAddressGateway} from "../gateways/DataGouvAddressGateway";

describe ("Unit - DataGouvAddressGateway", () => {
    it("recupérer les données d'une adresse ", async () =>{
        const addressData = new DataGouvAddressGateway();
        const address = await addressData.getAddress("89 cours de Vincennes" )
        expect(address.streetAddress).toEqual("89 Cours de Vincennes")
    })
})