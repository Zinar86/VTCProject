import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {GetUserById} from "../../usecase/user/GetUserById";
import {User} from "../../entities/User";
import {BecomeADriver} from "../../usecase/driver/BecomeADriver";

describe ("Unit - BecomeADriver", () => {
   it ("devenir un Driver", async () =>{
       new BecomeADriver()
   })

})