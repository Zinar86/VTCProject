import {Address} from "../entities/Address";

export interface AddressRepository{
    create(address: Address): Promise<Address>;
    findById(id : string): Promise<Address>;
    update(address: Address): Promise<Address>;
    delete(id: string): Promise<void>;
    findAll(): Promise<Address[]>;
    findByCity(city: string): Promise<Address[]>;
}