import { compareSync } from 'bcrypt';
export class ComparePasswordCryptPassword {
    execute(password: string, passwordCrypt: string){
        return compareSync(password, passwordCrypt);
    }
}