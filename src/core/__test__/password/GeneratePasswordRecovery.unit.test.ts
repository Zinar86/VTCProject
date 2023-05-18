import {GeneratePasswordRecovery} from "../../usecase/user/passwords/GeneratePasswordRecovery";
import {InMemoryUserRepository} from "../repository/InMemoryUserRepository";
import {SendGridEmailGateway} from "../../../adapters/gateways/sendgrid/SendGridEmailGateway";

describe("Unit - GeneratePasswordRecovery", () => {
    it("Must send a mail with link to reset password", async () => {
        const userRepository = new InMemoryUserRepository();
        const sendGridEmailGateway = new SendGridEmailGateway()
        const generatePasswordRecovery = new GeneratePasswordRecovery(userRepository, sendGridEmailGateway);
        await generatePasswordRecovery.execute("heutte.nicolas@laposte.net")
    })
})