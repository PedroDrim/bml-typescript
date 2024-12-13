/**
 * Classe responsavel por abstrair o erro de benchmark
 * @see Error
 */
export class BenchmarkException extends Error {

    /**
     * Construtor publico da classe
     * @param m Mensagem de erro
     */
    constructor(m: string) {
        super(m)
    }
}