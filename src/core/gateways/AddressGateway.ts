import {Address} from "../domain/ValueObject/Address";

export interface AddressGateway{
    getAddress(input : string): Promise<Address>
}