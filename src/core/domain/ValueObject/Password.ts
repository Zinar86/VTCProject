export class Password {
    value : string;
    constructor(password : string){
        const passwordValidate: boolean = this.passwordValid(password)
        //if(!passwordValidate){
        //    throw new Error("Minimum eight characters, at least one uppercase letter, one lowercase letter and one number")
        //}
        if (password.length <= 8){
            throw new Error("PASSWORD_MUST_CONTAIN_8_CHARACTER_MINIMUM")
        }
        this.value = password;
    }
    passwordValid(password: string){
        const regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/m);
        return regexp.test(password)
    }
}