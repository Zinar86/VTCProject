export class PasswordGateway implements PasswordGateway{
    async compare(password: string, hash: string): Promise<boolean> {
        return password === hash;
    }
    async encrypt(password: string): Promise<string> {
        return password;
    }
}