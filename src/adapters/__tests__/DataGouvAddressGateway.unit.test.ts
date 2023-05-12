import {DataGouvAddressGateway} from "../gateways/DataGouvAddressGateway";
import axios from "axios";

describe ("Unit - DataGouvAddressGetway", () => {
    jest.mock('axios');

    describe('DataGouvAddressGateway', () => {
        let dataGouvAddressGateway: DataGouvAddressGateway;

        beforeEach(() => {
            dataGouvAddressGateway = new DataGouvAddressGateway();
        });
    it("recupérer les données d'une adresse ", async () =>{

        const expectedAddress = {
            long: 2.3581477,
            lat: 48.8785183,
            streetAddress: '8 Boulevard du Port',
            city: 'Neuilly-sur-Seine',
            zipCode: '92200',
        };

        const mockAxiosResponse = {
            data: {
                features: [
                    {
                        geometry: {
                            coordinates: [2.3581477, 48.8785183],
                        },
                        properties: {
                            name: '8 Boulevard du Port',
                            city: 'Neuilly-sur-Seine',
                            postcode: '92200',
                        },
                    },
                ],
            },
        };

        (axios as jest.Mocked<typeof axios>).mockResolvedValue(mockAxiosResponse);

        const result = await dataGouvAddressGateway.getAddress('8 bd du port');

        expect(result).toEqual(expectedAddress);
    });
    })
})