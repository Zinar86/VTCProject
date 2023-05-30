import * as nock from "nock";
import axios from 'axios';
import {DataGouvAddressGateway} from "../gateways/estimateRide/DataGouvAddressGateway";
import {DataGouvAddressResponseMapper} from "../gateways/mappers/DataGouvAddressResponseMapper";

describe ("Integration - DataGouvAddressGateway", () => {
    let httpClient;
    let dataGouvAddressGateway;
    let toAddressApiResponse;
    beforeEach(()=>{
        httpClient = axios.create({baseURL: "https://api-adresse.data.gouv.fr/"});
        toAddressApiResponse = new DataGouvAddressResponseMapper()
        dataGouvAddressGateway = new DataGouvAddressGateway(httpClient, toAddressApiResponse)
    })

    it("should retrieve address data with a string input",async () => {
        //GIVEN
        const responseMock = {
            data: {
                features: [
                    {
                        geometry: {
                            coordinates: [2.12345, 48.98765],
                        },
                        properties: {
                            name: '8 rue du pont',
                            city: 'Neuilly-sur-Seine',
                            postcode: '92200',
                        },
                    },
                ],
            },
        };
        nock(`https://api-adresse.data.gouv.fr/search/?q=8+rue+du+pont+Neuilly+sur+seine+92200&lim=1`)
            .get('/')
            .reply(200, responseMock)
        ;
        //WHEN
        const result = await dataGouvAddressGateway.getAddress('8+rue+du+pont+Neuilly+sur+seine+92200');
        //THEN
        expect(result.zipCode).toEqual("80000");
    });
})