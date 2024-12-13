/**
 * Classe responsavel por abstrair o erro de leitura de dados
 * @see Error
 */
export class DataReaderException extends Error {

    /**
     * Construtor publico da classe
     * @param m Mensagem de erro
     */
    constructor(m: string) {
        super(m)
    }
}