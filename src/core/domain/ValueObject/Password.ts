export class Password {
    value : string;
    constructor(password : string){
        const passwordValidate: boolean = this.passwordValid(password);
        console.log(passwordValidate)
        if(!passwordValidate){
            throw new Error("Minimum eight characters, at least one letter and one number")
        }
        this.value = password;
    }
    passwordValid(password: string){
        const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm);
        return regexp.test(password)
    }
}