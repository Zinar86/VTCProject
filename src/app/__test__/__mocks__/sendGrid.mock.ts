import {Msg} from "../../../core/domain/ValueObject/Msg";
jest.mock("@sendgrid/mail", ()=>{
    return {
        send: jest.fn().mockImplementation((msg: Msg)=>{
            if (msg.from === "nostrok.com"){
                throw new Error("NOT_GOOD")
            }
        }),
        setApiKey: jest.fn().mockImplementation()
    }
});