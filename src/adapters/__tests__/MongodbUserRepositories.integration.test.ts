import {User} from "../../core/domain/entities/User";
import * as mongoose from 'mongoose';
import { UserRepository } from "../../core/domain/repositories/UserRepository";
import { MongodbUserRepository } from "../repositories/mongodb/MongodbUserRepositories";
import {Connection} from "mongoose";
import {MongoMemoryServer} from "mongodb-memory-server";
jest.setTimeout(10000000);
describe('Integration - MongodbUserRepository', () => {
    let userRepository: UserRepository;
    let connection: Connection;

    beforeAll(async () => {
        userRepository = new MongodbUserRepository();
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        console.log(uri)
        await mongoose.connect(`${uri}VTCProject`)
        connection = await mongoose.createConnection(`${uri}VTCProject`)

    })

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
    });

    it('Should save a user in mnogodb repository', async () => {
        const user = await User.create({
            email: "email@azerty.com",
            firstName: 'john',
            lastName: 'doe',
            password: 'jesuisunpassword',
            phoneNumber: '0606060606',
            profilePictures: 'https://www.google.com',
        })
        await userRepository.update(user);
    })
    it("must get a user by is ID", async () => {
        const user = await User.create({
            email: "ezzzl@qfa.com",
            firstName: 'john',
            lastName: 'doe',
            password: 'jesuisunpassword',
            phoneNumber: '0606060606',
            profilePictures: 'https://www.google.com',
        })
        await userRepository.update(user);
        const resultUser = await userRepository.getById(user.userProperty.id);
        expect(resultUser.userProperty.id).toEqual(user.userProperty.id)
    })
})