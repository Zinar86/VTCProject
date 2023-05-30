import {DataGouvAddressGateway} from "../gateways/estimateRide/DataGouvAddressGateway";
import nock from "nock";
describe ("Integration - DataGouvAddressGateway", () => {
    const dataGouvAddressGateway = new DataGouvAddressGateway()


    it("should retrieve address data with a string input",async () => {
        //GIVEN
        const expectedAddress = {
            features:[
                {
                    geometry:{
                        coordinates:[
                            2.290084,
                            49.897443
                        ]
                    },
                    properties:{
                        name:"8 Boulevard du Port",
                        postcode:"80000",
                        city:"Amiens",

                    }
                }
            ],
        }
        nock('https://api-adresse.data.gouv.fr')
            .get('/search/?q=8%20rue%20du%20pont%20Neuilly%20sur%20seine%2092200&lim=1')
            //.query({params: {q : "8 rue du pont Neuilly sur seine 92200", lim : 1}})
            .reply(200, expectedAddress);
        //WHEN
        const result = await dataGouvAddressGateway.getAddress('8 rue du pont Neuilly sur seine 92200');
        //THEN
        expect(result.zipCode).toEqual("80000");
    });
})


/*lon: 2.25887,
    lat: 48.887541,
    streetAddress: 'Rue du Pont',
    city: 'Neuilly-sur-Seine',
    zipCode: '92200',*/