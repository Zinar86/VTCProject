import {Address} from "../ValueObject/Address";

export interface CalculateDistanceGateway {
    calculateDistance(startAddress : Address, endAddress : Address) : number

}