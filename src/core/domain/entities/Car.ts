import {v4} from "uuid";

export interface CarProps {
    id : string;
    registration : string;
    model: string;
    picture : string;
    seats: number;
}
export class Car {
    carProps: CarProps;
    constructor(carProps: CarProps) {
        this.carProps = carProps
    }
    static create(props: {
        registration : string;
        model: string;
        picture : string;
        seats: number;
    }){
        return new Car({
            ...props,
            id: v4()
        })
    }
    update(props :{
        registration : string,
        model: string,
        picture : string,
        seats?: number,
    }){
        this.carProps.registration = props.registration,
        this.carProps.model = props.model,
        this.carProps.picture = props.picture,
        this.carProps.seats = props.seats
    }
}