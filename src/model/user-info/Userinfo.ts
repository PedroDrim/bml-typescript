/**
 * Informacoes do usuario
 */
export class UserInfo {

    // Nome do usuario
    public user: string

    // Credito do usuario
    public credit: number

    // Senha criptografada do usuario
    private _password: string

    /**
     * Construtor publico da classe
     * @param user Nome do usuario
     * @param password Credito do usuario 
     * @param credit Senha do usuario
     */
    constructor(user: string, password: string, credit: number) {
        this.user = user
        this._password = this._cryptPassword(password)
        this.credit = credit
    }

    /**
     * Obtem a senha do usuario criptografada
     * @return Senha do usuario criptografada
     */
    public getPassword(): string {
        return this._cryptPassword(this._password)
    }

    /**
     * Atualiza a senha do usuario
     * @param password Nova senha do usuario
     */
    public setPassword(password: string) {
        this._password = password
    }

    /**
     * Metodo privado para encriptar a senha do usuario
     * @param password Senha a ser encriptada
     * @returns Nova senha encriptada
     */
    private _cryptPassword(password: string): string {
        return password.split("").reverse().join("")
    }
}