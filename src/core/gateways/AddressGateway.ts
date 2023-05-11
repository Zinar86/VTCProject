import {Address} from "../ValueObject/Address";

export interface AddressGateway{
    getAddress(input : string): Promise<Address>
}