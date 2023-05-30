import {InMemoryCarRepository} from "../repository/InMemoryCarRepository";
import {CreateCar} from "../../usecase/driver/CreateCar";

describe("Unit - CreateCar", () => {
    let carRepo;
    beforeEach(() => {
        carRepo = new InMemoryCarRepository();
    })
    it("Must create a car", async () => {
        const createCar = new CreateCar(carRepo);
        const result = await createCar.execute({
            picture: "",
            registration: "",
            seats: 10,
            model: ""
        })
    expect(result.carProps.seats).toEqual(10)
    })
})