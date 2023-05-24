import {Address} from "../domain/ValueObject/Address";

export interface CalculateDistanceGateway {
    calculateDistance(startAddress: Address, endAddress: Address): number
}