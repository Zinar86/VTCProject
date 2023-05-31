import {Mapper} from "../../../core/domain/Mapper";
import {AddressResponse} from "../../../core/domain/ValueObject/AddressResponse";
import {DataGouvAddressApiResponse} from "../estimateRide/DataGouvAddressGateway";

export class DataGouvAddressResponseMapper implements Mapper< AddressResponse, DataGouvAddressApiResponse >{
    toDomain(input: DataGouvAddressApiResponse): AddressResponse {
        return {
            long: input.features[0].geometry.coordinates[0],
            lat: input.features[0].geometry.coordinates[1],
            streetAddress: input.features[0].properties.name,
            city: input.features[0].properties.city,
            zipCode:  input.features[0].properties.postcode
        }
    }


}