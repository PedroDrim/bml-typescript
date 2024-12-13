import { UserInfo } from "../../model/user-info/UserInfo";
import { InvalidParameterException } from '../../model/exception/invalid-parameter-exception/InvalidParameterException'
import { DataReaderException } from '../../model/exception/data-reader-exception/DataReaderException'
import type { DataReader } from "../../model/data-reader/DataReader";
import type { BunFile } from "bun";

/**
 * Classe responsavel por ler e disponibilizar os dados em um formato desejado
 * @see DataReader
 */
export class TableReader implements DataReader {

    /**
     * Nome do arquivo de dados
     */
    public readonly fileName: string

    /**
     * Lista contendo os dados
     */
    private userInfoList: Promise<UserInfo[]>

    /**
     * Construtor publico da classe
     * @param fileName Nome do arquivo de dados a ser lido
     * @throws DataReaderException Lancada caso nao seja possivel ler os dados corretamente
     */
    constructor(fileName: string) {
        this.fileName = fileName
        this.userInfoList = this.deserializeFile(this.fileName)
    }

    /**
     * Obtem todos os dados disponiveis
     * @returns Lista de usuarios
     */
    public async readAll(): Promise<UserInfo[]> {
        return this.userInfoList
    }

    /**
     * Obtem os dados disponiveis dentro de um intervalo
     * @param startIndex Inicio do intervalo
     * @param endIndex Fim do intervalo
     * @return Lista contendo todos os dados disponiveis dentro do intervalo especificado
     */
    public async read(startIndex: number, endIndex: number): Promise<UserInfo[]> {
        if (startIndex < 0) throw new InvalidParameterException("'startIndex' é menor que 0")
        if (endIndex < 0) throw new InvalidParameterException("'endIndex' é menor que 0")
        if (startIndex >= endIndex) throw new InvalidParameterException("'startIndex' é maior ou igual á 'endIndex'")

        return (await this.userInfoList).slice(startIndex, endIndex)
    }

    /**
     * Desserializa o arquivo de dados, convertendo-o em uma lista de 'UserInfo'
     * @param fileName Nome do arquivo de dados
     * @return Lista contendo os dados desserilizados
     * @throws DataReaderException Lancada caso nao seja possivel ler os dados corretamente
     */
    private async deserializeFile(fileName: string): Promise<UserInfo[]> {
        let list: UserInfo[] = []

        try {
            const file: BunFile = Bun.file(fileName)
            const fullFile: string = await file.text()
            const lines: string[] = fullFile.replaceAll("\"", "").split("\n")
            list = lines.filter((line: string) => line != "").map(this.convertLine)
        } catch (e) {
            throw new DataReaderException("Erro ao ler arquivo:" + fileName)
        }

        return list
    }

    /**
     * Converte a linha em um 'UserInfo'
     * @param line Linha a ser desserializada
     * @return Objeto 'UserInfo'
     */
    private convertLine(line: String): UserInfo {
        const values: string[] = line.split(",")

        let user: string = values[0].trim()
        let password: string = values[1].trim()
        let credit: number = Number(values[2].trim())

        const userInfo: UserInfo = new UserInfo(user, password, credit)
        return userInfo
    }
}
