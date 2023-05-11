
import {User} from "../../core/entities/User";
import * as mongoose from 'mongoose';
import { UserRepository } from "../../core/repositories/UserRepository";
import { MongodbUserRepository } from "../repositories/mongodb/MongodbUserRepositories";

function randomEmail() {
    return `john_${Math.random().toString(36).substring(7)}@doe.com`;
}


describe('Integration - MongodbUserRepository', () => {
    let userRepository: UserRepository;

    beforeAll(async () => {
        userRepository = new MongodbUserRepository();
        await mongoose.connect('mongodb+srv://vtc_75:bootcode@cluster0.ayyum.mongodb.net/?retryWrites=true&w=majority')
    })


    afterAll(async () => {
        await mongoose.disconnect();
    });


    it('Doit sauvegarder un document dans ma base de donnée mongodb', async () => {
        const user = await User.create({
            email: randomEmail(),
            firstName: 'john',
            lastName: 'doe',
            password: 'jesuisunpassword',
            phoneNumber: '0606060606',
            profilePictures: 'https://www.google.com',
        })
        const result = await userRepository.save(user);
    })
})