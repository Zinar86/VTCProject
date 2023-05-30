import * as axios from 'axios';
import {AddressGateway} from "../../../core/gateways/AddressGateway";
import {DataGouvAddressResponseMapper} from "../mappers/DataGouvAddressResponseMapper";
import {AddressResponse} from "../../../core/domain/ValueObject/AddressResponse";

export class DataGouvAddressGateway implements AddressGateway{
    constructor(private httpClient: axios.AxiosInstance,
                private dataGouvAddressResponseMapper: DataGouvAddressResponseMapper){}
    async getAddress(input : string): Promise<AddressResponse>{
        try{
            const response = await this.httpClient.get(`/search/?q=${input}&lim=1`)
            return this.dataGouvAddressResponseMapper.fromDomain(response);
        }
        catch(e){
            console.log(e);
            throw e
        }

    }
}

