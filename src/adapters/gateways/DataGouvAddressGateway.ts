import {AddressGateway} from "../../core/gateways/AddressGateway";
import {Address} from "../../core/ValueObject/Address";
import axios from "axios";


export class DataGouvAddressGateway implements AddressGateway{
    async getAddress(input : string): Promise<Address>{
        const response = await axios({
            method: 'GET',
            url: `https://api-adresse.data.gouv.fr/search/`,
            headers: {Accept: "application/json"},
            params: {
                q : input,
                lim : 1,
            }
        })
        const addressProps : {
            long = response.data.coordinates[0]
            lat = response.data.coordinates[1]
            streetAddress = response.data.properties.name
            city = response.data.properties.city
            zipCode =  response.data.postcode
        }
    }
}

