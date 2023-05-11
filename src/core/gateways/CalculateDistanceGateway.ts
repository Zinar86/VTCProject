import {Address} from "../ValueObject/Address";

export interface CalculateDistanceGateway {
    calculateDistance(startAddress: Address, endAddress: Address): number
    degreeToRadian(degree: number): number
    distanceBetweenEarthCoordinatesInKm (lat1: number, lon1: number, lat2: number, lon2: number) : number
}