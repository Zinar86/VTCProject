export class Password {
    value : string;
    constructor(password : string){
        const passwordValidate: boolean = this.passwordValid(password)
        if(!passwordValidate){
            throw new Error("PASSWORD_MUST_CONTAIN_3_SPECIAL_CHARACTER")
        }
        this.value = password;
    }
    passwordValid(password){
        const regexp = new RegExp(/^.*[~!@#$%^*\-_=+[{\]}\/;:,.?]{3}$/m);
        return regexp.test(password)
    }
}