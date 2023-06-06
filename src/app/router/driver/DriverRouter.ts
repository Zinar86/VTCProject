import {Request, Response, Router} from "express";
import {DriverRepository} from "../../../core/domain/repositories/DriverRepository";
import {InMemoryDriverRepository} from "../../../adapters/repositories/inmemory/InMemoryDriverRepository";
import {BecomeADriver} from "../../../core/usecase/driver/BecomeADriver";
import { DriverApiResponseMapper } from "../user/mappers/DriverApiResponseMapper";
import {CreateCar} from "../../../core/usecase/driver/CreateCar";
import {MongodbCarRepository} from "../../../adapters/repositories/mongodb/MongodbCarRepository";
import {OrderRide} from "../../../core/usecase/ride/OrderRide";
import {MongodbDriverRepository} from "../../../adapters/repositories/mongodb/MongodbDriverRepository";
import {MongodbRideRepository} from "../../../adapters/repositories/mongodb/MongodbRideRepository";
export const driverRouter : Router = Router();

const driverRepository : DriverRepository = new MongodbDriverRepository();
const carRepository = new MongodbCarRepository();
const rideRepository = new MongodbRideRepository();
const orderRide = new OrderRide(rideRepository);
const becomeDriver = new BecomeADriver(driverRepository)
const driverApiResponseMapper = new DriverApiResponseMapper();
const createCar = new CreateCar(carRepository, driverRepository);

driverRouter.post("/become" ,async (req: Request, res: Response)=>{
 try {
    const driver = await becomeDriver.execute({
        userId: req.body.userId,
        carId: req.body.carId,
        identityId: req.body.identityId,
        driversLicense: req.body.driversLicense,
        insurance: req.body.insurance,
        kbis: req.body.kbis,
        carRegistrationDocument: req.body.carRegistrationDocument,
    })
    
    const toApiResponse = driverApiResponseMapper.fromDomain(driver);
    return res.status(201).send(toApiResponse);
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
driverRouter.post("/orderRide", (req: Request, res: Response)=>{
    try {
        const ride = orderRide.execute({
            rideType: req.body.rideType,
            driverId:req.body.driverId,
            paymentMethod:req.body.paymentMethod,
            priceEstimation:req.body.priceEstimation,
            endAddress:req.body.endAddress,
            startAddress:req.body.startAddress,
            userId:req.body.userId,
        })
        return res.status(200).send(ride);
    }
    catch(error){
        return res.status(401).send({
                message: error.message
            }
        )
    }
})



