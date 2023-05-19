import {CalculateDistanceGateway} from "../../core/gateways/CalculateDistanceGateway";
import {Address} from "../../core/domain/ValueObject/Address";

export class GetCalculatedDistanceGateway implements CalculateDistanceGateway{
    calculateDistance(startAddress: Address, endAddress: Address): number {
        return this.distanceBetweenEarthCoordinatesInKm(startAddress.lat, startAddress.long, endAddress.lat, endAddress.long)
    }
    private degreeToRadian (degree: number) {
        return degree * Math.PI / 180;
    }

    private distanceBetweenEarthCoordinatesInKm (lat1: number, lon1: number, lat2: number, lon2: number){
        const earthRadiusInKm = 6371;

        const dLat = this.degreeToRadian(lat2 - lat1);
        const dLon = this.degreeToRadian(lon2 - lon1);

        lat1 = this.degreeToRadian(lat1);
        lat2 = this.degreeToRadian(lat2);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadiusInKm * c;
    }
}

