/**
 * Classe responsavel por abstrair o erro de parametros invalidos
 * @see Error
 */
export class InvalidParameterException extends Error {

    /**
     * Construtor publico da classe
     * @param m Mensagem de erro
     */
    constructor(m: string) {
        super(m)
    }
}