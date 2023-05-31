import * as axios from 'axios';
import {AddressGateway} from "../../../core/gateways/AddressGateway";
import {DataGouvAddressResponseMapper} from "../mappers/DataGouvAddressResponseMapper";
import {AddressResponse} from "../../../core/domain/ValueObject/AddressResponse";
export interface DataGouvAddressApiResponse {
    type: string
    version: string
    features: Feature[]
    attribution: string
    licence: string
    query: string
    limit: number
}

export interface Feature {
    type: string
    geometry: Geometry
    properties: Properties
}

export interface Geometry {
    type: string
    coordinates: number[]
}

export interface Properties {
    label: string
    score: number
    id: string
    name: string
    postcode: string
    citycode: string
    x: number
    y: number
    city: string
    context: string
    type: string
    importance: number
    street: string
    housenumber?: string
}
export class DataGouvAddressGateway implements AddressGateway{
    constructor(private httpClient: axios.AxiosInstance,
                private dataGouvAddressResponseMapper: DataGouvAddressResponseMapper){}
    async getAddress(input : string): Promise<AddressResponse>{
        try{
            const response = await this.httpClient.get<DataGouvAddressApiResponse>(`/search/?q=${input}&lim=1`)
            return this.dataGouvAddressResponseMapper.toDomain(response.data);
        }
        catch(e){
            console.log(e);
            throw e
        }

    }
}

