import {Request, Response, Router} from "express";
import {DriverRepository} from "../../../core/domain/repositories/DriverRepository";
import {InMemoryDriverRepository} from "../../../core/__test__/repository/InMemoryDriverRepository";
import {BecomeADriver} from "../../../core/usecase/driver/BecomeADriver";
import { DriverApiResponseMapper } from "../user/mappers/DriverApiResponseMapper";

export const driverRouter : Router = Router();

const driverRepository : DriverRepository = new InMemoryDriverRepository()
const becomeadriver = new BecomeADriver(driverRepository)
const driverApiResponseMapper = new DriverApiResponseMapper();
driverRouter.post("/become/" ,async (req: Request, res: Response)=>{
 try {
    const driver = await becomeadriver.execute({
        id: req.body.id,
        car: req.body.car,
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
     return res.status(401).send(error.message)}
})



