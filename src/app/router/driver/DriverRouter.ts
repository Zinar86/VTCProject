import {Request, Response, Router} from "express";
import {DriverRepository} from "../../../core/domain/repositories/DriverRepository";
import {InMemoryDriverRepository} from "../../../core/__test__/repository/InMemoryDriverRepository";
import {BecomeADriver} from "../../../core/usecase/driver/BecomeADriver";
import { DriverApiResponseMapper } from "../user/mappers/DriverApiResponseMapper";
import {CreateCar} from "../../../core/usecase/driver/CreateCar";
import {MongodbCarRepository} from "../../../adapters/repositories/mongodb/MongodbCarRepository";
export const driverRouter : Router = Router();

const driverRepository : DriverRepository = new InMemoryDriverRepository()
const becomeDriver = new BecomeADriver(driverRepository)
const driverApiResponseMapper = new DriverApiResponseMapper();
const carRepository = new MongodbCarRepository();
const createCar = new CreateCar(carRepository, driverRepository);
driverRouter.post("/become/" ,async (req: Request, res: Response)=>{
 try {
    const driver = await becomeDriver.execute({
        id: req.body.id,
        carId: "",
        identityId: req.body.identityId,
        driversLicense: req.body.driversLicense,
        insurance: req.body.insurance,
        kbis: req.body.kbis,
        carRegistrationDocument: req.body.carRegistrationDocument,
    })
    const toApiResponse = driverApiResponseMapper.fromDomain(driver);
    return res.status(200).send(toApiResponse);
 }
 catch (error){
     return res.status(401).send({
         message: error.message
        }
     )
 }
})
driverRouter.post("/createCar", async (req: Request, res: Response)=>{
    try{
        const car = createCar.execute({
            picture: req.body.picture,
            registration: req.body.registration,
            model: req.body.model,
            seats: req.body.seats,
            driverId: req.body.driverId
        })
        return res.status(200).send(car);
    }
    catch(error){
        return res.status(401).send({
                message: error.message
            }
        )
    }
})



