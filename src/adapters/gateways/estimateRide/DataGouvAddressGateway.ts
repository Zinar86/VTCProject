import {AddressGateway} from "../../../core/gateways/AddressGateway";
import {Address} from "../../../core/domain/ValueObject/Address";
import axios from "axios";


export class DataGouvAddressGateway implements AddressGateway{
    async getAddress(input : string): Promise<Address>{
        const response = await axios({
            method: 'GET',
            url: `https://api-adresse.data.gouv.fr/search/`,
            params: {
                q : input,
                lim : 1,
            }

        })
        return {
            long: response.data.features[0].geometry.coordinates[0],
            lat: response.data.features[0].geometry.coordinates[1],
            streetAddress: response.data.features[0].properties.name,
            city: response.data.features[0].properties.city,
            zipCode:  response.data.features[0].properties.postcode,
        }
    }
}

