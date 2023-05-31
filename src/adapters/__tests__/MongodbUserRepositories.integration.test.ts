import {User} from "../../core/domain/entities/User";
import * as mongoose from 'mongoose';
import { UserRepository } from "../../core/domain/repositories/UserRepository";
import { MongodbUserRepository } from "../repositories/mongodb/MongodbUserRepositories";
import {Connection} from "mongoose";

describe('Integration - MongodbUserRepository', () => {
    let userRepository: UserRepository;
    let connection: Connection;

    beforeAll(async () => {
        userRepository = new MongodbUserRepository();
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject')
        connection = await mongoose.createConnection('mongodb://127.0.0.1:27017/user')
    })

    afterAll(async () => {
        await connection.dropDatabase();
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