import {Request, Response, Router} from "express";
import {DriverRepository} from "../../../core/domain/repositories/DriverRepository";
import {InMemoryDriverRepository} from "../../../core/__test__/repository/InMemoryDriverRepository";
import {BecomeADriver} from "../../../core/usecase/driver/BecomeADriver";

export const driverRouter : Router = Router();

const driverRepository : DriverRepository = new InMemoryDriverRepository()
const becomeadriver = new BecomeADriver(driverRepository)
driverRouter.post("/become/driver",(req: Request, res: Response)=>{
    return res.status(200)
})


