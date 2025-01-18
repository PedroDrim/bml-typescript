/**
 * Informacoes do usuario
 */
export class UserInfo {

    /**
     * Nome do usuario
     */
    public user: string;

    /**
     * Senha do usuario
     */
    private _password: string;

    /**
     * Construtor público da classe
     * @param user Nome do usuario
     * @param password Senha do usuario
     */
    constructor(user: string, password: string) {
        this.user = user
        this._password = this._cryptPassword(password)
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
     * @return Nova senha encriptada
     */
    private _cryptPassword(password: string): string {
        return password.split("").reverse().join("")
    }
}