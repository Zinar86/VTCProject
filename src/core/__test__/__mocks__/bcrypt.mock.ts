jest.mock("bcrypt", ()=>{
    return {
        genSaltSync: jest.fn().mockImplementation(()=>{
            return "123457889"
        }),
        compareSync: jest.fn().mockImplementation(()=>{
            return true
        }),
        hashSync: jest.fn().mockImplementation( ()=>{
            return "azerty"
        })
    }
});