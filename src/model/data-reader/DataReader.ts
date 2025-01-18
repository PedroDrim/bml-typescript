import type { UserInfo } from "../user-info/Userinfo"

/**
 * Interface para leitura de dados
 */
export interface DataReader {

    /**
     * Abre o arquivo de dados
     */
    open(): Promise<void>

    /**
     * Obtem todos os dados disponiveis
     * @return Lista contendo todos os dados disponiveis
     */
    readAll(): UserInfo[]

    /**
     * Obtem os dados disponiveis dentro de um intervalo
     * @param startIndex Inicio do intervalo
     * @param endIndex Fim do intervalo
     * @return Lista contendo todos os dados disponiveis dentro do intervalo especificado
     */
    read(startIndex: number, endIndex: number): UserInfo[]
}
