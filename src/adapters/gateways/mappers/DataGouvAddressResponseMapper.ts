import {Mapper} from "../../../core/domain/Mapper";
import { AxiosResponse } from "axios";
import {AddressResponse} from "../../../core/domain/ValueObject/AddressResponse";


export class DataGouvAddressResponseMapper implements Mapper< AxiosResponse, AddressResponse>{
    fromDomain(input: AxiosResponse): AddressResponse {
        return {
            long: input.data.features[0].geometry.coordinates[0],
            lat: input.data.features[0].geometry.coordinates[1],
            streetAddress: input.data.features[0].properties.name,
            city: input.data.features[0].properties.city,
            zipCode:  input.data.features[0].properties.postcode
        }
    }
}