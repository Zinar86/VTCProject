export class Password {
    value : string;
    constructor(password : string){
        const passwordValidate: boolean = this.passwordValid(password)
        if(!passwordValidate){
            throw new Error("PASSWORD_MUST_CONTAIN_3_SPECIAL_CHARACTER")
        }
        if (password.length <= 8){
            throw new Error("PASSWORD_MUST_CONTAIN_8_CHARACTER_MINIMUM")
        }
        this.value = password;
    }
    passwordValid(password: string){
        const regexp = new RegExp(/^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{3}$/m);
        return regexp.test(password)
    }
}