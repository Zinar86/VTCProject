import { genSaltSync, hashSync } from 'bcrypt';
export class CryptPassword {
    saltRounds = genSaltSync(10);
    execute(password: string){
        return hashSync(password, this.saltRounds)
    }

}