export class Email {
    value : string;
    constructor(email: string) {
        const emailValidate: boolean = this.emailValid(email)
        if (!emailValidate){
            throw new Error("EMAIL_NO_VALID");
        }
        this.value = email;
    }
    emailValid(email: string){
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(email);

    }
}