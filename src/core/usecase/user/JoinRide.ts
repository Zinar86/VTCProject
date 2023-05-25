import {Usecase} from "../Usecase";
import {Ride} from "../../domain/entities/Ride";
export interface JoinRideProps{
    rideId: string;
    userId: string;
}
export class JoinRide implements Usecase<JoinRideProps, Ride>{
    execute(payload?: JoinRideProps): Ride{
        return undefined;
    }

}