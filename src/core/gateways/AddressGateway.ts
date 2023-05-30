import {Address} from "../domain/ValueObject/Address";
import {AddressResponse} from "../domain/ValueObject/AddressResponse";

export interface AddressGateway{
    getAddress(input : string): Promise<AddressResponse>
}