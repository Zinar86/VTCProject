import {User} from "../../core/entities/User";
import * as mongoose from 'mongoose';
import { UserRepository } from "../../core/repositories/UserRepository";
import { MongodbUserRepository } from "../repositories/mongodb/MongodbUserRepositories";

describe('Integration - MongodbUserRepository', () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        userRepository = new MongodbUserRepository();
        await mongoose.connect('mongodb://127.0.0.1:27017/VTCProject')
    })

    afterAll(async () => {
        await mongoose.disconnect();
    });

    it('Doit sauvegarder un document dans ma base de donnée mongodb', async () => {
        const user = await User.create({
            email: "email@azerty.com",
            firstName: 'john',
            lastName: 'doe',
            password: 'jesuisunpassword',
            phoneNumber: '0606060606',
            profilePictures: 'https://www.google.com',
        })
        const result = await userRepository.save(user);
    })
})